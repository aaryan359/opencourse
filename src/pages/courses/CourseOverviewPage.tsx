// ============================================
// FILE: CourseOverviewPage.tsx
// ============================================
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Clock, BookOpen, TrendingUp, Target, CheckCircle2, Play } from 'lucide-react';
import {BackgroundEffects} from '../../components/ui/BackgroundEffects';

const courseDetails = {
  "javascript": {
    title: "JavaScript Mastery",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.8,
    enrolled: 12450,
    description: "Master JavaScript from fundamentals to advanced concepts including ES6+, async programming, and modern patterns.",
    outcomes: [
      "Write clean, efficient JavaScript code",
      "Understand closures, hoisting, and scope",
      "Master async/await and Promises",
      "Build real-world applications"
    ],
    prerequisites: ["Basic HTML/CSS", "Programming fundamentals"],
    miniTopics: [
      { id: "hoisting", title: "Hoisting & Scope", videoCount: 1 },
      { id: "closures", title: "Closures Deep Dive", videoCount: 1 },
      { id: "async", title: "Async Programming", videoCount: 2 },
    ],
  },
  "react": {
    title: "React Development",
    level: "Advanced",
    duration: "10 weeks",
    rating: 4.9,
    enrolled: 18200,
    description: "Build powerful, scalable applications with React. Learn hooks, state management, performance optimization, and best practices.",
    outcomes: [
      "Build complex React applications",
      "Master React Hooks ecosystem",
      "Implement efficient state management",
      "Optimize React performance"
    ],
    prerequisites: ["JavaScript ES6+", "Modern web development"],
    miniTopics: [
      { id: "hooks", title: "React Hooks", videoCount: 2 },
      { id: "state", title: "State Management", videoCount: 1 },
    ],
  },
  "communication": {
    title: "Communication Mastery",
    level: "Beginner",
    duration: "4 weeks",
    rating: 4.7,
    enrolled: 8900,
    description: "Develop exceptional communication skills for professional and personal success.",
    outcomes: [
      "Communicate clearly and confidently",
      "Master public speaking",
      "Build interpersonal relationships",
      "Handle difficult conversations"
    ],
    prerequisites: ["None - suitable for everyone"],
    miniTopics: [
      { id: "effective-communication", title: "Effective Communication", videoCount: 2 },
    ],
  },
};

export default function CourseOverviewPage() {
  const { track, domain, course } = useParams();
  const navigate = useNavigate();
  const courseData = courseDetails[course];

  if (!courseData) return <div>Course not found</div>;

  const handleEnroll = () => {
    navigate(`/courses/${track}/${domain}/${course}/learn`);
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] relative overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10 container mx-auto px-6 py-20 max-w-5xl">
        {/* Back Button */}
        <Link to={`/courses/${track}/${domain}`} className="flex items-center gap-2 text-[#8A8F98] hover:text-white transition-colors mb-8 group">
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>Back to courses</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-semibold tracking-tight leading-tight bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent mb-6">
            {courseData.title}
          </h1>
          <p className="text-xl text-[#8A8F98] leading-relaxed max-w-3xl">{courseData.description}</p>

          {/* Meta Stats */}
          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            <StatCard icon={<Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />} value={`${courseData.rating} Rating`} label="Highly rated" color="yellow" />
            <StatCard icon={<Clock className="w-5 h-5 text-blue-400" />} value={courseData.duration} label="Duration" color="blue" />
            <StatCard icon={<BookOpen className="w-5 h-5 text-purple-400" />} value={`${courseData.miniTopics.length} Modules`} label="Comprehensive" color="purple" />
            <StatCard icon={<TrendingUp className="w-5 h-5 text-green-400" />} value={courseData.level} label="Level" color="green" />
          </div>
        </div>

        {/* Enroll CTA */}
        <button
          onClick={handleEnroll}
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
            {/* Learning Outcomes */}
            <section className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-[#5E6AD2]" />
                <h2 className="text-2xl font-semibold">What You'll Learn</h2>
              </div>
              <ul className="space-y-3">
                {courseData.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#8A8F98]">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Course Modules */}
            <section className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-[#5E6AD2]" />
                <h2 className="text-2xl font-semibold">Course Modules</h2>
              </div>
              <div className="space-y-3">
                {courseData.miniTopics.map((topic, idx) => (
                  <div key={topic.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 flex items-center justify-center text-sm font-semibold text-[#5E6AD2]">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-white transition-colors">{topic.title}</h3>
                        <p className="text-xs text-[#8A8F98] mt-0.5">{topic.videoCount} videos</p>
                      </div>
                    </div>
                    <Play className="w-5 h-5 text-[#8A8F98] group-hover:text-[#5E6AD2] transition-colors" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#5E6AD2]" />
                Prerequisites
              </h3>
              <ul className="space-y-2">
                {courseData.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="text-sm text-[#8A8F98] flex items-start gap-2">
                    <span className="text-[#5E6AD2] mt-1">•</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <p className="text-xs text-[#8A8F98] mb-3">Join {courseData.enrolled.toLocaleString()} students</p>
                <div className="flex -space-x-2 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-[#050506]" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-[#0a0a0c] border-2 border-[#050506] flex items-center justify-center text-xs text-[#8A8F98]">
                    +{(courseData.enrolled - 5).toLocaleString()}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }) {
  const gradients = {
    yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    green: 'from-green-500/20 to-green-600/10 border-green-500/30',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradients[color]} border flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <div className="font-semibold text-white">{value}</div>
        <div className="text-[#8A8F98] text-xs">{label}</div>
      </div>
    </div>
  );
}
