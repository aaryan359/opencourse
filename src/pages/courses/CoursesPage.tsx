import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { 
  Search, Filter, ChevronRight, Star, Users, Clock, BookOpen, 
  TrendingUp, Award, Zap, Play, Bookmark, BookmarkCheck,
  Grid, List, Eye, Heart, Upload, FileVideo, Tag, Hash, 
  AlertCircle, CheckCircle, XCircle, Loader2, Plus, Edit,
  Video, FileText, Link, Image as ImageIcon, Globe, Lock,
  ThumbsUp, ThumbsDown, MessageSquare, Share2, EyeOff,
  BarChart, Users as UsersIcon, TrendingUp as TrendingUpIcon,
  Award as AwardIcon, Target
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  type: 'tech' | 'non-tech';
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

type ExistingVideo = {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  rating: number;
  views: number;
  thumbnail: string;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  uploadDate: string;
  likes: number;
  comments: number;
  status: 'approved' | 'pending' | 'featured';
};

type ContributionData = {
  topicId: string;
  title: string;
  description: string;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  videoUrl?: string;
  videoFile?: File;
  externalLinks?: string[];
  notes?: string;
};

type UploadProgress = {
  status: 'idle' | 'uploading' | 'processing' | 'success' | 'error';
  percentage: number;
  message: string;
};

// ============================================================================
// DATA
// ============================================================================

const categories: Category[] = [
  { id: 'tech', name: 'Technology', icon: <Zap />, color: 'from-blue-500/20 to-cyan-500/20', count: 1240, type: 'tech' },
  { id: 'design', name: 'Design', icon: <Award />, color: 'from-purple-500/20 to-pink-500/20', count: 890, type: 'tech' },
  { id: 'business', name: 'Business', icon: <TrendingUp />, color: 'from-emerald-500/20 to-green-500/20', count: 760, type: 'non-tech' },
  { id: 'creative', name: 'Creative', icon: <BookOpen />, color: 'from-amber-500/20 to-orange-500/20', count: 540, type: 'non-tech' },
  { id: 'personal', name: 'Personal Growth', icon: <Users />, color: 'from-rose-500/20 to-red-500/20', count: 320, type: 'non-tech' },
];

const subcategories: Subcategory[] = [
  // Tech
  { id: 'webdev', name: 'Web Development', categoryId: 'tech', count: 420 },
  { id: 'mobile', name: 'Mobile Development', categoryId: 'tech', count: 210 },
  { id: 'ai', name: 'AI & Machine Learning', categoryId: 'tech', count: 180 },
  { id: 'devops', name: 'DevOps & Cloud', categoryId: 'tech', count: 150 },
  { id: 'data', name: 'Data Science', categoryId: 'tech', count: 280 },
  
  // Design
  { id: 'uiux', name: 'UI/UX Design', categoryId: 'design', count: 320 },
  { id: 'graphic', name: 'Graphic Design', categoryId: 'design', count: 210 },
  { id: 'motion', name: 'Motion Design', categoryId: 'design', count: 160 },
  { id: 'product', name: 'Product Design', categoryId: 'design', count: 200 },
  
  // Business
  { id: 'marketing', name: 'Marketing', categoryId: 'business', count: 240 },
  { id: 'finance', name: 'Finance', categoryId: 'business', count: 180 },
  { id: 'management', name: 'Management', categoryId: 'business', count: 220 },
  { id: 'entrepreneur', name: 'Entrepreneurship', categoryId: 'business', count: 120 },
  
  // Creative
  { id: 'photography', name: 'Photography', categoryId: 'creative', count: 180 },
  { id: 'writing', name: 'Writing', categoryId: 'creative', count: 210 },
  { id: 'music', name: 'Music Production', categoryId: 'creative', count: 95 },
  
  // Personal Growth
  { id: 'productivity', name: 'Productivity', categoryId: 'personal', count: 120 },
  { id: 'mindfulness', name: 'Mindfulness', categoryId: 'personal', count: 85 },
  { id: 'communication', name: 'Communication', categoryId: 'personal', count: 110 },
];

const topics: Topic[] = [
  // Web Development
  { id: 'react', name: 'React', subcategoryId: 'webdev', level: 'intermediate', count: 95 },
  { id: 'nextjs', name: 'Next.js', subcategoryId: 'webdev', level: 'advanced', count: 45 },
  { id: 'vue', name: 'Vue.js', subcategoryId: 'webdev', level: 'intermediate', count: 60 },
  { id: 'angular', name: 'Angular', subcategoryId: 'webdev', level: 'advanced', count: 40 },
  { id: 'javascript', name: 'JavaScript', subcategoryId: 'webdev', level: 'beginner', count: 120 },
  { id: 'typescript', name: 'TypeScript', subcategoryId: 'webdev', level: 'intermediate', count: 75 },
  { id: 'css', name: 'CSS & Frameworks', subcategoryId: 'webdev', level: 'beginner', count: 85 },
  { id: 'backend', name: 'Backend Development', subcategoryId: 'webdev', level: 'advanced', count: 65 },
  
  // AI & ML
  { id: 'ml-basics', name: 'ML Fundamentals', subcategoryId: 'ai', level: 'beginner', count: 40 },
  { id: 'deep-learning', name: 'Deep Learning', subcategoryId: 'ai', level: 'advanced', count: 35 },
  { id: 'nlp', name: 'NLP', subcategoryId: 'ai', level: 'intermediate', count: 25 },
  
  // UI/UX Design
  { id: 'figma', name: 'Figma', subcategoryId: 'uiux', level: 'beginner', count: 90 },
  { id: 'prototyping', name: 'Prototyping', subcategoryId: 'uiux', level: 'intermediate', count: 45 },
  { id: 'design-systems', name: 'Design Systems', subcategoryId: 'uiux', level: 'advanced', count: 30 },
];

const existingVideos: ExistingVideo[] = [
  {
    id: '1',
    title: 'React Hooks Complete Guide',
    description: 'Master React Hooks with modern patterns',
    duration: '4h 22m',
    instructor: 'Alex Johnson',
    rating: 4.9,
    views: 85420,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    tags: ['React', 'Hooks', 'JavaScript'],
    level: 'intermediate',
    uploadDate: '2024-03-15',
    likes: 12450,
    comments: 142,
    status: 'approved'
  },
  {
    id: '2',
    title: 'TypeScript for React Developers',
    description: 'TypeScript fundamentals for React',
    duration: '3h 45m',
    instructor: 'Sarah Chen',
    rating: 4.8,
    views: 65210,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    tags: ['TypeScript', 'React'],
    level: 'intermediate',
    uploadDate: '2024-03-10',
    likes: 8950,
    comments: 89,
    status: 'approved'
  },
  {
    id: '3',
    title: 'React Performance Optimization',
    description: 'Advanced techniques for React performance',
    duration: '2h 30m',
    instructor: 'Michael Park',
    rating: 4.7,
    views: 45210,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    tags: ['React', 'Performance', 'Optimization'],
    level: 'advanced',
    uploadDate: '2024-03-05',
    likes: 6540,
    comments: 67,
    status: 'pending'
  },
];

// ============================================================================
// STYLES
// ============================================================================

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

// ============================================================================
// AMBIENT BACKGROUND
// ============================================================================

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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ContributePage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [contributionData, setContributionData] = useState<ContributionData>({
    topicId: '',
    title: '',
    description: '',
    tags: [],
    level: 'beginner',
    videoUrl: '',
    externalLinks: [],
    notes: ''
  });
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    status: 'idle',
    percentage: 0,
    message: ''
  });

  // Memoize filtered data
  const filteredSubcategories = useMemo(() => 
    selectedCategory ? subcategories.filter(sub => sub.categoryId === selectedCategory) : [],
    [selectedCategory]
  );
  
  const filteredTopics = useMemo(() => 
    selectedSubcategory ? topics.filter(topic => topic.subcategoryId === selectedSubcategory) : [],
    [selectedSubcategory]
  );
  
  const filteredExistingVideos = useMemo(() => 
    selectedTopic ? existingVideos.filter(video => {
      // In real app, this would filter by topic
      return selectedTopic === 'react';
    }) : [],
    [selectedTopic]
  );

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    setSelectedTopic(null);
    setStep(2);
  }, []);

  const handleSubcategorySelect = useCallback((subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    setSelectedTopic(null);
    setStep(3);
  }, []);

  const handleTopicSelect = useCallback((topicId: string) => {
    setSelectedTopic(topicId);
    setContributionData(prev => ({ ...prev, topicId }));
    setStep(4);
  }, []);

  const handleContributionChange = useCallback((field: keyof ContributionData, value: any) => {
    setContributionData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    handleContributionChange('videoFile', file);
    handleContributionChange('videoUrl', URL.createObjectURL(file));
    
    // Simulate upload progress
    setUploadProgress({
      status: 'uploading',
      percentage: 0,
      message: 'Preparing upload...'
    });

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadProgress({
          status: 'processing',
          percentage: 100,
          message: 'Processing video...'
        });
        
        setTimeout(() => {
          setUploadProgress({
            status: 'success',
            percentage: 100,
            message: 'Video uploaded successfully!'
          });
        }, 1500);
      } else {
        setUploadProgress(prev => ({
          ...prev,
          percentage: progress,
          message: `Uploading... ${Math.round(progress)}%`
        }));
      }
    }, 200);
  }, [handleContributionChange]);

  const handleSubmit = useCallback(async () => {
    if (!contributionData.title.trim() || !contributionData.videoUrl) {
      return;
    }

    setUploadProgress({
      status: 'uploading',
      percentage: 0,
      message: 'Submitting contribution...'
    });

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setUploadProgress({
      status: 'success',
      percentage: 100,
      message: 'Contribution submitted successfully!'
    });

    // Reset after success
    setTimeout(() => {
      setStep(1);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setSelectedTopic(null);
      setContributionData({
        topicId: '',
        title: '',
        description: '',
        tags: [],
        level: 'beginner',
        videoUrl: '',
        externalLinks: [],
        notes: ''
      });
      setUploadProgress({
        status: 'idle',
        percentage: 0,
        message: ''
      });
    }, 3000);
  }, [contributionData]);

  const currentCategory = useMemo(() => 
    categories.find(c => c.id === selectedCategory),
    [selectedCategory]
  );

  const currentSubcategory = useMemo(() => 
    subcategories.find(s => s.id === selectedSubcategory),
    [selectedSubcategory]
  );

  const currentTopic = useMemo(() => 
    topics.find(t => t.id === selectedTopic),
    [selectedTopic]
  );

  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] overflow-hidden">
      <AmbientBackground />
      
      <Navigation />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <ContributionProgress 
            step={step}
            category={currentCategory}
            subcategory={currentSubcategory}
            topic={currentTopic}
          />
          
          <div className="mt-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <Step1Categories 
                  categories={categories}
                  onSelect={handleCategorySelect}
                />
              )}
              
              {step === 2 && (
                <Step2Subcategories
                  category={currentCategory}
                  subcategories={filteredSubcategories}
                  onSelect={handleSubcategorySelect}
                  onBack={() => setStep(1)}
                />
              )}
              
              {step === 3 && (
                <Step3Topics
                  category={currentCategory}
                  subcategory={currentSubcategory}
                  topics={filteredTopics}
                  onSelect={handleTopicSelect}
                  onBack={() => setStep(2)}
                />
              )}
              
              {step === 4 && (
                <Step4Contribution
                  category={currentCategory}
                  subcategory={currentSubcategory}
                  topic={currentTopic}
                  existingVideos={filteredExistingVideos}
                  data={contributionData}
                  onChange={handleContributionChange}
                  onFileUpload={handleFileUpload}
                  uploadProgress={uploadProgress}
                  onSubmit={handleSubmit}
                  onBack={() => setStep(3)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================

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
  }, []);

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
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.3)]">
                <Upload className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                Contribute
              </span>
            </motion.div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-sm font-medium text-[#EDEDEF] border border-white/[0.06] hover:border-white/[0.1] transition-all"
            >
              My Contributions
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// PROGRESS COMPONENT
// ============================================================================

function ContributionProgress({ 
  step, 
  category, 
  subcategory, 
  topic 
}: { 
  step: number;
  category?: Category;
  subcategory?: Subcategory;
  topic?: Topic;
}) {
  const steps = [
    { number: 1, label: 'Category', data: category?.name },
    { number: 2, label: 'Subcategory', data: subcategory?.name },
    { number: 3, label: 'Topic', data: topic?.name },
    { number: 4, label: 'Contribute' },
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent mb-4">
          Share Your Knowledge
        </h1>
        <p className="text-lg text-[#8A8F98] max-w-2xl mx-auto">
          Contribute to our learning community by uploading educational content. 
          Help others learn and grow with your expertise.
        </p>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/[0.06] z-0" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-[#5E6AD2] to-emerald-500 z-10 transition-all duration-500"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center">
              <div className={`
                relative z-20 h-10 w-10 rounded-full flex items-center justify-center
                transition-all duration-300
                ${step >= s.number 
                  ? 'bg-gradient-to-b from-[#5E6AD2] to-indigo-600 shadow-[0_0_20px_rgba(94,106,210,0.4)]' 
                  : 'bg-white/[0.08] border border-white/[0.06]'
                }
              `}>
                {step > s.number ? (
                  <CheckCircle className="h-5 w-5 text-white" />
                ) : (
                  <span className={`text-sm font-semibold ${step >= s.number ? 'text-white' : 'text-[#8A8F98]'}`}>
                    {s.number}
                  </span>
                )}
              </div>
              
              <div className="mt-4 text-center">
                <div className={`text-sm font-medium ${step >= s.number ? 'text-[#EDEDEF]' : 'text-[#8A8F98]'}`}>
                  {s.label}
                </div>
                {s.data && (
                  <div className="text-xs text-[#5E6AD2] mt-1 font-medium">
                    {s.data}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STEP 1: CATEGORIES
// ============================================================================

function Step1Categories({ 
  categories, 
  onSelect 
}: { 
  categories: Category[];
  onSelect: (id: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'tech' | 'non-tech'>('all');

  const filteredCategories = useMemo(() => {
    let filtered = categories;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(cat => cat.type === filterType);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [categories, filterType, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-[#EDEDEF] mb-2">
          Choose a Category
        </h2>
        <p className="text-[#8A8F98]">
          Select the broad category for your contribution. This helps organize content for learners.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8A8F98]" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0F0F12] border border-white/[0.1] text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/30 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterType === 'all'
                ? 'bg-[#5E6AD2] text-white shadow-[0_0_20px_rgba(94,106,210,0.3)]'
                : 'bg-white/[0.05] text-[#8A8F98] border border-white/[0.06] hover:border-white/[0.1]'
            }`}
          >
            All Categories
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilterType('tech')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterType === 'tech'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-white/[0.05] text-[#8A8F98] border border-white/[0.06] hover:border-white/[0.1]'
            }`}
          >
            Technology
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilterType('non-tech')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterType === 'non-tech'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/[0.05] text-[#8A8F98] border border-white/[0.06] hover:border-white/[0.1]'
            }`}
          >
            Non-Technology
          </motion.button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(category.id)}
            className="group text-left"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 hover:border-white/[0.1] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <div className="text-[#5E6AD2]">
                    {category.icon}
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                  category.type === 'tech' 
                    ? 'bg-blue-500/10 text-blue-400' 
                    : 'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {category.type === 'tech' ? 'Tech' : 'Non-Tech'}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-[#EDEDEF] mb-2 group-hover:text-white transition-colors">
                {category.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#8A8F98]">
                  {category.count.toLocaleString()} courses
                </div>
                <ChevronRight className="h-4 w-4 text-[#8A8F98] group-hover:text-[#5E6AD2] transition-colors" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#5E6AD2]/20 to-indigo-500/10 border-2 border-[#5E6AD2]/30 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-[#5E6AD2]" />
          </div>
          <h3 className="text-xl font-semibold text-[#EDEDEF] mb-2">
            No categories found
          </h3>
          <p className="text-[#8A8F98]">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// STEP 2: SUBCATEGORIES
// ============================================================================

function Step2Subcategories({
  category,
  subcategories,
  onSelect,
  onBack
}: {
  category?: Category;
  subcategories: Subcategory[];
  onSelect: (id: string) => void;
  onBack: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubcategories = useMemo(() => {
    if (!searchQuery) return subcategories;
    return subcategories.filter(sub => 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [subcategories, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#8A8F98] hover:text-[#EDEDEF] transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Categories
        </motion.button>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${category?.color} flex items-center justify-center`}>
            <div className="text-[#5E6AD2]">
              {category?.icon}
            </div>
          </div>
          <div>
            <div className="text-sm text-[#8A8F98]">Category</div>
            <h2 className="text-2xl font-semibold text-[#EDEDEF]">{category?.name}</h2>
          </div>
        </div>
        
        <p className="text-[#8A8F98]">
          Select a specific subcategory within {category?.name}. This helps learners find specialized content.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8A8F98]" />
          <input
            type="text"
            placeholder="Search subcategories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0F0F12] border border-white/[0.1] text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/30 transition-all"
          />
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubcategories.map((subcategory) => (
          <motion.button
            key={subcategory.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(subcategory.id)}
            className="group text-left"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 hover:border-white/[0.1] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#EDEDEF] group-hover:text-white transition-colors">
                  {subcategory.name}
                </h3>
                <ChevronRight className="h-4 w-4 text-[#8A8F98] group-hover:text-[#5E6AD2] transition-colors" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[#8A8F98]">
                  <BookOpen className="h-4 w-4" />
                  {subcategory.count.toLocaleString()} mini-courses
                </div>
                <div className="flex items-center gap-2 text-sm text-[#8A8F98]">
                  <Video className="h-4 w-4" />
                  {Math.round(subcategory.count * 8.5).toLocaleString()} videos
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {filteredSubcategories.length === 0 && (
        <div className="text-center py-12">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#5E6AD2]/20 to-indigo-500/10 border-2 border-[#5E6AD2]/30 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-[#5E6AD2]" />
          </div>
          <h3 className="text-xl font-semibold text-[#EDEDEF] mb-2">
            No subcategories found
          </h3>
          <p className="text-[#8A8F98]">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// STEP 3: TOPICS
// ============================================================================

function Step3Topics({
  category,
  subcategory,
  topics,
  onSelect,
  onBack
}: {
  category?: Category;
  subcategory?: Subcategory;
  topics: Topic[];
  onSelect: (id: string) => void;
  onBack: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = useMemo(() => {
    if (!searchQuery) return topics;
    return topics.filter(topic => 
      topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [topics, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#8A8F98] hover:text-[#EDEDEF] transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Subcategories
        </motion.button>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${category?.color} flex items-center justify-center`}>
            <div className="text-[#5E6AD2]">
              {category?.icon}
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-[#8A8F98]" />
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#5E6AD2]" />
            <div>
              <div className="text-sm text-[#8A8F98]">Subcategory</div>
              <h3 className="text-lg font-semibold text-[#EDEDEF]">{subcategory?.name}</h3>
            </div>
          </div>
        </div>
        
        <p className="text-[#8A8F98]">
          Choose a specific topic within {subcategory?.name}. This is where you'll contribute your content.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8A8F98]" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0F0F12] border border-white/[0.1] text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/30 transition-all"
          />
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <motion.button
            key={topic.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(topic.id)}
            className="group text-left"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 hover:border-white/[0.1] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#EDEDEF] group-hover:text-white transition-colors">
                  {topic.name}
                </h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
                  topic.level === 'beginner' 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : topic.level === 'intermediate'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-purple-500/10 text-purple-400'
                }`}>
                  {topic.level}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[#8A8F98]">
                  <Video className="h-4 w-4" />
                  {topic.count.toLocaleString()} existing videos
                </div>
                <div className="flex items-center gap-2 text-sm text-[#8A8F98]">
                  <UsersIcon className="h-4 w-4" />
                  {(topic.count * 120).toLocaleString()} learners
                </div>
                <div className="flex items-center gap-2 text-sm text-[#8A8F98]">
                  <Target className="h-4 w-4" />
                  Average rating: 4.7/5
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[#8A8F98]">
                    Click to contribute
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#8A8F98] group-hover:text-[#5E6AD2] transition-colors" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#5E6AD2]/20 to-indigo-500/10 border-2 border-[#5E6AD2]/30 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-[#5E6AD2]" />
          </div>
          <h3 className="text-xl font-semibold text-[#EDEDEF] mb-2">
            No topics found
          </h3>
          <p className="text-[#8A8F98]">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// STEP 4: CONTRIBUTION FORM
// ============================================================================

function Step4Contribution({
  category,
  subcategory,
  topic,
  existingVideos,
  data,
  onChange,
  onFileUpload,
  uploadProgress,
  onSubmit,
  onBack
}: {
  category?: Category;
  subcategory?: Subcategory;
  topic?: Topic;
  existingVideos: ExistingVideo[];
  data: ContributionData;
  onChange: (field: keyof ContributionData, value: any) => void;
  onFileUpload: (file: File) => void;
  uploadProgress: UploadProgress;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tagInput, setTagInput] = useState('');
  const [linkInput, setLinkInput] = useState('');

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !data.tags.includes(tagInput.trim())) {
      onChange('tags', [...data.tags, tagInput.trim()]);
      setTagInput('');
    }
  }, [tagInput, data.tags, onChange]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    onChange('tags', data.tags.filter(tag => tag !== tagToRemove));
  }, [data.tags, onChange]);

  const handleAddLink = useCallback(() => {
    if (linkInput.trim() && data.externalLinks && !data.externalLinks.includes(linkInput.trim())) {
      onChange('externalLinks', [...(data.externalLinks || []), linkInput.trim()]);
      setLinkInput('');
    }
  }, [linkInput, data.externalLinks, onChange]);

  const handleRemoveLink = useCallback((linkToRemove: string) => {
    onChange('externalLinks', (data.externalLinks || []).filter(link => link !== linkToRemove));
  }, [data.externalLinks, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const isFormValid = data.title.trim() && 
                     data.tags.length > 0 && 
                     (data.videoUrl || uploadProgress.status === 'success');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#8A8F98] hover:text-[#EDEDEF] transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Topics
        </motion.button>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${category?.color} flex items-center justify-center`}>
            <div className="text-[#5E6AD2]">
              {category?.icon}
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-[#8A8F98]" />
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#5E6AD2]" />
            <span className="text-[#8A8F98]">{subcategory?.name}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-[#8A8F98]" />
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-[#5E6AD2]" />
            <h2 className="text-xl font-semibold text-[#EDEDEF]">{topic?.name}</h2>
          </div>
        </div>
        
        <p className="text-[#8A8F98]">
          Add your contribution to {topic?.name}. Fill in the details and upload your video.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Existing Videos */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contribution Form */}
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6">
            <h3 className="text-xl font-semibold text-[#EDEDEF] mb-6">
              Add Your Contribution
            </h3>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
                  Video Title *
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => onChange('title', e.target.value)}
                  placeholder="Enter a clear, descriptive title for your video"
                  className="w-full px-4 py-3 rounded-xl bg-[#0F0F12] border border-white/[0.1] text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/30 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={data.description}
                  onChange={(e) => onChange('description', e.target.value)}
                  placeholder="Add a detailed description of your video content..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#0F0F12] border border-white/[0.1] text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/30 transition-all resize-none"
                />
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
                  Difficulty Level *
                </label>
                <div className="flex flex-wrap gap-3">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <motion.button
                      key={level}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onChange('level', level)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        data.level === level
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

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
                  Tags *
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Add tags (e.g., React, Hooks, JavaScript)"
                    className="flex-1 px-4 py-2 rounded-xl bg-[#0F0F12] border border-white/[0.1] text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/30 transition-all"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddTag}
                    className="px-4 py-2 rounded-xl bg-white/[0.05] text-[#EDEDEF] border border-white/[0.06] hover:border-white/[0.1] transition-all"
                  >
                    Add
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] text-sm text-[#EDEDEF] border border-white/[0.06]"
                    >
                      <Hash className="h-3 w-3" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-[#8A8F98] hover:text-[#EDEDEF]"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
                  Video Upload *
                </label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {!data.videoUrl ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/[0.1] rounded-2xl p-8 text-center cursor-pointer hover:border-[#5E6AD2]/30 transition-all group"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#5E6AD2]/20 to-indigo-500/10 border-2 border-[#5E6AD2]/30 flex items-center justify-center mx-auto mb-4 group-hover:border-[#5E6AD2]/50 transition-colors">
                      <Upload className="h-8 w-8 text-[#5E6AD2]" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#EDEDEF] mb-2">
                      Drop video file or click to upload
                    </h4>
                    <p className="text-sm text-[#8A8F98] mb-4">
                      Supports MP4, WebM, MOV up to 2GB
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] text-sm text-[#EDEDEF] border border-white/[0.06]">
                      <FileVideo className="h-4 w-4" />
                      Choose File
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Upload Progress */}
                    {uploadProgress.status !== 'idle' && (
                      <div className="rounded-xl border border-white/[0.06] bg-[#0F0F12] p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#EDEDEF]">
                            {uploadProgress.message}
                          </span>
                          <span className="text-sm text-[#8A8F98]">
                            {Math.round(uploadProgress.percentage)}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              uploadProgress.status === 'success' 
                                ? 'bg-emerald-500' 
                                : uploadProgress.status === 'error'
                                ? 'bg-rose-500'
                                : 'bg-gradient-to-r from-[#5E6AD2] to-indigo-500'
                            }`}
                            style={{ width: `${uploadProgress.percentage}%` }}
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          {uploadProgress.status === 'uploading' && (
                            <Loader2 className="h-4 w-4 text-[#5E6AD2] animate-spin" />
                          )}
                          {uploadProgress.status === 'success' && (
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                          )}
                          {uploadProgress.status === 'error' && (
                            <XCircle className="h-4 w-4 text-rose-400" />
                          )}
                          <span className={`text-xs ${
                            uploadProgress.status === 'success' 
                              ? 'text-emerald-400' 
                              : uploadProgress.status === 'error'
                              ? 'text-rose-400'
                              : 'text-[#8A8F98]'
                          }`}>
                            {uploadProgress.status === 'success' 
                              ? 'Ready to submit' 
                              : uploadProgress.status === 'error'
                              ? 'Upload failed'
                              : 'Processing...'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Video Preview */}
                    <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#5E6AD2]/10 to-indigo-500/5 border border-white/[0.06]">
                      <div className="aspect-video flex items-center justify-center">
                        {uploadProgress.status === 'success' ? (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="h-12 w-12 text-white/50" />
                            </div>
                            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-black/60 backdrop-blur text-xs font-medium text-white">
                              {data.videoFile ? (data.videoFile.size / (1024 * 1024)).toFixed(1) + 'MB' : 'Video'}
                            </div>
                          </>
                        ) : (
                          <div className="text-center p-8">
                            <Loader2 className="h-8 w-8 text-[#5E6AD2] animate-spin mx-auto mb-3" />
                            <p className="text-sm text-[#8A8F98]">Processing video...</p>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <button
                          type="button"
                          onClick={() => {
                            onChange('videoUrl', '');
                            onChange('videoFile', undefined);
                          }}
                          className="h-8 w-8 rounded-lg bg-black/60 backdrop-blur flex items-center justify-center border border-white/20 text-white hover:bg-black/80 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* External Links */}
              <div>
                <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
                  Additional Resources (Optional)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLink())}
                    placeholder="Add GitHub repo, docs, or related links"
                    className="flex-1 px-4 py-2 rounded-xl bg-[#0F0F12] border border-white/[0.1] text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/30 transition-all"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddLink}
                    className="px-4 py-2 rounded-xl bg-white/[0.05] text-[#EDEDEF] border border-white/[0.06] hover:border-white/[0.1] transition-all"
                  >
                    Add
                  </motion.button>
                </div>
                <div className="space-y-2">
                  {data.externalLinks?.map((link) => (
                    <div
                      key={link}
                      className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.06]"
                    >
                      <div className="flex items-center gap-3">
                        <Link className="h-4 w-4 text-[#5E6AD2]" />
                        <span className="text-sm text-[#EDEDEF] truncate">{link}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(link)}
                        className="text-[#8A8F98] hover:text-[#EDEDEF]"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-[#EDEDEF] mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={data.notes}
                  onChange={(e) => onChange('notes', e.target.value)}
                  placeholder="Any additional information about your contribution..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#0F0F12] border border-white/[0.1] text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/30 transition-all resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#8A8F98]">
                  {isFormValid ? (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="h-4 w-4" />
                      Ready to submit
                    </div>
                  ) : (
                    'Fill all required fields to submit'
                  )}
                </div>
                <motion.button
                  whileHover={isFormValid ? { scale: 1.05 } : {}}
                  whileTap={isFormValid ? { scale: 0.98 } : {}}
                  onClick={isFormValid ? onSubmit : undefined}
                  disabled={!isFormValid || uploadProgress.status === 'uploading'}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                    isFormValid && uploadProgress.status !== 'uploading'
                      ? 'bg-gradient-to-b from-emerald-500 to-green-600 text-white shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]'
                      : 'bg-white/[0.05] text-[#8A8F98] cursor-not-allowed'
                  }`}
                >
                  {uploadProgress.status === 'uploading' ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </div>
                  ) : uploadProgress.status === 'success' ? (
                    'Submitted Successfully!'
                  ) : (
                    'Submit Contribution'
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Existing Videos */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6">
            <h3 className="text-lg font-semibold text-[#EDEDEF] mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-[#5E6AD2]" />
              Existing Videos on {topic?.name}
            </h3>
            <p className="text-sm text-[#8A8F98] mb-6">
              Review existing content to ensure your contribution adds unique value.
            </p>

            <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin pr-2">
              {existingVideos.map((video) => (
                <div
                  key={video.id}
                  className="rounded-xl border border-white/[0.06] bg-[#0F0F12] p-4 hover:border-white/[0.1] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#5E6AD2]/20 to-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <Video className="h-5 w-5 text-[#5E6AD2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#EDEDEF] truncate mb-1">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-[#8A8F98] mb-2">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-400" />
                          {video.rating}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {(video.views / 1000).toFixed(1)}k
                        </span>
                        <span>•</span>
                        <span className={`px-1.5 py-0.5 rounded text-xs ${
                          video.status === 'approved' 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : video.status === 'featured'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-blue-500/10 text-blue-400'
                        }`}>
                          {video.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {video.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-white/[0.05] text-xs text-[#8A8F98]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {existingVideos.length === 0 && (
              <div className="text-center py-8">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#5E6AD2]/20 to-indigo-500/10 border border-[#5E6AD2]/30 flex items-center justify-center mx-auto mb-3">
                  <Plus className="h-6 w-6 text-[#5E6AD2]" />
                </div>
                <p className="text-sm text-[#8A8F98]">
                  Be the first to contribute to this topic!
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <div className="text-sm text-[#8A8F98] space-y-2">
                <div className="flex items-center justify-between">
                  <span>Total Videos</span>
                  <span className="text-[#EDEDEF] font-medium">{existingVideos.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Average Rating</span>
                  <span className="text-amber-400 font-medium">4.8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Learners</span>
                  <span className="text-[#EDEDEF] font-medium">
                    {(existingVideos.reduce((sum, v) => sum + v.views, 0) / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6">
            <h4 className="text-sm font-semibold text-[#EDEDEF] mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-400" />
              Tips for Great Contributions
            </h4>
            <ul className="space-y-2 text-sm text-[#8A8F98]">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#5E6AD2] mt-1.5 flex-shrink-0" />
                Ensure your content is original and adds unique value
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#5E6AD2] mt-1.5 flex-shrink-0" />
                Use clear audio and good video quality
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#5E6AD2] mt-1.5 flex-shrink-0" />
                Add timestamps in description for long videos
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#5E6AD2] mt-1.5 flex-shrink-0" />
                Include code samples and practical examples
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#5E6AD2] mt-1.5 flex-shrink-0" />
                Check existing videos to avoid duplication
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}