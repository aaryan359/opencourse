import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Video, MessageSquare, ChevronRight, Sparkles, 
  Upload, Users, BookOpen, Trophy, ArrowRight,
  CheckCircle, Star, TrendingUp
} from "lucide-react";
import Container from "../../components/ui/Container";
import { useAuthStore } from "../../store/auth.store";

// ============================================================================
// CONTRIBUTION OPTIONS
// ============================================================================

const contributionOptions = [
  {
    id: "video",
    title: "Upload a Video",
    description: "Share your knowledge by uploading educational videos to help others learn. Videos are reviewed before publishing.",
    icon: Video,
    color: "from-[#5E6AD2] to-purple-500",
    bgGlow: "rgba(94, 106, 210, 0.15)",
    features: [
      "Link YouTube or external videos",
      "Videos are reviewed for quality",
      "Help learners worldwide",
      "Build your contributor profile"
    ],
    stats: { label: "Videos Shared", value: "500+" },
    cta: "Start Uploading"
  },
  {
    id: "interview",
    title: "Share Interview Questions",
    description: "Help others prepare by sharing real interview questions from your experience at top companies.",
    icon: MessageSquare,
    color: "from-emerald-500 to-teal-500",
    bgGlow: "rgba(16, 185, 129, 0.15)",
    features: [
      "Share real interview experiences",
      "Help peers prepare better",
      "Add questions from any company",
      "Include tips and answers"
    ],
    stats: { label: "Questions Shared", value: "2K+" },
    cta: "Share Questions"
  }
];

// ============================================================================
// STATS DATA
// ============================================================================

const communityStats = [
  { icon: Users, value: "5,000+", label: "Contributors" },
  { icon: Upload, value: "500+", label: "Videos" },
  { icon: MessageSquare, value: "2,000+", label: "Interview Questions" },
  { icon: Trophy, value: "50+", label: "Top Contributors" }
];

// ============================================================================
// MAIN COMPONENT  
// ============================================================================

export default function ContributePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />
      <div className="fixed inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      
      {/* Animated gradient blobs */}
      <motion.div
        className="fixed -top-[30%] left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#5E6AD2]/20 via-purple-500/10 to-transparent blur-[120px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-emerald-500/15 via-teal-500/10 to-transparent blur-[100px]"
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <Container className="relative z-10 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#5E6AD2]" />
            <span className="text-xs font-medium text-[#8A8F98] tracking-wide">
              Community-Driven Learning
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
              Contribute to
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#5E6AD2] via-purple-400 to-[#5E6AD2] bg-[length:200%] bg-clip-text text-transparent">
              OpenCourse
            </span>
          </h1>

          <p className="text-lg text-[#8A8F98] leading-relaxed max-w-2xl mx-auto">
            Share your knowledge and help build the world's most comprehensive open learning platform. 
            Every contribution makes a difference.
          </p>
        </motion.div>

        {/* Contribution Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20"
        >
          {contributionOptions.map((option, idx) => (
            <ContributionCard
              key={option.id}
              option={option}
              index={idx}
              onClick={() => {
                if (!user) {
                  navigate("/login");
                } else {
                  navigate(`/contribute/new?type=${option.id}`);
                }
              }}
            />
          ))}
        </motion.div>

        {/* Not logged in notice */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-16 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">Sign in to contribute</h3>
                <p className="text-sm text-[#8A8F98] mb-4">
                  You need an account to submit videos and interview questions. Join our community of contributors!
                </p>
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 rounded-xl bg-[#5E6AD2] text-white text-sm font-medium hover:bg-[#6872D9] transition-all shadow-lg shadow-[#5E6AD2]/25"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm font-medium hover:bg-white/[0.08] transition-all"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-center mb-8">
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              Our Growing Community
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {communityStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center group hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#5E6AD2]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#5E6AD2]/15 transition-colors">
                  <stat.icon className="w-6 h-6 text-[#5E6AD2]" />
                </div>
                <div className="text-2xl font-semibold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[#8A8F98]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <h2 className="text-2xl font-semibold text-center mb-10">
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
              How Contributing Works
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                step: "01", 
                title: "Choose Type", 
                desc: "Select whether you want to upload a video or share interview questions",
                icon: BookOpen
              },
              { 
                step: "02", 
                title: "Submit Content", 
                desc: "Provide details, links, and context for your contribution",
                icon: Upload
              },
              { 
                step: "03", 
                title: "Get Featured", 
                desc: "After review, your content goes live and helps thousands of learners",
                icon: TrendingUp
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="text-4xl font-bold text-[#5E6AD2]/20 mb-4">{item.step}</div>
                <div className="w-10 h-10 rounded-lg bg-[#5E6AD2]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#5E6AD2]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-[#8A8F98] leading-relaxed">{item.desc}</p>
                
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-[#5E6AD2]/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

// ============================================================================
// CONTRIBUTION CARD COMPONENT
// ============================================================================

function ContributionCard({ 
  option, 
  index, 
  onClick 
}: { 
  option: typeof contributionOptions[0]; 
  index: number; 
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-white/[0.12]"
        style={{
          boxShadow: isHovering
            ? `0 0 0 1px rgba(255,255,255,0.1), 0 20px 50px rgba(0,0,0,0.5), 0 0 80px ${option.bgGlow}`
            : '0 0 0 1px rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Mouse tracking spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${option.bgGlow} 0%, transparent 50%)`,
            opacity: isHovering ? 1 : 0,
          }}
        />

        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Icon */}
        <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${option.color} p-0.5 mb-6`}>
          <div className="w-full h-full rounded-[10px] bg-[#0a0a0c] flex items-center justify-center">
            <option.icon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
          {option.title}
        </h3>
        
        <p className="text-[#8A8F98] text-sm leading-relaxed mb-6">
          {option.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {option.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-[#8A8F98]">
              <CheckCircle className="w-4 h-4 text-[#5E6AD2] flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Stats */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-white">{option.stats.value}</div>
            <div className="text-xs text-[#8A8F98]">{option.stats.label}</div>
          </div>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${option.color} text-white text-sm font-medium transition-all group-hover:shadow-lg`}>
            {option.cta}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
