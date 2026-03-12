// ============================================
// FILE: CourseOverviewPage.tsx
// ============================================
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, TrendingUp, Target, CheckCircle2, Play, Loader2 } from 'lucide-react';
import { BackgroundEffects } from '../../components/ui/BackgroundEffects';
import { coursesApi, topicsApi } from '../../api/courses.api';

export default function CourseOverviewPage() {
  const { fieldSlug, courseSlug } = useParams<{ fieldSlug: string; courseSlug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!courseSlug) return;
    setLoading(true);
    coursesApi.getCourseBySlug(courseSlug)
      .then((res) => {
        const c = res.data?.data;
        if (!c) { setError('Course not found'); return; }
        setCourse(c);
        return topicsApi.listTopicsByCourse(c._id);
      })
      .then((topicsRes) => { if (topicsRes) setTopics(topicsRes.data?.data ?? []); })
      .catch(() => setError('Failed to load course details.'))
      .finally(() => setLoading(false));
  }, [courseSlug]);

  if (loading) return (
    <div className="min-h-screen bg-[#050506] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#5E6AD2]" />
    </div>
  );

  if (error || !course) return (
    <div className="min-h-screen bg-[#050506] text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#8A8F98] mb-4">{error || 'Course not found'}</p>
        <Link to={`/courses/${fieldSlug}`} className="text-[#5E6AD2] underline">Back to courses</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] relative overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10 container mx-auto px-6 py-20 max-w-5xl">
        {/* Back Button */}
        <Link to={`/courses/${fieldSlug}`} className="flex items-center gap-2 text-[#8A8F98] hover:text-white transition-colors mb-8 group">
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>Back to courses</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-semibold tracking-tight leading-tight bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent mb-6">
            {course.title}
          </h1>
          <p className="text-xl text-[#8A8F98] leading-relaxed max-w-3xl">{course.description}</p>

          {/* Meta Stats */}
          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            <StatCard icon={<TrendingUp className="w-5 h-5 text-green-400" />} value={course.level} label="Level" color="green" />
            <StatCard icon={<BookOpen className="w-5 h-5 text-purple-400" />} value={`${topics.length} Topics`} label="Comprehensive" color="purple" />
          </div>
        </div>

        {/* Enroll CTA */}
        <button
          onClick={() => navigate(`/courses/${fieldSlug}/${courseSlug}/learn`)}
          className="w-full sm:w-auto group relative px-8 py-4 rounded-xl bg-[#5E6AD2] text-white font-semibold text-lg shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_8px_24px_rgba(94,106,210,0.4),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:bg-[#6872D9] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(94,106,210,0.6),0_12px_32px_rgba(94,106,210,0.5)] hover:-translate-y-0.5 active:translate-y-0 mb-16"
        >
          <span className="flex items-center justify-center gap-2">
            Start Learning
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Modules / Topics */}
            <section className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-[#5E6AD2]" />
                <h2 className="text-2xl font-semibold">Course Topics</h2>
              </div>
              {topics.length === 0 ? (
                <p className="text-[#8A8F98] text-sm">No topics added yet. Check back soon!</p>
              ) : (
                <div className="space-y-3">
                  {topics.map((topic, idx) => (
                    <div key={topic._id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all group cursor-pointer"
                      onClick={() => navigate(`/courses/${fieldSlug}/${courseSlug}/learn`)}>
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 flex items-center justify-center text-sm font-semibold text-[#5E6AD2]">
                          {idx + 1}
                        </div>
                        <div>
                          <h3 className="font-medium group-hover:text-white transition-colors">{topic.title}</h3>
                        </div>
                      </div>
                      <Play className="w-5 h-5 text-[#8A8F98] group-hover:text-[#5E6AD2] transition-colors" />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Description */}
            {course.description && (
              <section className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-[#5E6AD2]" />
                  <h2 className="text-2xl font-semibold">About This Course</h2>
                </div>
                <p className="text-[#8A8F98] leading-relaxed">{course.description}</p>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#5E6AD2]" />
                Course Info
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-[#8A8F98]">
                  <span className="text-[#5E6AD2]">•</span>
                  <span>Level: <span className="text-white capitalize">{course.level}</span></span>
                </li>
                <li className="flex items-center gap-2 text-sm text-[#8A8F98]">
                  <span className="text-[#5E6AD2]">•</span>
                  <span>{topics.length} topics to explore</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-[#8A8F98]">
                  <span className="text-[#5E6AD2]">•</span>
                  <span>Community-contributed videos</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  const gradients: Record<string, string> = {
    yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    green: 'from-green-500/20 to-green-600/10 border-green-500/30',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradients[color] ?? gradients.blue} border flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <div className="font-semibold text-white capitalize">{value}</div>
        <div className="text-[#8A8F98] text-xs">{label}</div>
      </div>
    </div>
  );
}
