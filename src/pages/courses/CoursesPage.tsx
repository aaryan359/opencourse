import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Sparkles, TrendingUp, Users, CheckCircle, Award, Play, Code, MessageSquare, Rocket, Shield, Globe, Headphones, BookOpen, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { BackgroundEffects } from '../../components/ui/BackgroundEffects';
import { MouseSpotlight } from '../../components/mouse/MouseTrack';
import Button from '../../components/ui/Button';
import { fieldsApi } from '../../api/courses.api';


// 3. Card Component with Mouse Tracking
function TrackCard({ to, icon, title, description, gradient, count, features, stats }:any
) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <Link to={to} className="block">
      <div
        ref={cardRef}
        className="group relative rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] p-8 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)',
        }}
      >
        {/* Mouse-tracking spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(94,106,210,0.08) 0%, transparent 80%)`,
            opacity: isHovering ? 1 : 0
          }}
        />
        
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl ${gradient} border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
          {icon}
        </div>
        
        {/* Content */}
        <h3 className="text-2xl font-semibold mb-3 group-hover:text-white transition-colors">
          {title}
        </h3>
        
        <p className="text-[#8A8F98] mb-6 leading-relaxed">
          {description}
        </p>
        
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-semibold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-[#8A8F98]">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        
        {/* Features */}
        {features && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-sm text-[#8A8F98] group-hover:text-white/80 transition-colors">
                <CheckCircle className="w-4 h-4 text-[#5E6AD2] flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
          <span className="text-sm text-[#5E6AD2] font-medium">{count}</span>
           <Button    children={       <ArrowRight className="w-5 h-5 text-[#eeeff5] group-hover:translate-x-2 transition-transform duration-300" />}/>
        </div>
      </div>
    </Link>
  );
}

// 4. Stat Card Component
function StatCard({ icon, value, label, gradient }:any) {
  return (
    <div className="group relative rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-lg ${gradient} border border-white/10 flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-semibold text-white mb-2">{value}</div>
      <div className="text-sm text-[#8A8F98]">{label}</div>
    </div>
  );
}

// 5. Feature Card Component
function FeatureCard({ icon, title, description, gradient }) {
  return (
    <div className="group relative rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-lg ${gradient} border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-white mb-3">{title}</h4>
      <p className="text-sm text-[#8A8F98] leading-relaxed">{description}</p>
    </div>
  );
}





// Fallback gradient palette per field index
const GRADIENTS = [
  "bg-gradient-to-br from-[#5E6AD2]/30 via-purple-500/20 to-transparent",
  "bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-transparent",
  "bg-gradient-to-br from-pink-500/30 via-rose-500/20 to-transparent",
  "bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-transparent",
  "bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-transparent",
  "bg-gradient-to-br from-violet-500/30 via-purple-500/20 to-transparent",
];

export default function CoursesPage() {
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fieldsApi.listFields()
      .then((res) => setFields(res.data?.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] relative overflow-hidden">
      <BackgroundEffects />
      <MouseSpotlight />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-[#5E6AD2]" />
              <span className="text-xs font-mono tracking-widest text-[#8A8F98] uppercase">Transform Your Career</span>
            </div>
            
          </div>

        

          {/* Fields / Learning Paths */}
          <div className="max-w-6xl mx-auto">
            

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#5E6AD2]" />
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-8 mb-20">
                {fields.map((field, idx) => (
                  <TrackCard
                    key={field._id}
                    to={`/courses/${field.slug}`}
                    icon={<BookOpen className="w-8 h-8" />}
                    title={field.name}
                    description={field.description || `Explore ${field.name} courses and build real-world skills.`}
                    gradient={GRADIENTS[idx % GRADIENTS.length]}
                    count={`${field.slug}`}
                  />
                ))}
              </div>
            )}
          </div>

         
        </div>
      </div>
    </div>
  );
}