import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Search, Filter, ChevronDown, Play, Loader2, BookOpen } from "lucide-react";
import { coursesApi, topicsApi, videosApi2 } from "../../api/courses.api";

interface ApiVideo {
_id: string;
title: string;
description?: string;
url: string;
status: string;
uploadedBy?: { username?: string } | string;
}

export default function CourseLearnPage() {
const { fieldSlug, courseSlug } = useParams<{ fieldSlug: string; courseSlug: string }>();
const [course, setCourse] = useState<any>(null);
const [topics, setTopics] = useState<any[]>([]);
const [videos, setVideos] = useState<ApiVideo[]>([]);
const [loadingCourse, setLoadingCourse] = useState(true);
const [loadingVideos, setLoadingVideos] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(true);
const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
const [searchQuery, setSearchQuery] = useState("");
const [sortBy, setSortBy] = useState<"title" | "newest">("newest");
const [showSortMenu, setShowSortMenu] = useState(false);

useEffect(() => {
if (!courseSlug) return;
setLoadingCourse(true);
coursesApi.getCourseBySlug(courseSlug)
.then((res) => {
const c = res.data?.data;
if (!c) return;
setCourse(c);
return topicsApi.listTopicsByCourse(c._id);
})
.then((topicsRes) => {
const t: any[] = topicsRes?.data?.data ?? [];
setTopics(t);
if (t.length > 0) setSelectedTopicId(t[0]._id);
})
.finally(() => setLoadingCourse(false));
}, [courseSlug]);

useEffect(() => {
if (!selectedTopicId) return;
setLoadingVideos(true);
videosApi2.listByTopic(selectedTopicId)
.then((res) => setVideos(res.data?.data ?? []))
.catch(() => setVideos([]))
.finally(() => setLoadingVideos(false));
}, [selectedTopicId]);

const filteredVideos = useMemo(() => {
let v = videos.filter((vid) => vid.status === "approved");
if (searchQuery) {
const q = searchQuery.toLowerCase();
v = v.filter((vid) => vid.title.toLowerCase().includes(q) || (vid.description ?? "").toLowerCase().includes(q));
}
if (sortBy === "title") v = [...v].sort((a, b) => a.title.localeCompare(b.title));
return v;
}, [videos, searchQuery, sortBy]);

const selectedTopic = topics.find((t) => t._id === selectedTopicId);

if (loadingCourse) {
return (
<div className="min-h-screen bg-[#050506] flex items-center justify-center">
<Loader2 className="w-8 h-8 animate-spin text-[#5E6AD2]" />
</div>
);
}

return (
<div className="flex h-screen bg-[#050506] text-[#EDEDEF]">
{/* Sidebar */}
<aside
className={`${
sidebarOpen ? "w-72" : "w-16"
} transition-all duration-300 ease-out border-r border-white/[0.06] bg-[#0a0a0c]/80 backdrop-blur-xl flex flex-col overflow-hidden flex-shrink-0`}>
<div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
{sidebarOpen && (
<Link
to={`/courses/${fieldSlug}/${courseSlug}`}
className="text-[#8A8F98] hover:text-white transition-colors text-sm flex items-center gap-2 group">
<ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
Back
</Link>
)}
<button
onClick={() => setSidebarOpen(!sidebarOpen)}
className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-[#8A8F98] hover:text-white ml-auto">
<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
</svg>
</button>
</div>

{sidebarOpen && (
<div className="p-4 border-b border-white/[0.06]">
<h2 className="font-semibold text-base mb-1 line-clamp-1">{course?.title}</h2>
<p className="text-xs text-[#8A8F98]">{topics.length} topic{topics.length !== 1 ? "s" : ""}</p>
</div>
)}

<div className="flex-1 overflow-y-auto p-2">
{sidebarOpen ? (
<div className="space-y-1">
{topics.map((topic, idx) => (
<button
key={topic._id}
onClick={() => setSelectedTopicId(topic._id)}
className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
selectedTopicId === topic._id
? "bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 text-white"
: "hover:bg-white/[0.05] text-[#8A8F98] hover:text-white border border-transparent"
}`}>
<div className="flex items-center gap-3">
<span
className={`w-6 h-6 rounded flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
selectedTopicId === topic._id
? "bg-[#5E6AD2] text-white"
: "bg-white/[0.08] text-[#8A8F98]"
}`}>
{idx + 1}
</span>
<span className="font-medium text-sm line-clamp-1">{topic.title}</span>
</div>
</button>
))}
</div>
) : (
<div className="space-y-2">
{topics.map((topic, idx) => (
<button
key={topic._id}
onClick={() => setSelectedTopicId(topic._id)}
className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto transition-all ${
selectedTopicId === topic._id
? "bg-[#5E6AD2] text-white shadow-lg"
: "bg-white/[0.05] text-[#8A8F98] hover:bg-white/[0.08]"
}`}>
<span className="font-semibold text-sm">{idx + 1}</span>
</button>
))}
</div>
)}
</div>
</aside>

{/* Main Content */}
<main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#050506] to-[#0a0a0c]">
<div className="p-8">
<div className="mb-8">
<h1 className="text-3xl font-semibold mb-1">{selectedTopic?.title ?? "Select a topic"}</h1>
{!loadingVideos && (
<p className="text-[#8A8F98] text-sm">
{filteredVideos.length} approved video{filteredVideos.length !== 1 ? "s" : ""}
</p>
)}
</div>

<div className="flex flex-col sm:flex-row gap-4 mb-8">
<div className="flex-1 relative">
<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8F98]" />
<input
type="text"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
placeholder="Search videos..."
className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0F0F12] border border-white/10 text-[#EDEDEF] placeholder:text-[#8A8F98] focus:border-[#5E6AD2] focus:outline-none focus:ring-2 focus:ring-[#5E6AD2]/50 transition-all"
/>
</div>
<div className="relative">
<button
onClick={() => setShowSortMenu(!showSortMenu)}
className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0F0F12] border border-white/10 hover:border-white/20 transition-all text-sm whitespace-nowrap text-[#8A8F98]">
<Filter className="w-4 h-4" />
Sort: {sortBy === "newest" ? "Newest" : "A-Z"}
<ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? "rotate-180" : ""}`} />
</button>
{showSortMenu && (
<div className="absolute right-0 mt-2 w-40 rounded-xl bg-[#0F0F12] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden z-20">
{[
{ value: "newest" as const, label: "Newest first" },
{ value: "title" as const, label: "A - Z" },
].map((opt) => (
<button
key={opt.value}
onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
className={`w-full flex items-center px-4 py-3 text-sm transition-colors ${
sortBy === opt.value ? "bg-[#5E6AD2]/20 text-white" : "text-[#8A8F98] hover:bg-white/[0.05] hover:text-white"
}`}>
{opt.label}
</button>
))}
</div>
)}
</div>
</div>

{loadingVideos ? (
<div className="flex justify-center py-20">
<Loader2 className="w-6 h-6 animate-spin text-[#5E6AD2]" />
</div>
) : filteredVideos.length === 0 ? (
<div className="text-center py-20">
<BookOpen className="w-16 h-16 text-[#8A8F98]/30 mx-auto mb-4" />
<p className="text-[#8A8F98] text-lg">No approved videos in this topic yet.</p>
<p className="text-[#8A8F98]/60 text-sm mt-2">
Be the first to{" "}
<Link to="/contribute/new" className="text-[#5E6AD2] underline">contribute a video</Link>!
</p>
</div>
) : (
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
{filteredVideos.map((video, idx) => (
<VideoCard key={video._id} video={video} delay={idx * 40} />
))}
</div>
)}
</div>
</main>
</div>
);
}

function VideoCard({ video, delay }: { video: ApiVideo; delay: number }) {
const [hovered, setHovered] = useState(false);
const authorName =
typeof video.uploadedBy === "object"
? (video.uploadedBy as any)?.username ?? "Community"
: "Community";

return (
<div
onMouseEnter={() => setHovered(true)}
onMouseLeave={() => setHovered(false)}
style={{ animationDelay: `${delay}ms` }}
className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-white/[0.12] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5),0_0_60px_rgba(94,106,210,0.15)]"
onClick={() => video.url && window.open(video.url, "_blank", "noopener,noreferrer")}>
<div className="relative aspect-video bg-gradient-to-br from-[#5E6AD2]/20 to-purple-600/10 overflow-hidden flex items-center justify-center">
<div
className={`w-16 h-16 rounded-full bg-[#5E6AD2] flex items-center justify-center shadow-[0_0_40px_rgba(94,106,210,0.6)] transition-transform duration-200 ${
hovered ? "scale-110" : "scale-90 opacity-70"
}`}>
<Play className="w-8 h-8 text-white fill-white ml-1" />
</div>
</div>

<div className="p-5">
<h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-white transition-colors">
{video.title}
</h3>
{video.description && (
<p className="text-sm text-[#8A8F98] mb-4 line-clamp-2">{video.description}</p>
)}
<div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
<span className="text-xs text-[#8A8F98]">by {authorName}</span>
<span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
Approved
</span>
</div>
</div>
</div>
);
}
