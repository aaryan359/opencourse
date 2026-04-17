import { useEffect, useState } from "react";
import { MessageCircle, Users, Sparkles, TrendingUp, Zap, Globe, BookOpen, Award, Search, Heart, Menu, X, Star, Users2, Rocket, BadgeCheck, Clock } from "lucide-react";


function AmbientBackground() {
  return (
    <>
      {/* Base gradient layer */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />
      
      {/* Noise texture */}
      <div 
        className="fixed inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Gradient blobs (static) */}
      <div
        className="fixed -top-[40%] -left-[20%] w-[1400px] h-[900px] rounded-full bg-gradient-to-br from-[#5E6AD2]/25 via-indigo-400/15 to-transparent blur-[150px]"
      />
      
      <div
        className="fixed top-1/3 -left-[10%] w-[800px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-transparent blur-[120px]"
      />
      
      <div
        className="fixed -bottom-[30%] -right-[10%] w-[700px] h-[500px] rounded-full bg-gradient-to-tl from-[#5E6AD2]/12 via-blue-400/10 to-transparent blur-[100px]"
      />
      
      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />
    </>
  );
}

// ============================================================================
// MOUSE-TRACKING SPOTLIGHT COMPONENT
// ============================================================================

function MouseSpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div 
      className={`relative overflow-hidden rounded-2xl transition-all ${className}`}
    >
      {/* Content */}
      {children}
    </div>
  );
}

// ============================================================================
// ENHANCED NAVIGATION
// ============================================================================

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Discussions", href: "#discussions" },
    { label: "Creators", href: "#creators" },
    { label: "Events", href: "#events" },
    { label: "Resources", href: "#resources" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#050506]/95 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#5E6AD2] to-indigo-600 flex items-center justify-center shadow-[0_0_40px_rgba(94,106,210,0.3)]">
                <Users2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                CodeSphere
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-[#8A8F98] hover:text-[#EDEDEF] transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#5E6AD2] to-transparent group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              
              <button
                className="px-5 py-2.5 rounded-lg bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] text-sm font-medium text-[#EDEDEF] hover:border-white/[0.1] transition-all active:scale-95"
              >
                Join Community
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden h-10 w-10 rounded-lg bg-white/[0.05] flex items-center justify-center border border-white/[0.06] transition-transform active:scale-95"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-[#EDEDEF]" />
              ) : (
                <Menu className="h-5 w-5 text-[#EDEDEF]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed top-16 inset-x-0 z-40 md:hidden bg-[#050506]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-[#EDEDEF] text-sm border-b border-white/[0.06] last:border-0 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <button
              className="w-full py-3 rounded-lg bg-gradient-to-b from-[#5E6AD2] to-indigo-600 text-sm font-medium text-white mt-4 transition-transform active:scale-95"
            >
              Join Community
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// ENHANCED COMMUNITY PAGE
// ============================================================================

export default function EnhancedCommunityPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] overflow-hidden">
      <AmbientBackground />
      <Navigation />
      
      <div
        className="relative pt-32 pb-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <Hero />
        </div>
      </div>

      <div className="relative z-10 space-y-32 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <EnhancedStats />
        </div>
        
        <div className="max-w-7xl mx-auto px-6" id="discussions">
          <FeaturedDiscussions />
        </div>
        
        <div className="max-w-7xl mx-auto px-6" id="creators">
          <TopCreators />
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <LiveEvents />
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <ResourceHub />
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <EnhancedCTA />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- HERO -------------------------------- */

function Hero() {
  return (
    <div className="relative z-10 text-center space-y-8">
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#5E6AD2]/10 to-indigo-500/10 border border-[#5E6AD2]/20 text-sm text-[#5E6AD2]">
          <Sparkles className="h-3.5 w-3.5" />
          Community Driven Learning
        </span>
      </div>

      <h1
        className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-none tracking-tight"
      >
        <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
          Learn. Share.
        </span>{" "}
        <span
          className="bg-gradient-to-r from-[#5E6AD2] via-indigo-400 to-[#5E6AD2] bg-clip-text text-transparent"
        >
          Grow Together.
        </span>
      </h1>

      <p
        className="max-w-2xl mx-auto text-lg text-[#8A8F98] leading-relaxed"
      >
        Join a global community of passionate learners and creators. Share knowledge, 
        collaborate on projects, and accelerate your growth with real-world insights.
      </p>

      <div
        className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
      >
        <button
          className="px-8 py-4 rounded-lg bg-gradient-to-b from-[#5E6AD2] to-indigo-600 text-white font-medium shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_12px_rgba(94,106,210,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_0_1px_rgba(94,106,210,0.6),0_8px_24px_rgba(94,106,210,0.4),inset_0_1px_0_0_rgba(255,255,255,0.3)] transition-all active:scale-95 relative overflow-hidden group"
        >
          <span className="relative z-10">Join Community Free</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>

        <button
          className="px-8 py-4 rounded-lg bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] text-white font-medium hover:border-white/[0.1] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all active:scale-95"
        >
          Explore Discussions
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- ENHANCED STATS -------------------------------- */

function EnhancedStats() {
  const stats = [
    { 
      label: "Active Members", 
      value: "42.8K+", 
      icon: <Users className="h-5 w-5" />,
      change: "+12%",
      description: "Global community members"
    },
    { 
      label: "Discussions", 
      value: "8.3K+", 
      icon: <MessageCircle className="h-5 w-5" />,
      change: "+24%",
      description: "Active conversations"
    },
    { 
      label: "Creators", 
      value: "1.2K+", 
      icon: <Sparkles className="h-5 w-5" />,
      change: "+18%",
      description: "Content creators"
    },
    { 
      label: "Projects Built", 
      value: "3.7K+", 
      icon: <Globe className="h-5 w-5" />,
      change: "+31%",
      description: "Collaborative projects"
    },
  ];

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <MouseSpotlightCard className="p-6 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] transition-all hover:border-white/[0.1]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#5E6AD2]/10 to-indigo-500/10 border border-[#5E6AD2]/20 flex items-center justify-center text-[#5E6AD2]">
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              
              <div>
                <div className="text-3xl font-semibold bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-[#EDEDEF] mt-1">{stat.label}</div>
                <div className="text-xs text-[#8A8F98] mt-1">{stat.description}</div>
              </div>
            </div>
          </MouseSpotlightCard>
        </div>
      ))}
    </div>
  );
}

/* -------------------------- ENHANCED FEATURED DISCUSSIONS ------------------------ */

function FeaturedDiscussions() {
  const discussions = [
    {
      title: "Building Real-time Collaborative Apps with Next.js & Liveblocks",
      author: { name: "Alex Chen", verified: true, role: "Senior Frontend Engineer" },
      tags: ["Next.js", "Real-time", "WebSockets"],
      replies: 142,
      likes: 428,
      views: "2.4k",
      time: "2 hours ago",
      trending: true,
    },
    {
      title: "The Future of AI in Web Development: Practical Applications",
      author: { name: "Sarah Park", verified: true, role: "AI Research Lead" },
      tags: ["AI", "ML", "Web Dev"],
      replies: 89,
      likes: 312,
      views: "1.8k",
      time: "5 hours ago",
      trending: true,
    },
    {
      title: "Micro-frontends at Scale: Our Journey at TechCorp",
      author: { name: "Marcus Rivera", verified: false, role: "Staff Engineer" },
      tags: ["Architecture", "Micro-frontends", "Scalability"],
      replies: 64,
      likes: 189,
      views: "1.2k",
      time: "1 day ago",
      trending: false,
    },
    {
      title: "TypeScript Advanced Patterns You Should Know",
      author: { name: "David Kim", verified: true, role: "TypeScript Core Team" },
      tags: ["TypeScript", "Advanced"],
      replies: 217,
      likes: 542,
      views: "3.1k",
      time: "3 days ago",
      trending: true,
    },
    {
      title: "Building Accessible Design Systems from Scratch",
      author: { name: "Lisa Wong", verified: true, role: "Design Systems Lead" },
      tags: ["Design Systems", "Accessibility", "UI/UX"],
      replies: 73,
      likes: 231,
      views: "1.5k",
      time: "4 days ago",
      trending: false,
    },
    {
      title: "The $1M Side Project: Lessons Learned Scaling to 100K Users",
      author: { name: "Ryan Foster", verified: true, role: "Founder & CEO" },
      tags: ["Startup", "Scaling", "SaaS"],
      replies: 156,
      likes: 487,
      views: "2.8k",
      time: "1 week ago",
      trending: true,
    },
  ];

  const [filter, setFilter] = useState("trending");
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Featured Discussions"
        subtitle="Join conversations shaping the future of tech"
        icon={<MessageCircle />}
      />

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8A8F98]" />
          <input
            type="text"
            placeholder="Search discussions, topics, or members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0F0F12] border border-white/[0.1] text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/30 transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {["trending", "recent", "popular", "unanswered", "solved"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${
                filter === item
                  ? "bg-[#5E6AD2] text-white shadow-[0_0_20px_rgba(94,106,210,0.3)]"
                  : "bg-white/[0.05] text-[#8A8F98] hover:text-[#EDEDEF]"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions Grid */}
      <div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {discussions.map((discussion) => (
          <div key={discussion.title}>
            <EnhancedDiscussionCard {...discussion} />
          </div>
        ))}
      </div>

    </div>
  );
}

function EnhancedDiscussionCard({
  title,
  author,
  tags,
  replies,
  likes,
  views,
  time,
  trending,
}: any) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="h-full transition-transform duration-300 hover:-translate-y-2"
    >
      <MouseSpotlightCard className="h-full p-6 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all group cursor-pointer">
        <div className="space-y-5 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#5E6AD2]/20 to-indigo-500/10 border border-[#5E6AD2]/20 flex items-center justify-center">
                <div className="h-6 w-6 text-[#5E6AD2] font-semibold text-sm">
                  {author.name[0]}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium text-[#EDEDEF]">{author.name}</div>
                  {author.verified && (
                    <BadgeCheck className="h-4 w-4 text-[#5E6AD2]" />
                  )}
                </div>
                <div className="text-xs text-[#8A8F98]">{author.role}</div>
              </div>
            </div>
            {trending && (
              <span
                className="px-2 py-1 rounded-md bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-xs font-medium text-orange-400 flex items-center gap-1"
              >
                <TrendingUp className="h-3 w-3" />
                Trending
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[#EDEDEF] group-hover:text-white transition-colors leading-tight">
            {title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-white/[0.05] text-xs text-[#8A8F98] border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 mt-auto">
            <div className="flex items-center gap-4 text-sm text-[#8A8F98]">
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" />
                {replies}
              </span>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-1.5 hover:text-rose-400 transition-colors active:scale-90"
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-rose-400 text-rose-400" : ""}`} />
                {likes}
              </button>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {views}
              </span>
            </div>
            <div className="text-xs text-[#8A8F98]">{time}</div>
          </div>
        </div>
      </MouseSpotlightCard>
    </div>
  );
}

/* ------------------------------ TOP CREATORS -------------------------------- */

function TopCreators() {
  const creators = [
    {
      name: "Alex Chen",
      role: "Senior Frontend Engineer",
      expertise: ["React", "TypeScript", "Performance"],
      followers: "12.4K",
      contributions: 342,
      rank: 1,
      verified: true,
    },
    {
      name: "Sarah Park",
      role: "AI Research Lead",
      expertise: ["Machine Learning", "Python", "TensorFlow"],
      followers: "9.8K",
      contributions: 287,
      rank: 2,
      verified: true,
    },
    {
      name: "Marcus Rivera",
      role: "Staff Engineer",
      expertise: ["System Design", "Go", "Distributed Systems"],
      followers: "8.2K",
      contributions: 231,
      rank: 3,
      verified: true,
    },
    {
      name: "David Kim",
      role: "TypeScript Core Team",
      expertise: ["TypeScript", "Compiler Design", "Tooling"],
      followers: "15.6K",
      contributions: 412,
      rank: 4,
      verified: true,
    },
    {
      name: "Lisa Wong",
      role: "Design Systems Lead",
      expertise: ["Figma", "Design Tokens", "Accessibility"],
      followers: "7.3K",
      contributions: 189,
      rank: 5,
      verified: true,
    },
    {
      name: "Ryan Foster",
      role: "Founder & CEO",
      expertise: ["Startups", "SaaS", "Growth"],
      followers: "21.2K",
      contributions: 567,
      rank: 6,
      verified: true,
    },
  ];

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Top Contributors"
        subtitle="Recognizing our most active community members"
        icon={<Award />}
      />

      <div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {creators.map((creator) => (
          <div key={creator.name}>
            <MouseSpotlightCard className="p-6 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all">
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#5E6AD2]/30 to-indigo-500/20 border-2 border-[#5E6AD2]/30 flex items-center justify-center text-white font-semibold text-xl">
                        {creator.name[0]}
                      </div>
                      {creator.rank <= 3 && (
                        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-xs font-bold text-white">
                          {creator.rank}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-semibold text-[#EDEDEF]">
                          {creator.name}
                        </div>
                        {creator.verified && (
                          <BadgeCheck className="h-5 w-5 text-[#5E6AD2]" />
                        )}
                      </div>
                      <div className="text-sm text-[#8A8F98]">{creator.role}</div>
                    </div>
                  </div>
                  
                  <button
                    className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-xs text-[#8A8F98] hover:text-[#EDEDEF] border border-white/[0.06] hover:border-white/[0.1] transition-all active:scale-95"
                  >
                    Follow
                  </button>
                </div>

                {/* Expertise */}
                <div className="space-y-3">
                  <div className="text-sm text-[#8A8F98]">Expertise</div>
                  <div className="flex flex-wrap gap-2">
                    {creator.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#5E6AD2]/10 to-indigo-500/10 text-xs font-medium text-[#5E6AD2] border border-[#5E6AD2]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-[#EDEDEF]">
                      {creator.contributions}
                    </div>
                    <div className="text-xs text-[#8A8F98]">Contributions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-[#EDEDEF]">
                      {creator.followers}
                    </div>
                    <div className="text-xs text-[#8A8F98]">Followers</div>
                  </div>
                </div>
              </div>
            </MouseSpotlightCard>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ LIVE EVENTS -------------------------------- */

function LiveEvents() {
  const events = [
    {
      title: "React Server Components Deep Dive",
      host: "Next.js Core Team",
      date: "Tomorrow, 2:00 PM EST",
      attendees: 342,
      type: "workshop",
      live: true,
    },
    {
      title: "Building AI Agents with LangChain",
      host: "LangChain Creator",
      date: "Friday, 11:00 AM PST",
      attendees: 189,
      type: "talk",
      live: false,
    },
    {
      title: "Design Systems Masterclass",
      host: "Design Systems Lead",
      date: "Saturday, 3:00 PM GMT",
      attendees: 267,
      type: "masterclass",
      live: false,
    },
  ];

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Upcoming Events"
        subtitle="Live workshops, talks, and networking sessions"
        icon={<Zap />}
      />

      <div
        className="grid gap-6 md:grid-cols-3"
      >
        {events.map((event) => (
          <div key={event.title}>
            <MouseSpotlightCard className="h-full p-6 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all">
              <div className="space-y-5 h-full flex flex-col">
                {/* Event Type */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    event.type === "workshop"
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : event.type === "talk"
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                  {event.live && (
                    <span
                      className="flex items-center gap-1.5 text-xs font-medium text-rose-400"
                    >
                      <div className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
                      Live Soon
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#EDEDEF] leading-tight">
                  {event.title}
                </h3>

                {/* Host */}
                <div className="text-sm text-[#8A8F98]">
                  Hosted by <span className="text-[#EDEDEF] font-medium">{event.host}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-[#8A8F98]">
                  <Clock className="h-4 w-4" />
                  {event.date}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 text-sm text-[#8A8F98]">
                    <Users className="h-4 w-4" />
                    {event.attendees} attending
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                      event.live
                        ? "bg-gradient-to-b from-[#5E6AD2] to-indigo-600 text-white shadow-[0_0_20px_rgba(94,106,210,0.3)]"
                        : "bg-white/[0.05] text-[#EDEDEF] border border-white/[0.06] hover:border-white/[0.1]"
                    }`}
                  >
                    {event.live ? "Set Reminder" : "Learn More"}
                  </button>
                </div>
              </div>
            </MouseSpotlightCard>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ RESOURCE HUB -------------------------------- */

function ResourceHub() {
  const resources = [
    {
      title: "The Ultimate React Performance Guide",
      type: "guide",
      author: "Performance Team",
      reads: "12.4K",
      length: "15 min",
      premium: false,
    },
    {
      title: "TypeScript Cheatsheet 2025",
      type: "cheatsheet",
      author: "TypeScript Team",
      reads: "28.7K",
      length: "8 min",
      premium: false,
    },
    {
      title: "Building Scalable APIs with GraphQL",
      type: "tutorial",
      author: "API Team",
      reads: "9.3K",
      length: "25 min",
      premium: true,
    },
    {
      title: "CSS Grid & Flexbox Masterclass",
      type: "course",
      author: "CSS Working Group",
      reads: "15.2K",
      length: "45 min",
      premium: true,
    },
  ];

  return (
    <div className="space-y-10">
      <SectionHeader
        title="Learning Resources"
        subtitle="Curated guides, tutorials, and cheatsheets"
        icon={<BookOpen />}
      />

      <div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {resources.map((resource) => (
          <div key={resource.title}>
            <MouseSpotlightCard className="h-full p-6 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all">
              <div className="space-y-4 h-full flex flex-col">
                {/* Type Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-white/[0.05] text-xs text-[#8A8F98] border border-white/[0.06]">
                    {resource.type}
                  </span>
                  {resource.premium && (
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#EDEDEF] leading-tight">
                  {resource.title}
                </h3>

                {/* Author */}
                <div className="text-sm text-[#8A8F98]">
                  by {resource.author}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/[0.06]">
                  <div className="flex items-center gap-4 text-sm text-[#8A8F98]">
                    <span className="flex items-center gap-1.5">
                      <Eye className="h-4 w-4" />
                      {resource.reads}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {resource.length}
                    </span>
                  </div>
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] text-[#EDEDEF] border border-white/[0.06] hover:border-white/[0.1] transition-all active:scale-95"
                  >
                    {resource.premium ? "Unlock" : "Read"}
                  </button>
                </div>
              </div>
            </MouseSpotlightCard>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- ENHANCED CTA ---------------------------------- */

function EnhancedCTA() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/[0.06]"
    >
      {/* Animated background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#5E6AD2]/10 via-indigo-500/5 to-emerald-500/10"
      />
      
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative p-12 md:p-16 text-center">
        <div
          className="space-y-8 max-w-3xl mx-auto"
        >
          {/* Icon */}
          <div className="flex justify-center">
            <div
              className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#5E6AD2]/20 to-indigo-500/10 border-2 border-[#5E6AD2]/30 flex items-center justify-center animate-spin"
            >
              <Rocket className="h-10 w-10 text-[#5E6AD2]" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
              Ready to Level Up Your Skills?
            </h2>
            <p className="text-lg text-[#8A8F98] max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers, designers, and creators who are already building the future together.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 py-8">
            {[
              { value: "42.8K+", label: "Community Members" },
              { value: "8.3K+", label: "Active Discussions" },
              { value: "1.2K+", label: "Expert Contributors" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-semibold text-[#EDEDEF]">{stat.value}</div>
                <div className="text-sm text-[#8A8F98]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-b from-[#5E6AD2] to-indigo-600 text-white font-medium shadow-[0_0_0_1px_rgba(94,106,210,0.5),0_4px_12px_rgba(94,106,210,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_0_1px_rgba(94,106,210,0.6),0_8px_24px_rgba(94,106,210,0.4),inset_0_1px_0_0_rgba(255,255,255,0.3)] transition-all overflow-hidden active:scale-95"
            >
              <span className="relative z-10">Join Community Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>

            <button
              className="px-8 py-4 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] text-[#EDEDEF] font-medium hover:border-white/[0.1] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all active:scale-95"
            >
              Explore Features
            </button>
          </div>

          {/* Footer note */}
          <p className="text-sm text-[#8A8F98] pt-8">
            No credit card required • Get started in 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- SECTION HEADER ------------------------------ */

function SectionHeader({ 
  title, 
  subtitle, 
  icon 
}: { 
  title: string; 
  subtitle?: string; 
  icon: React.ReactNode;
}) {
  return (
    <div
      className="space-y-4"
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#5E6AD2]/10 to-indigo-500/10 border border-[#5E6AD2]/20 flex items-center justify-center text-[#5E6AD2]">
          {icon}
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-lg text-[#8A8F98] max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* --------------------------- UTILITY COMPONENTS ------------------------------ */

const Eye = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);