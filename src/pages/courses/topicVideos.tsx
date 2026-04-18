import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { coursesApi } from '@/api/courses.api';
import { videosApi } from '@/api/videos.api';
import VideoCard from '@/components/video/VideoCard';
import type { Course, Topic, Video } from '@/types';

type TopicVideosLocationState = {
  topicTitle?: string;
  courseTitle?: string;
};

export default function TopicVideosPage() {
  const { courseId, topicId } = useParams<{ courseId: string; topicId: string }>();
  const location = useLocation();
  const state = (location.state ?? {}) as TopicVideosLocationState;

  const [course, setCourse] = useState<Course | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId || !topicId) {
      setError('Course id or topic id is missing.');
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [topicsResponse, videosResponse, allCoursesResponse] = await Promise.all([
          coursesApi.getTopicsByCourseId(courseId),
          videosApi.listByTopic(topicId),
          coursesApi.getAllCourses(),
        ]);

        const topicsData = topicsResponse?.data?.data;
        const videosData = videosResponse?.data?.data;
        const coursesData = allCoursesResponse?.data?.data;

        if (!Array.isArray(topicsData)) {
          throw new Error('Invalid topics response');
        }

        if (!Array.isArray(videosData)) {
          throw new Error('Invalid videos response');
        }

        if (Array.isArray(coursesData)) {
          const matchedCourse = (coursesData as Course[]).find((item) => item._id === courseId);
          setCourse(matchedCourse ?? null);
        }

        const matchedTopic = (topicsData as Topic[]).find((item) => item._id === topicId);
        setTopic(matchedTopic ?? null);
        setVideos(videosData as Video[]);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to load topic videos. Please try again.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [courseId, topicId]);

  const title = useMemo(() => {
    if (topic?.title) return topic.title;
    if (state.topicTitle) return state.topicTitle;
    return 'Topic Videos';
  }, [topic?.title, state.topicTitle]);

  const courseTitle = useMemo(() => {
    if (course?.title) return course.title;
    if (state.courseTitle) return state.courseTitle;
    return 'Course';
  }, [course?.title, state.courseTitle]);

  return (
    <section className='min-h-screen bg-[#050506] px-4 py-12 font-sans text-zinc-100 md:px-8 md:py-16'>
      <div className='mx-auto w-full max-w-7xl'>
        <Link
          to={`/courses/${courseId}`}
          className='mb-5 inline-flex items-center rounded-lg border border-white/10 bg-[#0b0b10] px-3 py-2 text-sm text-zinc-300 transition hover:border-indigo-500/40 hover:text-indigo-300'
        >
          {'<-'} Back to Topics
        </Link>

        <div className='mb-8 rounded-2xl border border-white/10 bg-[#0b0b10] p-6 md:mb-10 md:p-8'>
          {loading ? (
            <div className='space-y-3'>
              <div className='h-7 w-1/2 animate-pulse rounded bg-white/10' />
              <div className='h-4 w-1/3 animate-pulse rounded bg-white/10' />
            </div>
          ) : error ? (
            <div className='rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200'>
              {error}
            </div>
          ) : (
            <>
              <h1 className='text-2xl font-semibold leading-tight md:text-3xl'>{title}</h1>
              <p className='mt-2 text-sm text-zinc-400 md:text-base'>
                {courseTitle} • {videos.length} video{videos.length === 1 ? '' : 's'}
              </p>
            </>
          )}
        </div>

        {!loading && !error && videos.length === 0 && (
          <div className='rounded-2xl border border-white/10 bg-[#0b0b10] p-8 text-center'>
            <h2 className='text-xl font-semibold'>No videos found</h2>
            <p className='mt-2 text-sm text-zinc-400'>
              No approved videos are available for this topic yet.
            </p>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className='grid gap-6 md:grid-cols-2'>
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
