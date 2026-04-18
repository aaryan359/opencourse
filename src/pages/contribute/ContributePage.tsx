import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { coursesApi } from '@/api/courses.api';
import { contributeApi } from '@/api/contribute.api';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/redux/hook';
import type {
  Course,
  InterviewDifficulty,
  InterviewQAPair,
  Topic,
} from '@/types';

const levelBadgeClass: Record<'beginner' | 'intermediate' | 'advanced', string> = {
  beginner: 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  intermediate: 'border border-amber-500/30 bg-amber-500/10 text-amber-300',
  advanced: 'border border-rose-500/30 bg-rose-500/10 text-rose-300',
};

const difficultyOptions: InterviewDifficulty[] = ['easy', 'medium', 'hard'];
const MAX_VIDEO_FILE_SIZE_MB = 200;
const MAX_VIDEO_DURATION_SECONDS = 3600;

const newQaPair = (): InterviewQAPair => ({
  question: '',
  answer: '',
  difficulty: 'medium',
});

export default function ContributePage() {
  const { user, token, initialized } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState<'courses' | 'interview'>('courses');

  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState<string | null>(null);
  const [courseSearch, setCourseSearch] = useState('');

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(false);
  const [topicSearch, setTopicSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const [showAddTopicForm, setShowAddTopicForm] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicOrder, setNewTopicOrder] = useState('');
  const [addingTopic, setAddingTopic] = useState(false);

  const [contributionTitle, setContributionTitle] = useState('');
  const [contributionDescription, setContributionDescription] = useState('');
  const [contributionUrl, setContributionUrl] = useState('');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [videoProcessing, setVideoProcessing] = useState(false);
  const [videoProcessingProgress, setVideoProcessingProgress] = useState(0);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [submittingContribution, setSubmittingContribution] = useState(false);

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [qaPairs, setQaPairs] = useState<InterviewQAPair[]>([newQaPair()]);
  const [submittingInterview, setSubmittingInterview] = useState(false);

  const isLoggedIn = Boolean(user && token);
  const isApprovedContributor =
    user?.role === 'contributor' || user?.contributorStatus === 'approved';
  const hasContributorUploadAccess = user?.role === 'contributor' || user?.role === 'admin';

  useEffect(() => {
    if (!initialized || !isApprovedContributor) {
      return;
    }

    const loadCourses = async () => {
      setCoursesLoading(true);
      setCoursesError(null);
      try {
        const response = await coursesApi.getAllCourses();
        const payload = response.data?.data;
        if (!Array.isArray(payload)) {
          throw new Error('Invalid courses response');
        }

        setCourses(payload.filter((course) => course.isPublished));
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : 'Failed to load courses.';
        setCoursesError(message);
      } finally {
        setCoursesLoading(false);
      }
    };

    void loadCourses();
  }, [initialized, isApprovedContributor]);

  const filteredCourses = useMemo(() => {
    const query = courseSearch.trim().toLowerCase();
    if (!query) return courses;

    return courses.filter((course) => {
      const searchable = [course.title, course.description, course.field?.name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return searchable.includes(query);
    });
  }, [courses, courseSearch]);

  const sortedTopics = useMemo(() => [...topics].sort((a, b) => a.order - b.order), [topics]);

  const filteredTopics = useMemo(() => {
    const query = topicSearch.trim().toLowerCase();
    if (!query) return sortedTopics;

    return sortedTopics.filter((topic) => {
      const searchable = `${topic.title} ${topic.order}`.toLowerCase();
      return searchable.includes(query);
    });
  }, [sortedTopics, topicSearch]);

  const loadTopicsForCourse = async (course: Course) => {
    try {
      setSelectedCourse(course);
      setTopicsLoading(true);
      setSelectedTopic(null);
      setTopicSearch('');
      setShowAddTopicForm(false);
      setNewTopicTitle('');
      setNewTopicOrder('');
      setUploadMode('file');
      setVideoFile(null);
      setVideoDuration(null);
      setVideoProcessing(false);
      setVideoProcessingProgress(0);
      setVideoUploading(false);
      setVideoUploadProgress(0);

      const response = await contributeApi.getTopicsByCourseId(course._id);
      const payload = response.data?.data;
      if (!Array.isArray(payload)) {
        throw new Error('Invalid topics response');
      }
      setTopics(payload);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to load topics.';
      toast.error(message);
      setTopics([]);
    } finally {
      setTopicsLoading(false);
    }
  };

  const handleAddTopic = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedCourse) {
      toast.error('Please select a course first.');
      return;
    }

    if (!newTopicTitle.trim()) {
      toast.error('Topic title is required.');
      return;
    }

    if (!hasContributorUploadAccess) {
      toast.error('Your account role is not ready for topic creation yet.');
      return;
    }

    try {
      setAddingTopic(true);
      const orderValue = newTopicOrder.trim();
      const payload = {
        title: newTopicTitle.trim(),
        ...(orderValue ? { order: Number(orderValue) } : {}),
      };

      const response = await contributeApi.createTopic(selectedCourse._id, payload);
      const createdTopic = response.data?.data;
      if (!createdTopic) {
        throw new Error('Topic was not returned by server');
      }

      setTopics((current) => [...current, createdTopic]);
      setNewTopicTitle('');
      setNewTopicOrder('');
      setShowAddTopicForm(false);
      toast.success('Topic added successfully.');
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message ===
          'string'
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message ??
            'Failed to add topic.'
          : error instanceof Error
            ? error.message
            : 'Failed to add topic.';
      toast.error(message);
    } finally {
      setAddingTopic(false);
    }
  };

  const handleTopicContributionSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedTopic) {
      toast.error('Please select a topic first.');
      return;
    }

    if (!contributionTitle.trim()) {
      toast.error('Contribution title is required.');
      return;
    }

    if (uploadMode === 'url' && !contributionUrl.trim()) {
      toast.error('Video URL is required in URL mode.');
      return;
    }

    if (uploadMode === 'file' && !videoFile) {
      toast.error('Please choose a video file to upload.');
      return;
    }

    if (uploadMode === 'file' && !videoDuration) {
      toast.error('Could not validate video duration. Please select the file again.');
      return;
    }

    if (videoDuration && videoDuration > MAX_VIDEO_DURATION_SECONDS) {
      toast.error('Video is too long. Maximum allowed length is 60 minutes.');
      return;
    }

    if (!hasContributorUploadAccess) {
      toast.error('Your account role is not ready for course contribution yet.');
      return;
    }

    try {
      setSubmittingContribution(true);
      if (uploadMode === 'file') {
        setVideoUploading(true);
        setVideoUploadProgress(0);
      }

      await contributeApi.uploadTopicContribution(selectedTopic._id, {
        title: contributionTitle.trim(),
        description: contributionDescription.trim() || undefined,
        url: uploadMode === 'url' ? contributionUrl.trim() : undefined,
        videoFile: uploadMode === 'file' ? videoFile ?? undefined : undefined,
        duration: videoDuration ?? undefined,
        onUploadProgress: (progress) => {
          setVideoUploadProgress(progress);
        },
      });

      toast.success('Contribution submitted and pending approval.');
      setContributionTitle('');
      setContributionDescription('');
      setContributionUrl('');
      setVideoFile(null);
      setVideoDuration(null);
      setVideoUploadProgress(100);
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message ===
          'string'
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message ??
            'Failed to submit contribution.'
          : error instanceof Error
            ? error.message
            : 'Failed to submit contribution.';
      toast.error(message);
    } finally {
      setSubmittingContribution(false);
      setTimeout(() => {
        setVideoUploading(false);
        setVideoUploadProgress(0);
      }, 250);
    }
  };

  const updateQaPair = (
    index: number,
    key: keyof InterviewQAPair,
    value: string | InterviewDifficulty,
  ) => {
    setQaPairs((current) =>
      current.map((pair, pairIndex) =>
        pairIndex === index ? { ...pair, [key]: value } : pair,
      ),
    );
  };

  const addQaPair = () => {
    setQaPairs((current) => [...current, newQaPair()]);
  };

  const removeQaPair = (index: number) => {
    setQaPairs((current) => {
      if (current.length <= 1) return current;
      return current.filter((_, pairIndex) => pairIndex !== index);
    });
  };

  const handleInterviewSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!company.trim() || !role.trim()) {
      toast.error('Company and role are required.');
      return;
    }

    const normalizedPairs = qaPairs.map((pair) => ({
      question: pair.question.trim(),
      answer: pair.answer.trim(),
      difficulty: pair.difficulty,
    }));

    if (normalizedPairs.some((pair) => !pair.question || !pair.answer)) {
      toast.error('Each Q&A item needs both question and answer.');
      return;
    }

    if (!hasContributorUploadAccess) {
      toast.error('Your account role is not ready for interview submissions yet.');
      return;
    }

    try {
      setSubmittingInterview(true);
      await contributeApi.submitInterviewQuestions({
        company: company.trim(),
        role: role.trim(),
        qaPairs: normalizedPairs,
        isAnonymous,
      });
      toast.success('Interview questions submitted successfully for review.');
      setCompany('');
      setRole('');
      setIsAnonymous(false);
      setQaPairs([newQaPair()]);
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message ===
          'string'
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message ??
            'Failed to submit interview questions.'
          : error instanceof Error
            ? error.message
            : 'Failed to submit interview questions.';
      toast.error(message);
    } finally {
      setSubmittingInterview(false);
    }
  };

  const handleVideoFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setVideoFile(file);
    setVideoDuration(null);
    setVideoUploading(false);
    setVideoUploadProgress(0);

    if (!file) return;

    const maxBytes = MAX_VIDEO_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(`Video file too large. Maximum size is ${MAX_VIDEO_FILE_SIZE_MB}MB.`);
      event.target.value = '';
      setVideoFile(null);
      return;
    }

    setVideoProcessing(true);
    setVideoProcessingProgress(5);
    const progressInterval = window.setInterval(() => {
      setVideoProcessingProgress((previous) => (previous >= 90 ? previous : previous + 8));
    }, 90);

    const objectUrl = URL.createObjectURL(file);
    const probe = document.createElement('video');
    probe.preload = 'metadata';
    probe.src = objectUrl;

    probe.onloadedmetadata = () => {
      window.clearInterval(progressInterval);
      URL.revokeObjectURL(objectUrl);
      const duration = Math.floor(probe.duration);
      if (!Number.isFinite(duration) || duration <= 0) {
        toast.error('Could not read video duration. Please choose another file.');
        setVideoFile(null);
        setVideoProcessing(false);
        setVideoProcessingProgress(0);
        return;
      }

      if (duration > MAX_VIDEO_DURATION_SECONDS) {
        toast.error('Video is too long. Maximum allowed length is 60 minutes.');
        setVideoFile(null);
        setVideoProcessing(false);
        setVideoProcessingProgress(0);
        return;
      }

      setVideoProcessingProgress(100);
      setVideoDuration(duration);
      window.setTimeout(() => {
        setVideoProcessing(false);
        setVideoProcessingProgress(0);
      }, 240);
    };

    probe.onerror = () => {
      window.clearInterval(progressInterval);
      URL.revokeObjectURL(objectUrl);
      toast.error('Unable to process selected video file.');
      setVideoFile(null);
      setVideoProcessing(false);
      setVideoProcessingProgress(0);
    };
  };

  if (!initialized) {
    return (
      <section className='min-h-screen bg-[#050506] px-4 py-16 md:px-8'>
        <div className='mx-auto max-w-3xl animate-pulse space-y-4 rounded-2xl border border-white/10 bg-[#0b0b10] p-8'>
          <div className='h-8 w-2/3 rounded bg-white/10' />
          <div className='h-4 w-3/4 rounded bg-white/10' />
          <div className='h-36 w-full rounded bg-white/10' />
        </div>
      </section>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to='/login' replace />;
  }

  if (!isApprovedContributor) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <section className='min-h-screen bg-[#050506] px-4 py-12 text-zinc-100 md:px-8 md:py-16'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6'>
          <p className='inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300'>
            Contributor Workspace
          </p>
          <h1 className='mt-3 text-2xl font-semibold md:text-3xl'>Create Contributions</h1>
          <p className='mt-2 text-sm text-zinc-200/90 md:text-base'>
            Add course contributions or submit interview experiences from one place.
          </p>
        </div>

        {!hasContributorUploadAccess && (
          <div className='mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200'>
            Your contributor status is approved, but your role is not contributor yet. Please ask admin to sync your role for uploads.
          </div>
        )}

        <div className='mb-6 flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={() => setActiveTab('courses')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === 'courses'
                ? 'bg-indigo-500 text-white'
                : 'border border-white/10 bg-[#0b0b10] text-zinc-300 hover:bg-white/10'
            }`}
          >
            Contribute to Course
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('interview')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === 'interview'
                ? 'bg-indigo-500 text-white'
                : 'border border-white/10 bg-[#0b0b10] text-zinc-300 hover:bg-white/10'
            }`}
          >
            Upload Interview Questions
          </button>
        </div>

        {activeTab === 'courses' && (
          <div className='space-y-5'>
            {!selectedCourse && (
              <>
                <div className='rounded-2xl border border-white/10 bg-[#0b0b10] p-6'>
                  <h2 className='text-xl font-semibold'>Pick a Course to Contribute</h2>
                  <p className='mt-2 text-sm text-zinc-400'>
                    Search and choose a course. Then we will show topics for that course.
                  </p>
                  <div className='mt-4'>
                    <Input
                      type='text'
                      value={courseSearch}
                      onChange={(event) => setCourseSearch(event.target.value)}
                      placeholder='Search by course title, description, or field...'
                      className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                    />
                  </div>
                </div>

                {coursesLoading && (
                  <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className='h-64 animate-pulse rounded-2xl border border-white/10 bg-[#0b0b10]'
                      />
                    ))}
                  </div>
                )}

                {!coursesLoading && coursesError && (
                  <div className='rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-200'>
                    {coursesError}
                  </div>
                )}

                {!coursesLoading && !coursesError && filteredCourses.length === 0 && (
                  <div className='rounded-2xl border border-white/10 bg-[#0b0b10] p-8 text-center'>
                    <h3 className='text-lg font-semibold'>No courses found</h3>
                    <p className='mt-2 text-sm text-zinc-400'>Try a different search keyword.</p>
                  </div>
                )}

                {!coursesLoading && !coursesError && filteredCourses.length > 0 && (
                  <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {filteredCourses.map((course) => (
                      <article
                        key={course._id}
                        className='flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10]'
                      >
                        <div className='relative h-40 bg-[#121218]'>
                          {course.thumbnail ? (
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className='h-full w-full object-cover'
                            />
                          ) : (
                            <div className='flex h-full items-center justify-center bg-linear-to-br from-indigo-500/20 to-cyan-500/10 px-4 text-center text-sm text-zinc-300'>
                              {course.field?.name || 'OpenCourse'}
                            </div>
                          )}

                          <span
                            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${levelBadgeClass[course.level]}`}
                          >
                            {course.level}
                          </span>
                        </div>

                        <div className='flex flex-1 flex-col p-5'>
                          <p className='text-xs uppercase tracking-wide text-zinc-500'>
                            {course.field?.name || 'General'}
                          </p>
                          <h3 className='mt-2 line-clamp-2 text-lg font-semibold'>{course.title}</h3>
                          <p className='mt-2 line-clamp-3 text-sm text-zinc-400'>{course.description}</p>

                          <button
                            type='button'
                            onClick={() => {
                              void loadTopicsForCourse(course);
                            }}
                            className='mt-5 inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-400'
                          >
                            Contribute
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}

            {selectedCourse && (
              <>
                <div className='rounded-2xl border border-white/10 bg-[#0b0b10] p-6'>
                  <button
                    type='button'
                    onClick={() => {
                      setSelectedCourse(null);
                      setTopics([]);
                      setSelectedTopic(null);
                      setContributionTitle('');
                      setContributionDescription('');
                      setContributionUrl('');
                      setUploadMode('file');
                      setVideoFile(null);
                      setVideoDuration(null);
                      setVideoProcessing(false);
                      setVideoProcessingProgress(0);
                      setVideoUploading(false);
                      setVideoUploadProgress(0);
                    }}
                    className='mb-4 inline-flex rounded-lg border border-white/10 bg-[#121218] px-3 py-2 text-xs text-zinc-300 hover:bg-white/10'
                  >
                    {'<-'} Back to Course List
                  </button>

                  <h2 className='text-xl font-semibold'>{selectedCourse.title}</h2>
                  <p className='mt-2 text-sm text-zinc-400'>
                    Search existing topics, add a new topic, then select one to contribute.
                  </p>

                  <div className='mt-4 grid gap-3 md:grid-cols-[1fr_auto]'>
                    <Input
                      type='text'
                      value={topicSearch}
                      onChange={(event) => setTopicSearch(event.target.value)}
                      placeholder='Search topics by title...'
                      className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                    />

                    <button
                      type='button'
                      onClick={() => setShowAddTopicForm((current) => !current)}
                      className='rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-white/10'
                    >
                      {showAddTopicForm ? 'Close Add Topic' : 'Add Topic'}
                    </button>
                  </div>

                  {showAddTopicForm && (
                    <form onSubmit={handleAddTopic} className='mt-4 rounded-xl border border-white/10 bg-[#121218] p-4'>
                      <div className='grid gap-3 md:grid-cols-2'>
                        <div className='space-y-2 md:col-span-2'>
                          <Label htmlFor='newTopicTitle' className='text-zinc-300'>
                            Topic Title
                          </Label>
                          <Input
                            id='newTopicTitle'
                            type='text'
                            value={newTopicTitle}
                            onChange={(event) => setNewTopicTitle(event.target.value)}
                            placeholder='Example: State Management Fundamentals'
                            className='border-white/10 bg-[#0f0f15] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                            required
                          />
                        </div>

                        <div className='space-y-2'>
                          <Label htmlFor='newTopicOrder' className='text-zinc-300'>
                            Topic Order (optional)
                          </Label>
                          <Input
                            id='newTopicOrder'
                            type='number'
                            min='0'
                            value={newTopicOrder}
                            onChange={(event) => setNewTopicOrder(event.target.value)}
                            placeholder='0'
                            className='border-white/10 bg-[#0f0f15] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                          />
                        </div>
                      </div>

                      <div className='mt-4'>
                        <Button
                          type='submit'
                          disabled={!hasContributorUploadAccess || addingTopic}
                        >
                          {addingTopic ? 'Adding Topic...' : 'Create Topic'}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                {topicsLoading && (
                  <div className='grid gap-4 md:grid-cols-2'>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className='h-28 animate-pulse rounded-xl border border-white/10 bg-[#0b0b10]'
                      />
                    ))}
                  </div>
                )}

                {!topicsLoading && filteredTopics.length === 0 && (
                  <div className='rounded-xl border border-white/10 bg-[#0b0b10] p-6 text-sm text-zinc-400'>
                    No topics found for this course.
                  </div>
                )}

                {!topicsLoading && filteredTopics.length > 0 && (
                  <div className='grid gap-4 md:grid-cols-2'>
                    {filteredTopics.map((topic) => (
                      <button
                        key={topic._id}
                        type='button'
                        onClick={() => {
                          setSelectedTopic(topic);
                          setContributionTitle('');
                          setContributionDescription('');
                          setContributionUrl('');
                          setUploadMode('file');
                          setVideoFile(null);
                          setVideoDuration(null);
                          setVideoProcessing(false);
                          setVideoProcessingProgress(0);
                          setVideoUploading(false);
                          setVideoUploadProgress(0);
                        }}
                        className={`rounded-xl border p-4 text-left transition ${
                          selectedTopic?._id === topic._id
                            ? 'border-indigo-500/60 bg-indigo-500/10'
                            : 'border-white/10 bg-[#0b0b10] hover:border-indigo-500/40'
                        }`}
                      >
                        <p className='text-xs text-zinc-500'>Topic #{topic.order}</p>
                        <h3 className='mt-1 text-base font-medium text-zinc-100'>{topic.title}</h3>
                      </button>
                    ))}
                  </div>
                )}

                {selectedTopic && (
                  <form
                    onSubmit={handleTopicContributionSubmit}
                    className='rounded-2xl border border-white/10 bg-[#0b0b10] p-8 shadow-2xl'
                  >
                    <div className='mb-6'>
                      <h3 className='text-2xl font-semibold text-zinc-100'>Contribute to Topic</h3>
                      <p className='mt-1 text-sm text-zinc-400'>
                        Selected topic: <span className='font-medium text-zinc-200'>{selectedTopic.title}</span>
                      </p>
                    </div>

                    <div className='space-y-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='contributionTitle' className='text-zinc-300'>
                          Contribution Title
                        </Label>
                        <Input
                          id='contributionTitle'
                          type='text'
                          value={contributionTitle}
                          onChange={(event) => setContributionTitle(event.target.value)}
                          placeholder='Example: React Context API Deep Dive'
                          className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                          required
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='contributionDescription' className='text-zinc-300'>
                          Description (optional)
                        </Label>
                        <textarea
                          id='contributionDescription'
                          rows={4}
                          value={contributionDescription}
                          onChange={(event) => setContributionDescription(event.target.value)}
                          placeholder='Describe what learners will get from this contribution...'
                          className='w-full rounded-md border border-white/10 bg-[#121218] px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
                        />
                      </div>

                      <div className='space-y-3 rounded-xl border border-white/10 bg-[#121218] p-4'>
                        <p className='text-sm font-medium text-zinc-200'>Video Source</p>
                        <div className='flex flex-wrap gap-2'>
                          <button
                            type='button'
                            onClick={() => {
                              setUploadMode('file');
                              setContributionUrl('');
                            }}
                            className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                              uploadMode === 'file'
                                ? 'bg-indigo-500 text-white'
                                : 'border border-white/10 bg-[#0f0f15] text-zinc-300 hover:bg-white/10'
                            }`}
                          >
                            Upload Video File
                          </button>
                          <button
                            type='button'
                            onClick={() => {
                              setUploadMode('url');
                              setVideoFile(null);
                              setVideoDuration(null);
                            }}
                            className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                              uploadMode === 'url'
                                ? 'bg-indigo-500 text-white'
                                : 'border border-white/10 bg-[#0f0f15] text-zinc-300 hover:bg-white/10'
                            }`}
                          >
                            Use Video URL
                          </button>
                        </div>

                        {uploadMode === 'file' ? (
                          <div className='space-y-2'>
                            <Label htmlFor='videoFile' className='text-zinc-300'>
                              Video File
                            </Label>
                            <Input
                              id='videoFile'
                              type='file'
                              accept='video/mp4,video/webm,video/ogg,video/quicktime,video/x-matroska'
                              onChange={(event) => {
                                void handleVideoFileChange(event);
                              }}
                              disabled={videoProcessing || videoUploading || submittingContribution}
                              className='border-white/10 bg-[#0f0f15] text-zinc-100 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-500 file:px-3 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-indigo-400'
                              required={uploadMode === 'file'}
                            />

                            {(videoProcessing || videoUploading) && (
                              <div className='space-y-2 rounded-lg border border-white/10 bg-[#0f0f15] p-3'>
                                <div className='h-2 w-full overflow-hidden rounded-full bg-white/10'>
                                  <div
                                    className='h-full rounded-full bg-linear-to-r from-indigo-400 to-cyan-400 transition-all duration-200'
                                    style={{
                                      width: `${videoUploading ? videoUploadProgress : videoProcessingProgress}%`,
                                    }}
                                  />
                                </div>
                                <p className='text-xs text-zinc-300'>
                                  {videoUploading
                                    ? `Uploading video... ${videoUploadProgress}%`
                                    : `Preparing video... ${videoProcessingProgress}%`}
                                </p>
                              </div>
                            )}

                            <p className='text-xs text-zinc-400'>
                              Allowed formats: MP4, WebM, OGG, MOV, MKV. Max size: 200MB. Max duration: 60 minutes.
                            </p>

                            {videoFile && (
                              <p className='text-xs text-zinc-300'>
                                Selected: {videoFile.name}
                                {videoDuration ? ` (${Math.floor(videoDuration / 60)}m ${videoDuration % 60}s)` : ''}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className='space-y-2'>
                            <Label htmlFor='contributionUrl' className='text-zinc-300'>
                              Video URL
                            </Label>
                            <Input
                              id='contributionUrl'
                              type='url'
                              value={contributionUrl}
                              onChange={(event) => setContributionUrl(event.target.value)}
                              placeholder='https://...'
                              className='border-white/10 bg-[#0f0f15] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                              required={uploadMode === 'url'}
                            />
                            <p className='text-xs text-zinc-400'>
                              Provide a direct http/https video link.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='mt-6'>
                      <Button
                        type='submit'
                        className='w-full'
                        disabled={
                          !hasContributorUploadAccess ||
                          submittingContribution ||
                          videoProcessing ||
                          (uploadMode === 'file' && !videoDuration)
                        }
                      >
                        {videoUploading
                          ? `Uploading video... ${videoUploadProgress}%`
                          : submittingContribution
                            ? 'Submitting...'
                            : 'Submit Contribution'}
                      </Button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'interview' && (
          <form
            onSubmit={handleInterviewSubmit}
            className='w-full rounded-2xl border border-white/10 bg-[#0b0b10] p-8 text-zinc-100 shadow-2xl'
          >
            <div className='mb-6'>
              <h2 className='text-2xl font-semibold text-zinc-100'>Upload Interview Experience</h2>
              <p className='mt-1 text-sm text-zinc-400'>
                Use the same quality format for each question and answer. Submissions go for admin review.
              </p>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='company' className='text-zinc-300'>
                  Company
                </Label>
                <Input
                  id='company'
                  type='text'
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder='Google'
                  className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='role' className='text-zinc-300'>
                  Role
                </Label>
                <Input
                  id='role'
                  type='text'
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  placeholder='Frontend Developer'
                  className='border-white/10 bg-[#121218] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500/50'
                  required
                />
              </div>
            </div>

            <label className='mt-4 inline-flex items-center gap-2 text-sm text-zinc-300'>
              <input
                type='checkbox'
                checked={isAnonymous}
                onChange={(event) => setIsAnonymous(event.target.checked)}
                className='h-4 w-4 rounded border-white/20 bg-[#121218] text-indigo-500 focus:ring-indigo-500/40'
              />
              Submit anonymously
            </label>

            <div className='mt-6 space-y-4'>
              {qaPairs.map((pair, index) => (
                <div key={index} className='rounded-xl border border-white/10 bg-[#121218] p-4'>
                  <div className='mb-3 flex items-center justify-between'>
                    <p className='text-sm font-medium text-zinc-200'>Q&A #{index + 1}</p>
                    {qaPairs.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removeQaPair(index)}
                        className='text-xs text-rose-300 hover:text-rose-200'
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className='space-y-3'>
                    <div className='space-y-2'>
                      <Label htmlFor={`question-${index}`} className='text-zinc-300'>
                        Question
                      </Label>
                      <textarea
                        id={`question-${index}`}
                        rows={3}
                        value={pair.question}
                        onChange={(event) => updateQaPair(index, 'question', event.target.value)}
                        className='w-full rounded-md border border-white/10 bg-[#0f0f15] px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
                        placeholder='Describe the interview question clearly'
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor={`answer-${index}`} className='text-zinc-300'>
                        Answer
                      </Label>
                      <textarea
                        id={`answer-${index}`}
                        rows={4}
                        value={pair.answer}
                        onChange={(event) => updateQaPair(index, 'answer', event.target.value)}
                        className='w-full rounded-md border border-white/10 bg-[#0f0f15] px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
                        placeholder='Write the expected answer or approach'
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor={`difficulty-${index}`} className='text-zinc-300'>
                        Difficulty
                      </Label>
                      <select
                        id={`difficulty-${index}`}
                        value={pair.difficulty}
                        onChange={(event) =>
                          updateQaPair(index, 'difficulty', event.target.value as InterviewDifficulty)
                        }
                        className='h-10 w-full rounded-md border border-white/10 bg-[#0f0f15] px-3 text-sm text-zinc-100 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/30'
                      >
                        {difficultyOptions.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type='button'
                onClick={addQaPair}
                className='rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10'
              >
                + Add Another Q&A
              </button>
            </div>

            <div className='mt-6'>
              <Button
                type='submit'
                className='w-full'
                disabled={!hasContributorUploadAccess || submittingInterview}
              >
                {submittingInterview ? 'Submitting interview...' : 'Submit Interview Questions'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
