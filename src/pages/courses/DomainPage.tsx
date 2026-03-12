import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Loader2, TrendingUp } from 'lucide-react';
import { BackgroundEffects } from '../../components/ui/BackgroundEffects';
import { coursesApi, fieldsApi } from '../../api/courses.api';

export default function FieldCoursesPage() {
  const { fieldSlug } = useParams<{ fieldSlug: string }>();
  const [courses, setCourses] = useState<any[]>([]);
  const [field, setField] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!fieldSlug) return;
    setLoading(true);
    Promise.all([
      fieldsApi.getFieldBySlug(fieldSlug),
      coursesApi.getCoursesByField(fieldSlug),
    ])
      .then(([fieldRes, coursesRes]) => {
        setField(fieldRes.data?.data ?? null);
        setCourses(coursesRes.data?.data ?? []);
      })
      .catch(() => setError('Failed to load courses. Please try again.'))
      .finally(() => setLoading(false));
  }, [fieldSlug]);

  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] relative overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10 container mx-auto px-6 py-20 max-w-7xl">
        {/* Back Button */}
        <Link to="/courses" className="flex items-center gap-2 text-[#8A8F98] hover:text-white transition-colors mb-8 group">
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>All fields</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-semibold tracking-tight mb-4">
            {field?.name ?? fieldSlug}
          </h1>
          <p className="text-lg text-[#8A8F98]">
            {field?.description ?? 'Explore courses and build real-world skills.'}
          </p>
        </div>

        {/* States */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#5E6AD2]" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="text-[#5E6AD2] underline">Retry</button>
          </div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="text-center py-20 text-[#8A8F98]">
            No courses found in this field yet.
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !error && courses.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <CourseCard key={course._id} course={course} fieldSlug={fieldSlug!} delay={idx * 50} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CourseCard({ course, fieldSlug, delay }: { course: any; fieldSlug: string; delay: number }) {
  const LEVEL_COLORS: Record<string, string> = {
    beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    advanced: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  };
  const levelKey = course.level?.toLowerCase() ?? 'beginner';
  const levelColor = LEVEL_COLORS[levelKey] ?? LEVEL_COLORS.beginner;

  return (
    <Link to={`/courses/${fieldSlug}/${course.slug}`}>
      <div
        style={{ animationDelay: `${delay}ms` }}
        className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-2 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(94,106,210,0.1)]"
      >
        {/* Thumbnail */}
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full aspect-video object-cover rounded-xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="w-full aspect-video rounded-xl mb-4 bg-gradient-to-br from-[#5E6AD2]/20 to-purple-500/10 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-[#5E6AD2]/60" />
          </div>
        )}

        {/* Level badge */}
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-3 capitalize ${levelColor}`}>
          {course.level}
        </span>

        <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-[#8A8F98] mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-xs text-[#8A8F98]">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>View course</span>
          </div>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#5E6AD2]" />
        </div>
      </div>
    </Link>
  );
}