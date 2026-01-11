import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Sparkles, Zap, TrendingUp, Users, Star, CheckCircle, Award, Play, Code, MessageSquare, Rocket, Shield, Globe, Headphones } from 'lucide-react';
import { useState, useRef } from 'react';
import { BackgroundEffects } from '../../components/ui/BackgroundEffects';
import { MouseSpotlight } from '../../components/mouse/MouseTrack';
import Button from '../../components/ui/Button';


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





export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] relative overflow-hidden">
      {/* Reusable Background Components */}
      <BackgroundEffects />
      <MouseSpotlight />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-10 max-w-7xl">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-[#5E6AD2]" />
              <span className="text-xs font-mono tracking-widest text-[#8A8F98] uppercase">Transform Your Career</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-none mb-8">
              <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                Master In-Demand Skills
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#5E6AD2] via-indigo-400 to-[#5E6AD2] bg-[length:200%] bg-clip-text text-transparent">
                With Expert-Led Courses
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-[#8A8F98] leading-relaxed max-w-3xl mx-auto mb-12">
              Join 50,000+ professionals who have accelerated their careers through our industry-leading curriculum. 
              Hands-on projects, personalized mentorship, and real-world applications.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/courses/all">
                <button className="group relative px-8 py-4 rounded-lg bg-gradient-to-br from-[#5E6AD2] to-[#6872D9] font-semibold text-white shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_12px_rgba(94,106,210,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_0_1px_rgba(94,106,210,0.8),0_8px_24px_rgba(94,106,210,0.4),inset_0_1px_0_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]">
                  <span className="relative z-10">Explore All Courses</span>
                  <ArrowRight className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link to="/demo">
                <button className="px-8 py-4 rounded-lg border border-white/[0.12] bg-white/[0.05] font-semibold text-white hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1">
                  <Play className="inline-block w-5 h-5 mr-3" />
                  Watch Demo
                </button>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              <StatCard
                icon={<Users className="w-6 h-6" />}
                value="50K+"
                label="Active Learners"
                gradient="bg-gradient-to-br from-[#5E6AD2]/20 to-purple-500/10"
              />
              <StatCard
                icon={<Award className="w-6 h-6" />}
                value="98%"
                label="Satisfaction Rate"
                gradient="bg-gradient-to-br from-emerald-500/20 to-teal-500/10"
              />
              <StatCard
                icon={<Code className="w-6 h-6" />}
                value="300+"
                label="Hours of Content"
                gradient="bg-gradient-to-br from-cyan-500/20 to-blue-500/10"
              />
              <StatCard
                icon={<Briefcase className="w-6 h-6" />}
                value="85%"
                label="Career Advancement"
                gradient="bg-gradient-to-br from-amber-500/20 to-orange-500/10"
              />
            </div>
          </div>

          {/* Main Tracks Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-6">
                <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                  Choose Your Learning Path
                </span>
              </h2>
              <p className="text-lg text-[#8A8F98] max-w-3xl mx-auto">
                Select from our expertly crafted tracks designed to take you from beginner to expert.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-20">
              <TrackCard
                to="/courses/tech"
                icon={<Zap className="w-8 h-8" />}
                title="Technical Skills (TECH)"
                description="Master modern technologies with hands-on projects and real-world applications. Perfect for developers, engineers, and tech enthusiasts."
                gradient="bg-gradient-to-br from-[#5E6AD2]/30 via-purple-500/20 to-transparent"
                count="15+ Specialized Courses"
                features={[
                  "Full-Stack Development",
                  "DevOps & Cloud Engineering",
                  "Data Science & AI/ML",
                  "System Design & Architecture",
                  "Cybersecurity Fundamentals"
                ]}
                stats={[
                  { value: "24/7", label: "Support" },
                  { value: "50+", label: "Projects" }
                ]}
              />
              
              <TrackCard
                to="/courses/non-tech"
                icon={<TrendingUp className="w-8 h-8" />}
                title="Professional Growth (NON TECH)"
                description="Develop essential soft skills and leadership capabilities to accelerate your career growth and personal development."
                gradient="bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-transparent"
                count="12+ Master Classes"
                features={[
                  "Leadership & Management",
                  "Communication & Presentation",
                  "Productivity & Time Management",
                  "Career Strategy & Networking",
                  "Remote Work Excellence"
                ]}
                stats={[
                  { value: "1:1", label: "Coaching" },
                  { value: "100%", label: "Practical" }
                ]}
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-6">
                <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                  Why Learn With Us
                </span>
              </h2>
              <p className="text-lg text-[#8A8F98] max-w-3xl mx-auto">
                Experience education reimagined with cutting-edge pedagogy and industry expertise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              <FeatureCard
                icon={<Rocket className="w-6 h-6" />}
                title="Project-Based Learning"
                description="Build real-world projects from day one. Learn by doing with our comprehensive project library."
                gradient="bg-gradient-to-br from-[#5E6AD2]/20 to-purple-500/10"
              />
              <FeatureCard
                icon={<MessageSquare className="w-6 h-6" />}
                title="Expert Mentorship"
                description="Get 1:1 guidance from industry professionals with years of real-world experience."
                gradient="bg-gradient-to-br from-emerald-500/20 to-teal-500/10"
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6" />}
                title="Job-Ready Curriculum"
                description="Courses designed in collaboration with leading tech companies to ensure relevance."
                gradient="bg-gradient-to-br from-cyan-500/20 to-blue-500/10"
              />
              <FeatureCard
                icon={<Globe className="w-6 h-6" />}
                title="Global Community"
                description="Connect with peers worldwide, collaborate on projects, and grow your network."
                gradient="bg-gradient-to-br from-amber-500/20 to-orange-500/10"
              />
              <FeatureCard
                icon={<Headphones className="w-6 h-6" />}
                title="Flexible Learning"
                description="Learn at your own pace with lifetime access to all course materials and updates."
                gradient="bg-gradient-to-br from-pink-500/20 to-rose-500/10"
              />
              <FeatureCard
                icon={<Award className="w-6 h-6" />}
                title="Industry Recognition"
                description="Earn certificates recognized by top companies and add them to your professional profile."
                gradient="bg-gradient-to-br from-violet-500/20 to-purple-500/10"
              />
            </div>
          </div>

         
        </div>

       
      </div>

      {/* Global Animation Styles */}
      <style>{`
        @keyframes blob-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.05); }
        }
        @keyframes blob-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.03); }
        }
        @keyframes blob-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -15px) scale(1.02); }
        }
        @keyframes shimmer {
          0% { background-position: -100% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-blob-float-1 {
          animation: blob-float-1 25s ease-in-out infinite;
        }
        .animate-blob-float-2 {
          animation: blob-float-2 30s ease-in-out infinite;
        }
        .animate-blob-float-3 {
          animation: blob-float-3 35s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}