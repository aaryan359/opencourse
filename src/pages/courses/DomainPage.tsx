import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Star, Clock, BookOpen, TrendingUp } from 'lucide-react';
import { BackgroundEffects } from '../../components/ui/BackgroundEffects';


const coursesByDomain = {
  "web-dev": [
    { id: "javascript", title: "JavaScript Mastery", level: "Intermediate", duration: "8 weeks", rating: 4.8, enrolled: 12450, moduleCount: 3 },
    { id: "react", title: "React Development", level: "Advanced", duration: "10 weeks", rating: 4.9, enrolled: 18200, moduleCount: 2 },
  ],
  "backend": [
    { id: "node", title: "Node.js Fundamentals", level: "Intermediate", duration: "6 weeks", rating: 4.7, enrolled: 9800, moduleCount: 2 },
    { id: "database", title: "Database Design", level: "Advanced", duration: "7 weeks", rating: 4.8, enrolled: 11200, moduleCount: 2 },
  ],
  "soft-skills": [
    { id: "communication", title: "Communication Mastery", level: "Beginner", duration: "4 weeks", rating: 4.7, enrolled: 8900, moduleCount: 1 },
  ],
};

export default function DomainPage() {
  const { track, domain } = useParams();
  const courses = coursesByDomain[domain] || [];

  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] relative overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10 container mx-auto px-6 py-20 max-w-7xl">
        {/* Back Button */}
        <Link to={`/courses/${track}`} className="flex items-center gap-2 text-[#8A8F98] hover:text-white transition-colors mb-8 group">
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>Back to domains</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-semibold tracking-tight mb-4">Available Courses</h1>
          <p className="text-lg text-[#8A8F98]">Choose a course to view details and enroll</p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <CourseCard key={course.id} course={course} track={track} domain={domain} delay={idx * 50} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, track, domain, delay }) {
  return (
    <Link to={`/courses/${track}/${domain}/${course.id}`}>
      <div
        style={{ animationDelay: `${delay}ms` }}
        className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-2 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(94,106,210,0.1)] animate-fadeIn opacity-0"
      >
        {/* Level Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${
            course.level === 'Beginner' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
            course.level === 'Intermediate' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
            'bg-purple-500/10 text-purple-400 border border-purple-500/20'
          }`}>
            {course.level}
          </span>
          <div className="flex items-center gap-1 text-sm text-[#8A8F98]">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="font-medium">{course.rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">{course.title}</h3>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-[#8A8F98] mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{course.moduleCount} modules</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-[#8A8F98]">{course.enrolled.toLocaleString()} enrolled</span>
          <ArrowRight className="w-4 h-4 text-[#5E6AD2] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}