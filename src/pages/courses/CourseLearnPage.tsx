import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Search, Filter, ChevronDown, Star, ThumbsUp, Eye, Play } from "lucide-react";

const mockVideos = [
	{
		id: "1",
		title: "JavaScript Hoisting Explained Simply",
		description: "Understand how hoisting works in JavaScript with clear examples.",
		thumbnail: "https://picsum.photos/400/225",
		duration: "8:24",
		rating: 4.6,
		views: 12000,
		upvotes: 320,
		tags: ["javascript", "hoisting"],
		author: "OpenCourse",
		topic: "hoisting",
	},
	{
		id: "2",
		title: "Closures in JavaScript (Visual Guide)",
		description: "A visual and intuitive explanation of closures in JavaScript.",
		thumbnail: "https://picsum.photos/401/225",
		duration: "12:10",
		rating: 4.8,
		views: 9800,
		upvotes: 410,
		tags: ["javascript", "closures"],
		author: "Community",
		topic: "closures",
	},
	{
		id: "3",
		title: "Event Loop Explained",
		description: "Deep dive into JavaScript event loop, call stack, and queue.",
		thumbnail: "https://picsum.photos/402/225",
		duration: "10:45",
		rating: 4.7,
		views: 15000,
		upvotes: 500,
		tags: ["javascript", "event-loop"],
		author: "OpenCourse",
		topic: "async",
	},
	{
		id: "4",
		title: "Promises vs Async/Await",
		description: "Learn the difference between Promises and async/await.",
		thumbnail: "https://picsum.photos/403/225",
		duration: "9:30",
		rating: 4.5,
		views: 11000,
		upvotes: 300,
		tags: ["javascript", "async"],
		author: "Community",
		topic: "async",
	},
	{
		id: "6",
		title: "React Hooks Crash Course",
		description: "useState, useEffect, and custom hooks explained.",
		thumbnail: "https://picsum.photos/405/225",
		duration: "16:20",
		rating: 4.8,
		views: 18000,
		upvotes: 620,
		tags: ["react", "hooks"],
		author: "OpenCourse",
		topic: "hooks",
	},
	{
		id: "7",
		title: "useEffect in Depth",
		description: "Master side effects in React using useEffect.",
		thumbnail: "https://picsum.photos/406/225",
		duration: "11:50",
		rating: 4.6,
		views: 9000,
		upvotes: 260,
		tags: ["react", "useEffect"],
		author: "Community",
		topic: "hooks",
	},
	{
		id: "8",
		title: "React State Management Explained",
		description: "State, props, and lifting state up.",
		thumbnail: "https://picsum.photos/407/225",
		duration: "13:05",
		rating: 4.7,
		views: 12500,
		upvotes: 390,
		tags: ["react", "state"],
		author: "OpenCourse",
		topic: "state",
	},
];

const miniTopicsByCourse = {
	javascript: [
		{ id: "hoisting", title: "Hoisting & Scope" },
		{ id: "closures", title: "Closures Deep Dive" },
		{ id: "async", title: "Async Programming" },
	],
	react: [
		{ id: "hooks", title: "React Hooks" },
		{ id: "state", title: "State Management" },
	],
};

export default function CourseLearnPage() {
	const { track, domain, course } = useParams();
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [selectedTopic, setSelectedTopic] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("rating");
	const [showSortMenu, setShowSortMenu] = useState(false);

	const miniTopics = miniTopicsByCourse[course] || [];

	// Initialize with first topic if none selected
	React.useEffect(() => {
		if (!selectedTopic && miniTopics.length > 0) {
			setSelectedTopic(miniTopics[0].id);
		}
	}, [selectedTopic, miniTopics]);

	const selectedTopicData = miniTopics.find((t) => t.id === selectedTopic);

	const filteredAndSortedVideos = useMemo(() => {
		let videos = mockVideos.filter((v) => v.topic === selectedTopic);

		videos = videos.filter(
			(v) =>
				v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				v.description.toLowerCase().includes(searchQuery.toLowerCase())
		);

		videos.sort((a, b) => {
			if (sortBy === "rating") return b.rating - a.rating;
			if (sortBy === "upvotes") return b.upvotes - a.upvotes;
			if (sortBy === "views") return b.views - a.views;
			return 0;
		});

		return videos;
	}, [selectedTopic, searchQuery, sortBy]);

	return (
		<div className='flex h-screen bg-[#050506] text-[#EDEDEF]'>
			{/* Sidebar */}
			<aside
				className={`${
					sidebarOpen ? "w-80" : "w-16"
				} transition-all duration-300 ease-out border-r border-white/[0.06] bg-[#0a0a0c]/80 backdrop-blur-xl flex flex-col overflow-hidden`}>
				{/* Sidebar Header */}
				<div className='p-4 border-b border-white/[0.06] flex items-center justify-between'>
					{sidebarOpen && (
						<Link
							to={`/courses/${track}/${domain}/${course}`}
							className='text-[#8A8F98] hover:text-white transition-colors text-sm flex items-center gap-2 group'>
							<ArrowRight className='w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform' />
							Back
						</Link>
					)}
					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className='p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-[#8A8F98] hover:text-white ml-auto'>
						<svg
							className='w-5 h-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 6h16M4 12h16M4 18h16'
							/>
						</svg>
					</button>
				</div>

				{/* Course Title */}
				{sidebarOpen && (
					<div className='p-4 border-b border-white/[0.06]'>
						<h2 className='font-semibold text-lg mb-1'>{courseDetails[course]?.title}</h2>
						<p className='text-xs text-[#8A8F98]'>{miniTopics.length} modules</p>
					</div>
				)}

				{/* Topics List */}
				<div className='flex-1 overflow-y-auto p-2'>
					{sidebarOpen ? (
						<div className='space-y-1'>
							{miniTopics.map((topic, idx) => (
								<button
									key={topic.id}
									onClick={() => setSelectedTopic(topic.id)}
									className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
										selectedTopic === topic.id
											? "bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 text-white"
											: "hover:bg-white/[0.05] text-[#8A8F98] hover:text-white border border-transparent"
									}`}>
									<div className='flex items-center gap-3 mb-1'>
										<span
											className={`w-6 h-6 rounded flex items-center justify-center text-xs font-semibold ${
												selectedTopic === topic.id
													? "bg-[#5E6AD2] text-white"
													: "bg-white/[0.08] text-[#8A8F98]"
											}`}>
											{idx + 1}
										</span>
										<span className='font-medium text-sm'>{topic.title}</span>
									</div>
									<p className='text-xs text-[#8A8F98] ml-9'>
										{mockVideos.filter((v) => v.topic === topic.id).length} videos
									</p>
								</button>
							))}
						</div>
					) : (
						<div className='space-y-2'>
							{miniTopics.map((topic, idx) => (
								<button
									key={topic.id}
									onClick={() => setSelectedTopic(topic.id)}
									className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto transition-all ${
										selectedTopic === topic.id
											? "bg-[#5E6AD2] text-white shadow-lg"
											: "bg-white/[0.05] text-[#8A8F98] hover:bg-white/[0.08]"
									}`}>
									<span className='font-semibold text-sm'>{idx + 1}</span>
								</button>
							))}
						</div>
					)}
				</div>
			</aside>

			{/* Main Content */}
			<main className='flex-1 overflow-y-auto bg-gradient-to-b from-[#050506] to-[#0a0a0c]'>
				<div className='p-8'>
					{/* Topic Header */}
					<div className='mb-8'>
						<h1 className='text-4xl font-semibold mb-2'>{selectedTopicData?.title}</h1>
						<p className='text-[#8A8F98]'>
							{filteredAndSortedVideos.length} video{filteredAndSortedVideos.length !== 1 ? "s" : ""}{" "}
							available
						</p>
					</div>

					{/* Search and Filter Bar */}
					<div className='flex flex-col sm:flex-row gap-4 mb-8'>
						{/* Search */}
						<div className='flex-1 relative'>
							<Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8F98]' />
							<input
								type='text'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder='Search videos...'
								className='w-full pl-12 pr-4 py-3 rounded-xl bg-[#0F0F12] border border-white/10 text-[#EDEDEF] placeholder:text-[#8A8F98] focus:border-[#5E6AD2] focus:outline-none focus:ring-2 focus:ring-[#5E6AD2]/50 transition-all duration-200'
							/>
						</div>

						{/* Sort Dropdown */}
						<div className='relative'>
							<button
								onClick={() => setShowSortMenu(!showSortMenu)}
								className='flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0F0F12] border border-white/10 hover:border-white/20 transition-all text-sm whitespace-nowrap'>
								<Filter className='w-4 h-4' />
								Sort by: {sortBy === "rating" ? "Rating" : sortBy === "upvotes" ? "Upvotes" : "Views"}
								<ChevronDown
									className={`w-4 h-4 transition-transform ${showSortMenu ? "rotate-180" : ""}`}
								/>
							</button>

							{showSortMenu && (
								<div className='absolute right-0 mt-2 w-48 rounded-xl bg-[#0F0F12] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden z-20'>
									{[
										{ value: "rating", label: "Highest Rating", icon: Star },
										{ value: "upvotes", label: "Most Upvoted", icon: ThumbsUp },
										{ value: "views", label: "Most Viewed", icon: Eye },
									].map((option) => (
										<button
											key={option.value}
											onClick={() => {
												setSortBy(option.value);
												setShowSortMenu(false);
											}}
											className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
												sortBy === option.value
													? "bg-[#5E6AD2]/20 text-white"
													: "text-[#8A8F98] hover:bg-white/[0.05] hover:text-white"
											}`}>
											<option.icon className='w-4 h-4' />
											{option.label}
										</button>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Videos Grid */}
					{filteredAndSortedVideos.length === 0 ? (
						<div className='text-center py-20'>
							<Search className='w-16 h-16 text-[#8A8F98]/50 mx-auto mb-4' />
							<p className='text-[#8A8F98] text-lg'>No videos found matching your search</p>
						</div>
					) : (
						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{filteredAndSortedVideos.map((video, idx) => (
								<VideoCard
									key={video.id}
									video={video}
									delay={idx * 50}
								/>
							))}
						</div>
					)}
				</div>
			</main>
		</div>
	);
}

function VideoCard({ video, delay }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ animationDelay: `${delay}ms` }}
			className='group cursor-pointer rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.08] to-white/[0.02] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-white/[0.12] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_2px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5),0_0_60px_rgba(94,106,210,0.15)] animate-fadeIn opacity-0'>
			{/* Thumbnail */}
			<div className='relative aspect-video bg-[#0a0a0c] overflow-hidden'>
				<img
					src={video.thumbnail}
					alt={video.title}
					className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />

				{/* Play Button Overlay */}
				<div
					className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
						isHovered ? "opacity-100" : "opacity-0"
					}`}>
					<div className='w-16 h-16 rounded-full bg-[#5E6AD2] flex items-center justify-center shadow-[0_0_40px_rgba(94,106,210,0.6)] transition-transform group-hover:scale-110'>
						<Play className='w-8 h-8 text-white fill-white ml-1' />
					</div>
				</div>

				{/* Duration Badge */}
				<div className='absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur text-xs font-medium'>
					{video.duration}
				</div>
			</div>

			{/* Content */}
			<div className='p-5'>
				<h3 className='font-semibold mb-2 line-clamp-2 group-hover:text-white transition-colors'>{video.title}</h3>
				<p className='text-sm text-[#8A8F98] mb-4 line-clamp-2'>{video.description}</p>

				{/* Stats */}
				<div className='flex items-center gap-4 text-xs text-[#8A8F98]'>
					<div className='flex items-center gap-1'>
						<Star className='w-3.5 h-3.5 fill-yellow-500 text-yellow-500' />
						<span className='font-medium'>{video.rating}</span>
					</div>
					<div className='flex items-center gap-1'>
						<ThumbsUp className='w-3.5 h-3.5' />
						<span>{video.upvotes}</span>
					</div>
					<div className='flex items-center gap-1'>
						<Eye className='w-3.5 h-3.5' />
						<span>{(video.views / 1000).toFixed(1)}k</span>
					</div>
				</div>

				{/* Author */}
				<div className='mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between'>
					<span className='text-xs text-[#8A8F98]'>by {video.author}</span>
					<div className='flex gap-1'>
						{video.tags.slice(0, 2).map((tag) => (
							<span
								key={tag}
								className='px-2 py-0.5 rounded-full bg-[#5E6AD2]/10 text-[#5E6AD2] text-xs'>
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
