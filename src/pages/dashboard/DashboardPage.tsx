import { motion} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Container from "../../components/ui/Container";
import Progress from "./components/Progress";
import { userApi } from "../../api/courses.api";
import { useAuthStore } from "../../store/auth.store";
import { Play, Loader2, ExternalLink } from "lucide-react";

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
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);

  const [stats, setStats] = useState({
    totalCourses: 0, completedCourses: 0, totalVideosWatched: 0,
    uploadedVideos: 0, level: 1, xp: 0,
  });
  const [uploads, setUploads] = useState<any[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoadingStats(true);
    Promise.all([
      userApi.getStats(),
      userApi.getUploads(),
    ])
      .then(([statsRes, uploadsRes]) => {
        setStats(statsRes.data?.data ?? stats);
        setUploads(uploadsRes.data?.data ?? []);
      })
      .catch(() => {})
      .finally(() => setLoadingStats(false));
  }, [token]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const displayName = user?.profile?.firstName
    ? `${user.profile.firstName} ${user.profile.lastName ?? ""}`.trim()
    : user?.username ?? "Learner";
  const title = user?.profile?.title ?? "Learner";
  const avatar = user?.profile?.avatar ?? "https://i.pravatar.cc/100";



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
            <EnhancedStatCard label="COURSES ENROLLED" value={loadingStats ? "..." : String(stats.totalCourses)} />
            <EnhancedStatCard label="VIDEOS WATCHED" value={loadingStats ? "..." : String(stats.totalVideosWatched)} />
            <EnhancedStatCard label="UPLOADED VIDEOS" value={loadingStats ? "..." : String(stats.uploadedVideos)} />
            <EnhancedStatCard label="LEVEL" value={loadingStats ? "..." : `Level ${stats.level}`} />
          </motion.div>

          {/* ===== MAIN GRID ===== */}
          <div className="grid grid-cols-12 gap-8">
            {/* LEFT CONTENT */}
            <div className="col-span-12 lg:col-span-8 space-y-12">
              {/* Continue Learning */}
              <EnhancedSection title="Continue Learning">
                {uploads.length === 0 && !loadingStats ? (
                  <p className="text-foreground-muted text-sm">Enroll in a course to start learning.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {uploads.slice(0, 3).map((video: any, index: number) => (
                      <motion.div
                        key={video._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.4 }}
                      >
                        <UploadCard video={video} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </EnhancedSection>

              {/* Uploaded Videos */}
              <EnhancedSection title="Your Uploaded Videos">
                {uploads.length === 0 && !loadingStats ? (
                  <p className="text-foreground-muted text-sm">You haven't uploaded any videos yet.</p>
                ) : loadingStats ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-accent" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {uploads.map((video: any, index: number) => (
                      <motion.div
                        key={video._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index + 0.2, duration: 0.4 }}
                      >
                        <UploadCard video={video} detailed />
                      </motion.div>
                    ))}
                  </div>
                )}
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
                        src={avatar}
                        className="h-16 w-16 rounded-full border-2 border-white/[0.08] relative z-10"
                        alt="Profile"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-lg text-foreground">{displayName}</div>
                      <div className="text-sm text-foreground-muted mt-1">{title}</div>
                      <div className="flex gap-2 mt-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30">
                          Level {stats.level}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-white/[0.05] text-foreground-muted border border-white/[0.06] capitalize">
                          {user?.role ?? "student"}
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
                    {uploads.slice(0, 4).length > 0
                      ? uploads.slice(0, 4).map((video: any, index: number) => (
                        <motion.li
                          key={video._id}
                          className="flex items-start gap-3 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <div className="text-lg">📤</div>
                          <div className="flex-1">
                            <div className="text-foreground line-clamp-1">{video.title}</div>
                            <div className="text-xs text-foreground-muted mt-1 capitalize">{video.status}</div>
                          </div>
                        </motion.li>
                      ))
                      : [
                        { text: "Start contributing videos!", time: "right now", icon: "🚀" },
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
                      ))
                    }
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

// UploadCard component for displaying API video objects
function UploadCard({ video, detailed = false }: { video: any; detailed?: boolean }) {
  const STATUS_COLORS: Record<string, string> = {
    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  const statusColor = STATUS_COLORS[video.status] ?? STATUS_COLORS.pending;
  const courseTitle = typeof video.course === "object" ? video.course?.title : null;
  const topicTitle = typeof video.topic === "object" ? video.topic?.title : null;

  return (
    <div className="group rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 hover:border-white/[0.12] transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-white transition-colors">
          {video.title}
        </h3>
        <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border capitalize ${statusColor}`}>
          {video.status}
        </span>
      </div>

      {video.description && (
        <p className="text-xs text-foreground-muted mb-3 line-clamp-2">{video.description}</p>
      )}

      {detailed && (
        <div className="text-xs text-foreground-muted space-y-1 mb-3">
          {courseTitle && <p>Course: <span className="text-foreground">{courseTitle}</span></p>}
          {topicTitle && <p>Topic: <span className="text-foreground">{topicTitle}</span></p>}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
        <span className="text-xs text-foreground-muted">
          {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : ""}
        </span>
        {video.url && (
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Play className="w-3 h-3" />
            View
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}