import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { coursesApi } from '@/api/courses.api';
import type { Course, Topic } from '@/types';

const levelBadge: Record<Course['level'], string> = {
    beginner: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    intermediate: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    advanced: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
};

export default function CourseTopicsPage() {
    const { courseId } = useParams<{ courseId: string }>();

    const [course, setCourse] = useState<Course | null>(null);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!courseId) {
            setError('Course id is missing.');
            setLoading(false);
            return;
        }

        const loadTopicsByCourse = async () => {
            setLoading(true);
            setError(null);

            try {
                const topicsResponse = await coursesApi.getTopicsByCourseId(courseId);
                const topicsData = topicsResponse?.data?.data;

                if (!Array.isArray(topicsData)) {
                    throw new Error('Invalid topics response');
                }

                const sortedTopics = [...(topicsData as Topic[])].sort((a, b) => a.order - b.order);
                setTopics(sortedTopics);

                const allCoursesResponse = await coursesApi.getAllCourses();
                const allCoursesData = allCoursesResponse?.data?.data;
                if (Array.isArray(allCoursesData)) {
                    const matchedCourse = (allCoursesData as Course[]).find(
                        (item) => item._id === courseId,
                    );
                    setCourse(matchedCourse ?? null);
                }
            } catch (err: unknown) {
                const message =
                    err instanceof Error
                        ? err.message
                        : 'Failed to load topics for this course.';
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        void loadTopicsByCourse();
    }, [courseId]);

    return (
        <section className='min-h-screen bg-[#050506] px-4 py-12 font-sans text-zinc-100 md:px-8 md:py-16'>
            <div className='mx-auto w-full max-w-5xl'>
                <Link
                    to='/courses'
                    className='mb-5 inline-flex items-center rounded-lg border border-white/10 bg-[#0b0b10] px-3 py-2 text-sm text-zinc-300 transition hover:border-indigo-500/40 hover:text-indigo-300'
                >
                     {`<-`} Back to Courses
                </Link>

                <div className='mb-8 rounded-2xl border border-white/10 bg-[#0b0b10] p-6 md:mb-10 md:p-8'>
                    {loading ? (
                        <div className='space-y-3'>
                            <div className='h-6 w-2/3 animate-pulse rounded bg-white/10' />
                            <div className='h-4 w-1/3 animate-pulse rounded bg-white/10' />
                            <div className='h-4 w-full animate-pulse rounded bg-white/10' />
                        </div>
                    ) : error ? (
                        <div className='rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200'>
                            {error}
                        </div>
                    ) : (
                        <>
                            <div className='mb-4 flex flex-wrap items-center gap-3'>
                                <h1 className='text-2xl font-semibold md:text-3xl'>{course?.title}</h1>
                                {course?.level && (
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${levelBadge[course.level]}`}
                                    >
                                        {course.level}
                                    </span>
                                )}
                            </div>

                            <p className='text-sm text-zinc-400 md:text-base'>{course?.description}</p>

                            {course?.field?.name && (
                                <p className='mt-3 text-xs uppercase tracking-wide text-zinc-500'>
                                    Field: {course.field.name}
                                </p>
                            )}
                        </>
                    )}
                </div>

                {!loading && !error && topics.length === 0 && (
                    <div className='rounded-2xl border border-white/10 bg-[#0b0b10] p-8 text-center'>
                        <h2 className='text-xl font-semibold'>No topics found</h2>
                        <p className='mt-2 text-sm text-zinc-400'>
                            This course does not have topics yet.
                        </p>
                    </div>
                )}

                {!loading && !error && topics.length > 0 && (
                    <div className='space-y-3'>
                        {topics.map((topic) => (
                            <Link
                                key={topic._id}
                                to={`/courses/${courseId}/topics/${topic._id}/videos`}
                                state={{ topicTitle: topic.title, courseTitle: course?.title }}
                                className='rounded-xl border border-white/10 bg-[#0b0b10] p-5 transition hover:border-indigo-500/40'
                            >
                                <div className='flex items-start gap-4'>
                                    <div className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300'>
                                        {topic.order}
                                    </div>
                                    <div>
                                        <h3 className='text-base font-medium md:text-lg'>{topic.title}</h3>
                                        <p className='mt-1 text-xs text-zinc-500'>
                                            Topic #{topic.order}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
