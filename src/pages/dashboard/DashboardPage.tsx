import { motion} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Container from "../../components/ui/Container";
import VideoCard from "../../components/video/VideoCard";
import Progress from "./components/Progress";
import { mockVideos } from "../../utils/mockContent";

// Enhanced StatCard component with new design system
const EnhancedStatCard = ({ label, value }: { label: string; value: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer overflow-hidden rounded-2xl p-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* Mouse-tracking spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(94,106,210,0.15), transparent 80%)`,
        }}
      />
      
      {/* Card background with multi-layer shadows */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-2xl border border-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_20px_rgba(0,0,0,0.4),0_0_40px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(94,106,210,0.1)] transition-all duration-300" />
      
      {/* Top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-3xl font-semibold bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
          {value}
        </div>
        <div className="text-sm text-foreground-muted mt-2 font-mono tracking-widest">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced GlowCard with gradient border
const EnhancedGlowCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl p-6 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-2xl p-[1px]">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-2xl" />
      </div>
      
      {/* Mouse-tracking spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(94,106,210,0.2), transparent 70%)`,
        }}
      />
      
      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// Animated background blobs component
const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
      
      {/* Primary animated blob */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[1400px] rounded-full bg-accent/25 blur-[150px]"
        animate={{
          y: [0, -40, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary blob */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[600px] h-[800px] rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-[120px]"
        animate={{
          x: [0, 60, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Tertiary blob */}
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[500px] h-[700px] rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/10 blur-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Bottom accent blob */}
      <motion.div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-accent/10 blur-[80px]"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};



// Enhanced Section Component
const EnhancedSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-6 mt-6  ">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-3">
          {title}
        </h2>
        <div className="h-px w-20 bg-gradient-to-r from-accent to-transparent" />
      </div>
      {children}
    </motion.div>
  );
};


export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };



  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-background-base text-foreground overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Global mouse-tracking spotlight */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(94,106,210,0.08), transparent 80%)`,
        }}
      />
      
      <AmbientBackground />
      
      <div className="relative z-10">
        <Container>
          {/* ===== QUICK STATS ===== */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <EnhancedStatCard
              label="COURSES ENROLLED"
              value="6"
            />
            <EnhancedStatCard
              label="VIDEOS WATCHED"
              value="42"
            />
            <EnhancedStatCard
              label="UPLOADED VIDEOS"
              value="9"
            />
            <EnhancedStatCard
              label="STREAK"
              value="12 days"
            />
          </motion.div>

          {/* ===== MAIN GRID ===== */}
          <div className="grid grid-cols-12 gap-8">
            {/* LEFT CONTENT */}
            <div className="col-span-12 lg:col-span-8 space-y-12">
              {/* Continue Learning */}
              <EnhancedSection title="Continue Learning">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockVideos.map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                    >
                      <VideoCard 
                        video={video}
                        className="hover:scale-[1.02] transition-transform duration-300 ease-[0.16,1,0.3,1]"
                      />
                    </motion.div>
                  ))}
                </div>
              </EnhancedSection>

              {/* Uploaded Videos */}
              <EnhancedSection title="Your Uploaded Videos">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockVideos.slice(0, 4).map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + 0.2, duration: 0.4 }}
                    >
                      <VideoCard 
                        video={video}
                        variant="detailed"
                        className="hover:scale-[1.01] transition-transform duration-300 ease-[0.16,1,0.3,1]"
                      />
                    </motion.div>
                  ))}
                </div>
              </EnhancedSection>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              {/* Profile */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <EnhancedGlowCard>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full" />
                      <img
                        src="https://i.pravatar.cc/100"
                        className="h-16 w-16 rounded-full border-2 border-white/[0.08] relative z-10"
                        alt="Profile"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-lg text-foreground">Aryan Meena</div>
                      <div className="text-sm text-foreground-muted mt-1">Contributor · Web & DevOps</div>
                      <div className="flex gap-2 mt-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30">
                          Level 4
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-white/[0.05] text-foreground-muted border border-white/[0.06]">
                          Top 10%
                        </span>
                      </div>
                    </div>
                  </div>
                </EnhancedGlowCard>
              </motion.div>

              {/* Progress */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <EnhancedGlowCard>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-foreground-muted font-mono tracking-widest">WEEKLY PROGRESS</div>
                    <div className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                      +12%
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Progress
                      label="Frontend"
                      value={72}
                      gradient="from-accent to-accent-bright"
                    />
                    <Progress
                      label="Backend"
                      value={48}
                      gradient="from-indigo-500 to-purple-500"
                    />
                    <Progress
                      label="DevOps"
                      value={30}
                      gradient="from-cyan-500 to-blue-500"
                    />
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/[0.06]">
                    <div className="text-xs text-foreground-muted">
                      Keep it up! You're ahead of 78% of learners.
                    </div>
                  </div>
                </EnhancedGlowCard>
              </motion.div>

              {/* Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <EnhancedGlowCard>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-foreground-muted font-mono tracking-widest">RECENT ACTIVITY</div>
                    <div className="text-xs text-foreground-subtle">
                      Today
                    </div>
                  </div>
                  
                  <ul className="space-y-4">
                    {[
                      { text: "Uploaded Docker Basics", time: "2 hours ago", icon: "📤" },
                      { text: "Completed JS Closures", time: "4 hours ago", icon: "✅" },
                      { text: "Started System Design", time: "1 day ago", icon: "🚀" },
                      { text: "Reached 100 followers", time: "2 days ago", icon: "👥" },
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-3 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <div className="text-lg">{item.icon}</div>
                        <div className="flex-1">
                          <div className="text-foreground">{item.text}</div>
                          <div className="text-xs text-foreground-muted mt-1">{item.time}</div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </EnhancedGlowCard>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}