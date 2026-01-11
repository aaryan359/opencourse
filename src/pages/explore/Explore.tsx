import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { 
  Search, Filter, ChevronRight, Star, Users, Clock, BookOpen, 
  TrendingUp, Award, Zap, Play, Bookmark, BookmarkCheck,
  Grid, List, Eye, Heart,
  ArrowUp, ArrowDown
} from "lucide-react";

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
};

type Subcategory = {
  id: string;
  name: string;
  categoryId: string;
  count: number;
};

type Topic = {
  id: string;
  name: string;
  subcategoryId: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  count: number;
};

type Video = {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  rating: number;
  reviews: number;
  views: number;
  likes: number;
  thumbnail: string;
  topicId: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isBookmarked: boolean;
  isLiked: boolean;
  dateAdded: string;
  progress?: number;
};

type SortOption = 'rating' | 'views' | 'recent' | 'duration' | 'popular';

type ActiveFilters = {
  level: string[];
  duration: string[];
  rating: number;
};

const categories: Category[] = [
  { id: 'tech', name: 'Technology', icon: <Zap />, color: 'from-blue-500/20 to-cyan-500/20', count: 1240 },
  { id: 'design', name: 'Design', icon: <Award />, color: 'from-purple-500/20 to-pink-500/20', count: 890 },
  { id: 'business', name: 'Business', icon: <TrendingUp />, color: 'from-emerald-500/20 to-green-500/20', count: 760 },
  { id: 'creative', name: 'Creative', icon: <BookOpen />, color: 'from-amber-500/20 to-orange-500/20', count: 540 },
  { id: 'personal', name: 'Personal Growth', icon: <Users />, color: 'from-rose-500/20 to-red-500/20', count: 320 },
  { id: 'science', name: 'Science', icon: <Award />, color: 'from-blue-500/20 to-cyan-500/20', count: 450 },
  { id: 'math', name: 'Mathematics', icon: <TrendingUp />, color: 'from-purple-500/20 to-pink-500/20', count: 380 },
  { id: 'history', name: 'History', icon: <BookOpen />, color: 'from-emerald-500/20 to-green-500/20', count: 290 },
  { id: 'language', name: 'Languages', icon: <Users />, color: 'from-amber-500/20 to-orange-500/20', count: 520 },
  { id: 'music', name: 'Music', icon: <Zap />, color: 'from-rose-500/20 to-red-500/20', count: 410 },
];



const subcategories: Subcategory[] = [
  { id: 'webdev', name: 'Web Development', categoryId: 'tech', count: 420 },
  { id: 'mobile', name: 'Mobile Development', categoryId: 'tech', count: 210 },
  { id: 'ai', name: 'AI & Machine Learning', categoryId: 'tech', count: 180 },
  { id: 'devops', name: 'DevOps & Cloud', categoryId: 'tech', count: 150 },
  { id: 'data', name: 'Data Science', categoryId: 'tech', count: 280 },
  { id: 'cybersecurity', name: 'Cybersecurity', categoryId: 'tech', count: 190 },
  { id: 'gamedev', name: 'Game Development', categoryId: 'tech', count: 140 },
  { id: 'blockchain', name: 'Blockchain', categoryId: 'tech', count: 95 },
  { id: 'uiux', name: 'UI/UX Design', categoryId: 'design', count: 320 },
  { id: 'graphic', name: 'Graphic Design', categoryId: 'design', count: 210 },
  { id: 'motion', name: 'Motion Design', categoryId: 'design', count: 160 },
  { id: 'product', name: 'Product Design', categoryId: 'design', count: 200 },
  { id: 'webdesign', name: 'Web Design', categoryId: 'design', count: 180 },
  { id: 'branding', name: 'Branding', categoryId: 'design', count: 120 },
  { id: 'marketing', name: 'Marketing', categoryId: 'business', count: 240 },
  { id: 'finance', name: 'Finance', categoryId: 'business', count: 180 },
  { id: 'management', name: 'Management', categoryId: 'business', count: 220 },
  { id: 'entrepreneur', name: 'Entrepreneurship', categoryId: 'business', count: 120 },
  { id: 'sales', name: 'Sales', categoryId: 'business', count: 95 },
  { id: 'leadership', name: 'Leadership', categoryId: 'business', count: 110 },
  { id: 'photography', name: 'Photography', categoryId: 'creative', count: 180 },
  { id: 'videography', name: 'Videography', categoryId: 'creative', count: 140 },
  { id: 'writing', name: 'Writing', categoryId: 'creative', count: 210 },
  { id: 'art', name: 'Digital Art', categoryId: 'creative', count: 95 },
  { id: 'productivity', name: 'Productivity', categoryId: 'personal', count: 120 },
  { id: 'mindfulness', name: 'Mindfulness', categoryId: 'personal', count: 85 },
  { id: 'communication', name: 'Communication', categoryId: 'personal', count: 110 },
];

const topics: Topic[] = [
  { id: 'react', name: 'React', subcategoryId: 'webdev', level: 'intermediate', count: 95 },
  { id: 'nextjs', name: 'Next.js', subcategoryId: 'webdev', level: 'advanced', count: 45 },
  { id: 'vue', name: 'Vue.js', subcategoryId: 'webdev', level: 'intermediate', count: 60 },
  { id: 'angular', name: 'Angular', subcategoryId: 'webdev', level: 'advanced', count: 40 },
  { id: 'javascript', name: 'JavaScript', subcategoryId: 'webdev', level: 'beginner', count: 120 },
  { id: 'typescript', name: 'TypeScript', subcategoryId: 'webdev', level: 'intermediate', count: 75 },
  { id: 'css', name: 'CSS & Frameworks', subcategoryId: 'webdev', level: 'beginner', count: 85 },
  { id: 'backend', name: 'Backend Development', subcategoryId: 'webdev', level: 'advanced', count: 65 },
  { id: 'ml-basics', name: 'ML Fundamentals', subcategoryId: 'ai', level: 'beginner', count: 40 },
  { id: 'deep-learning', name: 'Deep Learning', subcategoryId: 'ai', level: 'advanced', count: 35 },
  { id: 'nlp', name: 'NLP', subcategoryId: 'ai', level: 'intermediate', count: 25 },
  { id: 'figma', name: 'Figma', subcategoryId: 'uiux', level: 'beginner', count: 90 },
  { id: 'prototyping', name: 'Prototyping', subcategoryId: 'uiux', level: 'intermediate', count: 45 },
  { id: 'design-systems', name: 'Design Systems', subcategoryId: 'uiux', level: 'advanced', count: 30 },
];

const videos: Video[] = [
  {
    id: '1',
    title: 'React Hooks Complete Guide - 2025 Edition',
    description: 'Master React Hooks with modern patterns and best practices. Learn useState, useEffect, custom hooks, and performance optimization.',
    duration: '4h 22m',
    instructor: 'Alex Johnson',
    rating: 4.9,
    reviews: 1242,
    views: 85420,
    likes: 12450,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    topicId: 'react',
    level: 'intermediate',
    tags: ['React', 'Hooks', 'Frontend', 'JavaScript'],
    isBookmarked: true,
    isLiked: false,
    dateAdded: '2024-03-15',
    progress: 75,
  },
  {
    id: '2',
    title: 'TypeScript for React Developers',
    description: 'TypeScript fundamentals and advanced patterns specifically for React development.',
    duration: '3h 45m',
    instructor: 'Sarah Chen',
    rating: 4.8,
    reviews: 892,
    views: 65210,
    likes: 8950,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    topicId: 'typescript',
    level: 'intermediate',
    tags: ['TypeScript', 'React', 'Frontend'],
    isBookmarked: false,
    isLiked: true,
    dateAdded: '2024-03-10',
  },
  {
    id: '3',
    title: 'Next.js 14 Masterclass',
    description: 'Build production-ready applications with Next.js 14. Learn App Router, Server Actions, and optimization techniques.',
    duration: '6h 15m',
    instructor: 'Michael Park',
    rating: 4.9,
    reviews: 1567,
    views: 124500,
    likes: 21450,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    topicId: 'nextjs',
    level: 'advanced',
    tags: ['Next.js', 'React', 'Fullstack'],
    isBookmarked: true,
    isLiked: true,
    dateAdded: '2024-03-01',
    progress: 30,
  },
  {
    id: '4',
    title: 'JavaScript Fundamentals for Beginners',
    description: 'Start your programming journey with JavaScript basics, from variables to functions.',
    duration: '5h 30m',
    instructor: 'David Wilson',
    rating: 4.7,
    reviews: 2345,
    views: 185420,
    likes: 32450,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    topicId: 'javascript',
    level: 'beginner',
    tags: ['JavaScript', 'Beginner', 'Fundamentals'],
    isBookmarked: false,
    isLiked: false,
    dateAdded: '2024-02-28',
  },
  {
    id: '5',
    title: 'Advanced CSS Grid & Flexbox',
    description: 'Master modern CSS layout techniques with Grid and Flexbox.',
    duration: '3h 10m',
    instructor: 'Emma Davis',
    rating: 4.8,
    reviews: 987,
    views: 75420,
    likes: 12450,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    topicId: 'css',
    level: 'intermediate',
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    isBookmarked: false,
    isLiked: false,
    dateAdded: '2024-02-25',
    progress: 100,
  },
  {
    id: '6',
    title: 'Node.js Backend Architecture',
    description: 'Build scalable backend systems with Node.js, Express, and MongoDB.',
    duration: '5h 45m',
    instructor: 'Robert Kim',
    rating: 4.9,
    reviews: 1245,
    views: 92450,
    likes: 18450,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    topicId: 'backend',
    level: 'advanced',
    tags: ['Node.js', 'Backend', 'Express', 'MongoDB'],
    isBookmarked: true,
    isLiked: false,
    dateAdded: '2024-02-20',
  },
  {
    id: '7',
    title: 'Vue.js 3 Composition API',
    description: 'Learn Vue.js 3 with the Composition API and modern Vue ecosystem.',
    duration: '4h 15m',
    instructor: 'Lisa Wong',
    rating: 4.7,
    reviews: 756,
    views: 65240,
    likes: 9540,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    topicId: 'vue',
    level: 'intermediate',
    tags: ['Vue.js', 'Frontend', 'JavaScript'],
    isBookmarked: false,
    isLiked: true,
    dateAdded: '2024-02-18',
  },
  {
    id: '8',
    title: 'Figma for Developers',
    description: 'Learn Figma basics to collaborate effectively with designers.',
    duration: '2h 30m',
    instructor: 'Design Team',
    rating: 4.6,
    reviews: 542,
    views: 45210,
    likes: 6540,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    topicId: 'figma',
    level: 'beginner',
    tags: ['Figma', 'Design', 'UI/UX'],
    isBookmarked: false,
    isLiked: false,
    dateAdded: '2024-02-15',
  },
];

const scrollbarStyles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(94, 106, 210, 0.3);
    border-radius: 10px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(94, 106, 210, 0.5);
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = scrollbarStyles;
  document.head.appendChild(style);
}

function AmbientBackground() {
  return (
    <>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />
      
      <div 
        className="fixed inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <motion.div
        className="fixed -top-[30%] -left-[20%] w-[1200px] h-[800px] rounded-full bg-gradient-to-br from-[#5E6AD2]/20 via-indigo-400/10 to-transparent blur-[120px]"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, 20, -10, 0],
          rotate: [0, 1, -1, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />
    </>
  );
}

export default function ExploreCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('tech');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedVideos, setBookmarkedVideos] = useState<string[]>(['1', '3', '6']);
  const [likedVideos, setLikedVideos] = useState<string[]>(['2', '3', '7']);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    level: [],
    duration: [],
    rating: 0,
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 12;

  // Memoize all videos array to prevent recreation on every render
  const allVideos = useMemo(() => 
    [...Array(50)].map((_, index) => ({
      ...videos[index % videos.length],
      id: `${index + 1}`,
      title: `${videos[index % videos.length].title} ${index >= videos.length ? `(Part ${Math.floor(index/videos.length) + 1})` : ''}`,
      views: Math.floor(Math.random() * 100000) + 10000,
      rating: 4 + Math.random() * 0.9,
    })),
    []
  );

  // Scroll position tracking with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrollPosition(window.scrollY);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array

  // Memoize filtered arrays to prevent unnecessary re-renders
  const filteredSubcategories = useMemo(() => 
    subcategories.filter(sub => sub.categoryId === selectedCategory),
    [selectedCategory]
  );
  
  const filteredTopics = useMemo(() => 
    topics.filter(topic => !selectedSubcategory || topic.subcategoryId === selectedSubcategory),
    [selectedSubcategory]
  );

  // Memoize filtered videos
  const filteredVideos = useMemo(() => 
    allVideos.filter(video => {
      if (selectedTopic && video.topicId !== selectedTopic) return false;
      
      if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !video.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      
      if (activeFilters.level.length > 0 && !activeFilters.level.includes(video.level)) {
        return false;
      }
      
      if (activeFilters.rating > 0 && video.rating < activeFilters.rating) {
        return false;
      }
      
      return true;
    }),
    [selectedTopic, searchQuery, activeFilters, allVideos]
  );

  // Memoize sorted videos
  const sortedVideos = useMemo(() => 
    [...filteredVideos].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'views':
          return b.views - a.views;
        case 'recent':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'duration':
          return parseFloat(b.duration.replace('h', '').replace('m', '')) - 
                 parseFloat(a.duration.replace('h', '').replace('m', ''));
        case 'popular':
          return b.likes - a.likes;
        default:
          return 0;
      }
    }),
    [filteredVideos, sortBy]
  );

  // Pagination logic
  useEffect(() => {
    const start = 0;
    const end = currentPage * videosPerPage;
    setDisplayedVideos(sortedVideos.slice(start, end));
  }, [sortedVideos, currentPage]);

  const loadMoreVideos = useCallback(() => {
    if (displayedVideos.length < sortedVideos.length) {
      setCurrentPage(prev => prev + 1);
    }
  }, [displayedVideos.length, sortedVideos.length]);

  const toggleBookmark = useCallback((videoId: string) => {
    setBookmarkedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  }, []);

  const toggleLike = useCallback((videoId: string) => {
    setLikedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] overflow-hidden">
      <AmbientBackground />
      
      <Navigation />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSection 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <div className="flex flex-col lg:flex-row gap-8 mt-12">
            <Sidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              filteredSubcategories={filteredSubcategories}
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
              filteredTopics={filteredTopics}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
            
            <div className="flex-1">
              <ContentHeader
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                selectedTopic={selectedTopic}
                categories={categories}
                subcategories={subcategories}
                topics={topics}
                viewMode={viewMode}
                setViewMode={setViewMode}
                sortBy={sortBy}
                setSortBy={setSortBy}
                resultCount={sortedVideos.length}
                scrollPosition={scrollPosition}
              />
              
              <ScrollableVideoSection
                videos={displayedVideos}
                viewMode={viewMode}
                loadMoreVideos={loadMoreVideos}
                hasMoreVideos={displayedVideos.length < sortedVideos.length}
              />
              
              {displayedVideos.length < sortedVideos.length && (
                <div className="flex justify-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={loadMoreVideos}
                    className="px-6 py-3 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] text-[#EDEDEF] font-medium hover:border-white/[0.1] transition-all"
                  >
                    Load More ({sortedVideos.length - displayedVideos.length} remaining)
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#050506]/95 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#5E6AD2] to-indigo-600 flex items-center justify-center shadow-[0_0_40px_rgba(94,106,210,0.3)]">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                LearnSphere
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-6">
              {['Explore', 'My Learning', 'Bookmarks', 'Paths', 'Community'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="text-sm text-[#8A8F98] hover:text-[#EDEDEF] transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] text-sm text-[#EDEDEF] border border-white/[0.06] hover:border-white/[0.1] transition-all"
            >
              <BookmarkCheck className="h-4 w-4" />
              Bookmarks
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-b from-[#5E6AD2] to-indigo-600 text-sm font-medium text-white shadow-[0_0_20px_rgba(94,106,210,0.3)]"
            >
              Upgrade to Pro
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ searchQuery, setSearchQuery }: { 
  searchQuery: string; 
  setSearchQuery: (query: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8A8F98]" />
          <input
            type="text"
            placeholder="Search courses, topics, or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-5 py-4 rounded-2xl bg-[#0F0F12] border border-white/[0.1] text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/30 transition-all"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden sm:block">
            <span className="px-3 py-1 rounded-lg bg-white/[0.05] text-xs text-[#8A8F98] border border-white/[0.06]">
              ⌘K
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

type SidebarProps = {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  filteredSubcategories: Subcategory[];
  selectedSubcategory: string | null;
  setSelectedSubcategory: (id: string | null) => void;
  filteredTopics: Topic[];
  selectedTopic: string | null;
  setSelectedTopic: (id: string | null) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  activeFilters: ActiveFilters;
  setActiveFilters: (filters: ActiveFilters) => void;
};

function Sidebar({
  selectedCategory,
  setSelectedCategory,
  filteredSubcategories,
  selectedSubcategory,
  setSelectedSubcategory,
  filteredTopics,
  selectedTopic,
  setSelectedTopic,
  showFilters,
  setShowFilters,
  activeFilters,
  setActiveFilters
}: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const subcategoriesRef = useRef<HTMLDivElement>(null);

  const handleLevelFilter = useCallback((level: string) => {
    setActiveFilters({
      ...activeFilters,
      level: activeFilters.level.includes(level)
        ? activeFilters.level.filter(l => l !== level)
        : [...activeFilters.level, level]
    });
  }, [activeFilters, setActiveFilters]);

  const clearFilters = useCallback(() => {
    setActiveFilters({
      level: [],
      duration: [],
      rating: 0,
    });
    setSelectedSubcategory(null);
    setSelectedTopic(null);
  }, [setActiveFilters, setSelectedSubcategory, setSelectedTopic]);

  return (
    <>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden flex items-center justify-between w-full mb-6 px-4 py-3 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06]"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-[#EDEDEF]">
          <Filter className="h-4 w-4" />
          Filters & Categories
        </span>
        <ChevronRight className={`h-4 w-4 text-[#8A8F98] transition-transform ${showFilters ? 'rotate-90' : ''}`} />
      </button>

      <div
        ref={sidebarRef}
        className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-80 space-y-8`}
      >
        <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#EDEDEF]">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-xs text-[#8A8F98] hover:text-[#EDEDEF] transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-[#EDEDEF] mb-2">Level</h4>
              <div className="flex flex-wrap gap-2">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLevelFilter(level)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeFilters.level.includes(level)
                        ? level === 'beginner'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : level === 'intermediate'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-white/[0.05] text-[#8A8F98] border border-white/[0.06] hover:border-white/[0.1]'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[#EDEDEF] mb-2">Minimum Rating</h4>
              <div className="flex items-center gap-2">
                {[0, 3, 4, 4.5].map((rating) => (
                  <motion.button
                    key={rating}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveFilters({...activeFilters, rating})}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeFilters.rating === rating
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-white/[0.05] text-[#8A8F98] border border-white/[0.06] hover:border-white/[0.1]'
                    }`}
                  >
                    <Star className="h-3 w-3" />
                    {rating === 0 ? 'Any' : rating}+
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {(activeFilters.level.length > 0 || activeFilters.rating > 0) && (
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6">
            <h3 className="text-lg font-semibold text-[#EDEDEF] mb-4">Active Filters</h3>
            <div className="space-y-2">
              {activeFilters.level.map((level: string) => (
                <div key={level} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.05]">
                  <span className="text-sm text-[#EDEDEF]">Level: {level}</span>
                  <button
                    onClick={() => handleLevelFilter(level)}
                    className="text-xs text-[#8A8F98] hover:text-[#EDEDEF]"
                  >
                    Remove
                  </button>
                </div>
              ))}
              {activeFilters.rating > 0 && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.05]">
                  <span className="text-sm text-[#EDEDEF]">Rating: {activeFilters.rating}+</span>
                  <button
                    onClick={() => setActiveFilters({...activeFilters, rating: 0})}
                    className="text-xs text-[#8A8F98] hover:text-[#EDEDEF]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6">
          <h3 className="text-lg font-semibold text-[#EDEDEF] mb-4">Categories</h3>
          <div 
            ref={categoriesRef}
            className="scrollbar-thin space-y-2 overflow-y-auto"
            style={{ maxHeight: '300px' }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedSubcategory(null);
                  setSelectedTopic(null);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#5E6AD2]/20 to-indigo-500/10 border border-[#5E6AD2]/30'
                    : 'hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <div className="text-[#5E6AD2]">
                      {category.icon}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-[#EDEDEF]">{category.name}</div>
                    <div className="text-xs text-[#8A8F98]">{category.count} courses</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8A8F98]" />
              </motion.button>
            ))}
          </div>
        </div>

        {filteredSubcategories.length > 0 && (
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#EDEDEF]">Subcategories</h3>
              <button
                onClick={() => setSelectedSubcategory(null)}
                className="text-xs text-[#8A8F98] hover:text-[#EDEDEF] transition-colors"
              >
                Clear
              </button>
            </div>
            <div 
              ref={subcategoriesRef}
              className="scrollbar-thin space-y-2 overflow-y-auto"
              style={{ maxHeight: '250px' }}
            >
              {filteredSubcategories.map((subcategory) => (
                <motion.button
                  key={subcategory.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedSubcategory(
                      selectedSubcategory === subcategory.id ? null : subcategory.id
                    );
                    setSelectedTopic(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedSubcategory === subcategory.id
                      ? 'bg-gradient-to-r from-[#5E6AD2]/20 to-indigo-500/10 border border-[#5E6AD2]/30'
                      : 'hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#EDEDEF]">{subcategory.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#8A8F98]">{subcategory.count}</span>
                      {selectedSubcategory === subcategory.id && (
                        <div className="h-2 w-2 rounded-full bg-[#5E6AD2]" />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {filteredTopics.length > 0 && (
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#EDEDEF]">Topics</h3>
              <button
                onClick={() => setSelectedTopic(null)}
                className="text-xs text-[#8A8F98] hover:text-[#EDEDEF] transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2">
              {filteredTopics.map((topic) => (
                <motion.button
                  key={topic.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTopic(
                    selectedTopic === topic.id ? null : topic.id
                  )}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedTopic === topic.id
                      ? 'bg-gradient-to-r from-[#5E6AD2]/20 to-indigo-500/10 border border-[#5E6AD2]/30'
                      : 'hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#EDEDEF]">{topic.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-lg ${
                        topic.level === 'beginner' 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : topic.level === 'intermediate'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-purple-500/10 text-purple-400'
                      }`}>
                        {topic.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#8A8F98]">{topic.count}</span>
                      {selectedTopic === topic.id && (
                        <div className="h-2 w-2 rounded-full bg-[#5E6AD2]" />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

type ContentHeaderProps = {
  selectedCategory: string;
  selectedSubcategory: string | null;
  selectedTopic: string | null;
  categories: Category[];
  subcategories: Subcategory[];
  topics: Topic[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  resultCount: number;
  scrollPosition: number;
};

function ContentHeader({
  selectedCategory,
  selectedSubcategory,
  selectedTopic,
  categories,
  subcategories,
  topics,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  resultCount,
  scrollPosition
}: ContentHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSelectedCategoryName = () => {
    return categories.find(c => c.id === selectedCategory)?.name || '';
  };

  const getSelectedSubcategoryName = () => {
    return subcategories.find(s => s.id === selectedSubcategory)?.name || '';
  };

  const getSelectedTopicName = () => {
    return topics.find(t => t.id === selectedTopic)?.name || '';
  };

  const sortOptions = [
    { id: 'rating' as SortOption, label: 'Highest Rating', icon: <Star className="h-4 w-4" /> },
    { id: 'popular' as SortOption, label: 'Most Popular', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'views' as SortOption, label: 'Most Viewed', icon: <Eye className="h-4 w-4" /> },
    { id: 'recent' as SortOption, label: 'Recently Added', icon: <Clock className="h-4 w-4" /> },
    { id: 'duration' as SortOption, label: 'Duration', icon: <Clock className="h-4 w-4" /> },
  ];

  const currentSort = sortOptions.find(s => s.id === sortBy);

  return (
    <div className={`mb-8 transition-all duration-300 ${scrollPosition > 100 ? 'sticky top-20 z-30 bg-[#050506]/80 backdrop-blur-xl py-4 rounded-2xl border border-white/[0.06] px-6' : ''}`}>
      <div className="flex items-center gap-2 text-sm text-[#8A8F98] mb-4">
        <motion.button
          whileHover={{ x: -2 }}
          className="hover:text-[#EDEDEF] transition-colors"
        >
          Explore
        </motion.button>
        <ChevronRight className="h-3 w-3" />
        <motion.button
          whileHover={{ x: -2 }}
          className="text-[#EDEDEF] hover:text-white transition-colors"
        >
          {getSelectedCategoryName()}
        </motion.button>
        {selectedSubcategory && (
          <>
            <ChevronRight className="h-3 w-3" />
            <motion.button
              whileHover={{ x: -2 }}
              className="text-[#EDEDEF] hover:text-white transition-colors"
            >
              {getSelectedSubcategoryName()}
            </motion.button>
          </>
        )}
        {selectedTopic && (
          <>
            <ChevronRight className="h-3 w-3" />
            <motion.button
              whileHover={{ x: -2 }}
              className="text-[#EDEDEF] hover:text-white transition-colors"
            >
              {getSelectedTopicName()}
            </motion.button>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-[#EDEDEF]">
            {selectedTopic 
              ? getSelectedTopicName()
              : selectedSubcategory
              ? getSelectedSubcategoryName()
              : getSelectedCategoryName()
            } Courses
          </h2>
          <p className="text-[#8A8F98] mt-1">
            {resultCount} {resultCount === 1 ? 'course' : 'courses'} found
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.05] border border-white/[0.06]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-b from-[#5E6AD2]/20 to-indigo-500/10 text-[#5E6AD2]'
                  : 'text-[#8A8F98] hover:text-[#EDEDEF]'
              }`}
            >
              <Grid className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-b from-[#5E6AD2]/20 to-indigo-500/10 text-[#5E6AD2]'
                  : 'text-[#8A8F98] hover:text-[#EDEDEF]'
              }`}
            >
              <List className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="relative" ref={dropdownRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.06] text-sm font-medium text-[#EDEDEF] hover:border-white/[0.1] transition-all"
            >
              {currentSort?.icon}
              {currentSort?.label}
              <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-90' : ''}`} />
            </motion.button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/[0.06] bg-[#0F0F12] shadow-2xl z-50 overflow-hidden"
                >
                  {sortOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSortBy(option.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                        sortBy === option.id
                          ? 'text-[#5E6AD2] bg-gradient-to-r from-[#5E6AD2]/10 to-transparent'
                          : 'text-[#8A8F98] hover:text-[#EDEDEF] hover:bg-white/[0.05]'
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

type ScrollableVideoSectionProps = {
  videos: Video[];
  viewMode: 'grid' | 'list';
  loadMoreVideos: () => void;
  hasMoreVideos: boolean;
};

function ScrollableVideoSection({ 
  videos, 
  viewMode,
  loadMoreVideos,
  hasMoreVideos
}: ScrollableVideoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Use refs for callbacks to avoid dependency issues
  const loadMoreRef = useRef(loadMoreVideos);
  const hasMoreRef = useRef(hasMoreVideos);
  
  // Update refs when props change
  useEffect(() => {
    loadMoreRef.current = loadMoreVideos;
    hasMoreRef.current = hasMoreVideos;
  }, [loadMoreVideos, hasMoreVideos]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        setShowScrollTop(scrollTop > 300);
        
        // Load more when reaching bottom
        if (scrollHeight - scrollTop - clientHeight < 100 && hasMoreRef.current) {
          loadMoreRef.current?.();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      // Use passive listener for better performance
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []); // Empty dependency array - setup once

  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ 
        top: containerRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  }, []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="scrollbar-thin overflow-y-auto"
        style={{ 
          maxHeight: 'calc(100vh - 280px)',
          minHeight: '600px'
        }}
      >
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCardComponent
                key={video.id}
                video={video}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {videos.map((video) => (
              <div key={video.id} className="flex gap-6">
                <div className="w-64">
                  <VideoCardComponent
                    video={video}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#EDEDEF] mb-2">{video.title}</h3>
                  <p className="text-sm text-[#8A8F98] mb-3 line-clamp-2">{video.description}</p>
                  <div className="flex items-center gap-4 text-sm text-[#8A8F98]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {video.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {(video.views / 1000).toFixed(1)}k views
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400" />
                      {video.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {videos.length === 0 && (
          <div className="text-center py-16">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#5E6AD2]/20 to-indigo-500/10 border-2 border-[#5E6AD2]/30 flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-[#5E6AD2]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#EDEDEF] mb-3">
              No videos found
            </h3>
            <p className="text-[#8A8F98]">
              Try adjusting your filters or search for something else.
            </p>
          </div>
        )}
      </div>

      <div className="absolute right-4 bottom-4 flex flex-col gap-2 z-10">
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="h-10 w-10 rounded-xl bg-gradient-to-b from-[#5E6AD2] to-indigo-600 flex items-center justify-center shadow-lg shadow-[#5E6AD2]/30"
          >
            <ArrowUp className="h-5 w-5 text-white" />
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToBottom}
          className="h-10 w-10 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] flex items-center justify-center hover:border-white/[0.1]"
        >
          <ArrowDown className="h-5 w-5 text-[#EDEDEF]" />
        </motion.button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050506] to-transparent pointer-events-none" />
    </div>
  );
}

type VideoCardProps = {
  video: Video;
};

function VideoCardComponent({ video }: VideoCardProps) {
  const handleClick = useCallback(() => {
    console.log('Video clicked:', video.id);
  }, [video.id]);

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`Play video: ${video.title}`}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur transition-all duration-300 hover:border-white/[0.1] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(94,106,210,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E6AD2]/40"
    >
      {video.progress && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/[0.1] z-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${video.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#5E6AD2] to-indigo-400"
          />
        </div>
      )}

      <div className="relative aspect-video overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#5E6AD2]/20 to-indigo-500/10"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-[#5E6AD2]">
            <Play className="h-12 w-12 opacity-50" />
          </div>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur ring-1 ring-white/20 shadow-lg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>

        <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur">
          {video.duration}
        </div>

        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm ${
            video.level === 'beginner' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : video.level === 'intermediate'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
          }`}>
            {video.level}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-sm font-semibold text-[#EDEDEF] leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {video.title}
        </h3>

        <div className="text-xs text-[#8A8F98]">
          by <span className="text-[#EDEDEF] font-medium">{video.instructor}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#8A8F98]">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {(video.views / 1000).toFixed(1)}k views
          </span>
          <span className="text-[#8A8F98]">•</span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            {video.rating.toFixed(1)} ({video.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 text-xs text-[#8A8F98]">
          <div className="flex gap-1">
            {video.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5">
                #{tag}
              </span>
            ))}
            {video.tags.length > 2 && (
              <span className="px-2 py-0.5">+{video.tags.length - 2}</span>
            )}
          </div>

          <div className="flex gap-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="h-6 w-6 rounded flex items-center justify-center hover:bg-white/5"
            >
              <Bookmark className="h-3 w-3" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="h-6 w-6 rounded flex items-center justify-center hover:bg-white/5"
            >
              <Heart className="h-3 w-3" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}