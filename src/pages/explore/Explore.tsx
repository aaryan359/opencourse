import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronRight, Loader2, BookOpen, Play, Clock, Users, TrendingUp, Sparkles, Grid, List, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { fieldsApi, coursesApi, videosApi2 } from "../../api/courses.api";
import Container from "../../components/ui/Container";

interface Field {
  _id: string;
  name: string;
  slug: string;
  description: string;
}

interface Course {
  _id: string;
  title: string;
  slug: string;
  description: string;
  field: string | Field;
  level: "beginner" | "intermediate" | "advanced";
  thumbnail?: string;
}

interface Video {
  _id: string;
  title: string;
  description?: string;
  url: string;
  status: string;
  uploadedBy?: { username?: string } | string;
}

// Mouse tracking card component for subtle interaction
function MouseTrackCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(94,106,210,0.12) 0%, transparent 60%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />
      {children}
    </div>
  );
}

export default function ExploreCoursesPage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"courses" | "trending">("courses");

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fieldsRes, coursesRes] = await Promise.all([
          fieldsApi.listFields(),
          coursesApi.listCourses({}),
        ]);
        setFields(fieldsRes.data?.data || []);
        setCourses(coursesRes.data?.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter courses based on search, field, and level
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const fieldId = typeof course.field === "object" ? course.field._id : course.field;
      const matchesField = !selectedField || fieldId === selectedField;

      const matchesLevel = !selectedLevel || course.level === selectedLevel;

      return matchesSearch && matchesField && matchesLevel;
    });
  }, [courses, searchQuery, selectedField, selectedLevel]);

  const levelColors: Record<string, string> = {
    beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    intermediate: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    advanced: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  const clearFilters = () => {
    setSelectedField(null);
    setSelectedLevel(null);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedField || selectedLevel || searchQuery;

  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />
      <div className="fixed inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      
      {/* Animated gradient blobs */}
      <motion.div
        className="fixed -top-[40%] -left-[20%] w-[800px] h-[600px] rounded-full bg-gradient-to-br from-[#5E6AD2]/20 via-indigo-400/10 to-transparent blur-[120px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed -bottom-[30%] -right-[10%] w-[600px] h-[400px] rounded-full bg-gradient-to-tl from-purple-500/15 via-pink-500/10 to-transparent blur-[100px]"
        animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <Container className="relative z-10 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-6 mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-[#5E6AD2]" />
            <span className="text-xs font-medium text-[#8A8F98] tracking-wide">
              {courses.length} Courses • {fields.length} Fields
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
            <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
              Explore & Learn
            </span>
          </h1>
          <p className="text-lg text-[#8A8F98] max-w-2xl mx-auto leading-relaxed">
            Discover expert-crafted courses across multiple domains. Learn at your own pace with community-driven content.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8A8F98] group-focus-within:text-[#5E6AD2] transition-colors" />
            <input
              type="text"
              placeholder="Search courses by name or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-[#EDEDEF] placeholder:text-[#8A8F98] focus:outline-none focus:border-[#5E6AD2]/50 focus:ring-2 focus:ring-[#5E6AD2]/20 focus:bg-white/[0.05] transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8F98] hover:text-white transition-colors text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Tabs and View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            {[
              { id: "courses" as const, label: "All Courses", icon: BookOpen },
              { id: "trending" as const, label: "Trending", icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#5E6AD2] text-white shadow-lg"
                    : "text-[#8A8F98] hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8A8F98] mr-2">View:</span>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid" ? "bg-[#5E6AD2] text-white" : "text-[#8A8F98] hover:text-white"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list" ? "bg-[#5E6AD2] text-white" : "text-[#8A8F98] hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Fields Filter */}
            {fields.length > 0 && (
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[#8A8F98] mb-3 flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Fields
                </h3>
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedField(null)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedField === null
                        ? "bg-[#5E6AD2] text-white shadow-lg shadow-[#5E6AD2]/25"
                        : "bg-white/[0.03] text-[#EDEDEF] hover:bg-white/[0.06] border border-white/[0.06]"
                    }`}
                  >
                    All Fields
                  </motion.button>
                  {fields.map((field, idx) => (
                    <motion.button
                      key={field._id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      onClick={() => setSelectedField(selectedField === field._id ? null : field._id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedField === field._id
                          ? "bg-[#5E6AD2] text-white shadow-lg shadow-[#5E6AD2]/25"
                          : "bg-white/[0.03] text-[#EDEDEF] hover:bg-white/[0.06] border border-white/[0.06]"
                      }`}
                    >
                      {field.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Level Filter */}
            <div className="lg:w-auto">
              <h3 className="text-sm font-medium text-[#8A8F98] mb-3">Level</h3>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedLevel(null)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedLevel === null
                      ? "bg-[#5E6AD2] text-white shadow-lg shadow-[#5E6AD2]/25"
                      : "bg-white/[0.03] text-[#EDEDEF] hover:bg-white/[0.06] border border-white/[0.06]"
                  }`}
                >
                  All
                </motion.button>
                {["beginner", "intermediate", "advanced"].map((level, idx) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${
                      selectedLevel === level
                        ? "bg-[#5E6AD2] text-white shadow-lg shadow-[#5E6AD2]/25"
                        : "bg-white/[0.03] text-[#EDEDEF] hover:bg-white/[0.06] border border-white/[0.06]"
                    }`}
                  >
                    {level}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between"
            >
              <span className="text-sm text-[#8A8F98]">
                Showing {filteredCourses.length} of {courses.length} courses
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-[#5E6AD2] hover:text-[#6872D9] font-medium transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Loader2 className="h-10 w-10 text-[#5E6AD2] animate-spin" />
                <div className="absolute inset-0 h-10 w-10 rounded-full bg-[#5E6AD2]/20 blur-xl animate-pulse" />
              </div>
              <p className="text-[#8A8F98] text-sm">Loading courses...</p>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-[#8A8F98]/50" />
            </div>
            <h3 className="text-xl font-semibold text-[#EDEDEF] mb-2">
              No courses found
            </h3>
            <p className="text-[#8A8F98] mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-xl bg-[#5E6AD2] text-white font-medium hover:bg-[#6872D9] transition-all shadow-lg shadow-[#5E6AD2]/25"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={viewMode === "grid" 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, idx) => {
                const fieldObj = typeof course.field === "object" ? course.field : fields.find(f => f._id === course.field);
                const fieldSlug = fieldObj?.slug || "";

                return viewMode === "grid" ? (
                  <CourseCard 
                    key={course._id} 
                    course={course} 
                    field={fieldObj} 
                    fieldSlug={fieldSlug}
                    levelColors={levelColors}
                    index={idx}
                  />
                ) : (
                  <CourseListItem
                    key={course._id}
                    course={course}
                    field={fieldObj}
                    fieldSlug={fieldSlug}
                    levelColors={levelColors}
                    index={idx}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Quick Stats Footer */}
        {!loading && filteredCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: BookOpen, label: "Total Courses", value: courses.length },
              { icon: Users, label: "Active Learners", value: "5K+" },
              { icon: Video, label: "Video Hours", value: "200+" },
              { icon: TrendingUp, label: "Completion Rate", value: "87%" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
              >
                <stat.icon className="w-5 h-5 text-[#5E6AD2] mx-auto mb-2" />
                <div className="text-xl font-semibold text-white">{stat.value}</div>
                <div className="text-xs text-[#8A8F98]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </Container>
    </div>
  );
}

// Course Card Component - Grid View
function CourseCard({ 
  course, 
  field, 
  fieldSlug, 
  levelColors, 
  index 
}: { 
  course: Course; 
  field?: Field; 
  fieldSlug: string; 
  levelColors: Record<string, string>;
  index: number;
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      <Link to={`/courses/${fieldSlug}/${course.slug}`} className="block h-full">
        <div
          ref={cardRef}
          className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-white/[0.01] transition-all duration-300 hover:-translate-y-2 hover:border-white/[0.12]"
          style={{
            boxShadow: isHovering 
              ? '0 0 0 1px rgba(255,255,255,0.1), 0 20px 50px rgba(0,0,0,0.5), 0 0 60px rgba(94,106,210,0.15)'
              : '0 0 0 1px rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.3)',
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Mouse tracking spotlight */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(94,106,210,0.15) 0%, transparent 50%)`,
              opacity: isHovering ? 1 : 0,
            }}
          />

          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Thumbnail placeholder */}
          <div className="relative h-40 bg-gradient-to-br from-[#5E6AD2]/20 via-purple-500/10 to-transparent overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Play className="w-6 h-6 text-white fill-white/80 ml-1" />
              </motion.div>
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-5 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-[#EDEDEF] group-hover:text-white transition-colors line-clamp-2 leading-tight">
                  {course.title}
                </h3>
                <p className="text-sm text-[#8A8F98] mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2]" />
                  {field?.name || "Unknown Field"}
                </p>
              </div>
              <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-lg border capitalize font-medium ${levelColors[course.level]}`}>
                {course.level}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-[#8A8F98] line-clamp-2 leading-relaxed">
              {course.description}
            </p>

            {/* Footer */}
            <div className="pt-4 flex items-center justify-between border-t border-white/[0.06]">
              <div className="flex items-center gap-3 text-xs text-[#8A8F98]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Self-paced
                </span>
              </div>
              <span className="text-xs text-[#5E6AD2] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Start Learning
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Course List Item Component - List View
function CourseListItem({
  course,
  field,
  fieldSlug,
  levelColors,
  index,
}: {
  course: Course;
  field?: Field;
  fieldSlug: string;
  levelColors: Record<string, string>;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      layout
    >
      <Link to={`/courses/${fieldSlug}/${course.slug}`} className="block">
        <div className="group flex gap-5 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-200">
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-32 h-24 rounded-lg bg-gradient-to-br from-[#5E6AD2]/20 to-purple-500/10 flex items-center justify-center overflow-hidden">
            <Play className="w-8 h-8 text-white/60 fill-white/40" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-[#EDEDEF] group-hover:text-white transition-colors line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-sm text-[#8A8F98] mt-1">{field?.name}</p>
              </div>
              <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-lg border capitalize font-medium ${levelColors[course.level]}`}>
                {course.level}
              </span>
            </div>
            <p className="text-sm text-[#8A8F98] mt-2 line-clamp-1">{course.description}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-[#8A8F98]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Self-paced
              </span>
              <span className="text-[#5E6AD2] font-medium flex items-center gap-1">
                View Course <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
