
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BackgroundEffects } from '../../components/ui/BackgroundEffects';


const mockContent = {
  tech: [
    { id: "web-dev", title: "Web Development", icon: "🌐", description: "Master modern web technologies", courseCount: 2 },
    { id: "backend", title: "Backend Development", icon: "⚙️", description: "Server-side programming and APIs", courseCount: 2 },
    { id: "devops", title: "DevOps", icon: "🚀", description: "Deployment and infrastructure", courseCount: 2 },
  ],
  nonTech: [
    { id: "soft-skills", title: "Professional Skills", icon: "💼", description: "Essential soft skills for career growth", courseCount: 1 },
    { id: "productivity", title: "Productivity", icon: "⚡", description: "Time management and efficiency", courseCount: 1 },
    { id: "career", title: "Career Development", icon: "📈", description: "Interview prep and resume building", courseCount: 1 },
  ],
};

export default function TrackPage() {
  const { track } = useParams();
  const domains = mockContent[track] || [];
  const trackTitle = track === 'tech' ? 'Technical' : 'Non-Technical';

  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] relative overflow-hidden">
      <BackgroundEffects />

      <div className="relative z-10 container mx-auto px-6 py-20 max-w-7xl">
        {/* Back Button */}
        <Link to="/courses" className="flex items-center gap-2 text-[#8A8F98] hover:text-white transition-colors mb-8 group">
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>Back to tracks</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-semibold tracking-tight mb-4">{trackTitle} Domains</h1>
          <p className="text-lg text-[#8A8F98]">Select a domain to explore courses</p>
        </div>

        {/* Domains Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, idx) => (
            <DomainCard key={domain.id} domain={domain} track={track} delay={idx * 50} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DomainCard({ domain, track, delay }) {
  return (
    <Link to={`/courses/${track}/${domain.id}`}>
      <div
        style={{ animationDelay: `${delay}ms` }}
        className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-2 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5)] animate-fadeIn opacity-0"
      >
        <div className="text-4xl mb-4">{domain.icon}</div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">{domain.title}</h3>
        <p className="text-sm text-[#8A8F98] mb-4">{domain.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#8A8F98]">{domain.courseCount} courses</span>
          <ArrowRight className="w-4 h-4 text-[#5E6AD2] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
