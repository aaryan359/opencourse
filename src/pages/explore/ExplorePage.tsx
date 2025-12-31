import { useMemo, useState } from "react";
import Container from "../../components/ui/Container";
import DomainTabs from "./DomainTabs";
import CategorySidebar from "./CategorySidebar";
import ExploreToolbar from "./ExploreToolbar";
import VideoGrid from "./VideoGrid";
import { mockContent } from "../../utils/mockContent";
import type { Video } from "../../types/videos.types";
import { motion } from "framer-motion";
type SortOption = "rating" | "views" | "upvotes";

export default function ExplorePage() {
	const [domain, setDomain] = useState<"tech" | "nonTech">("tech");
	const [selectedVideos, setSelectedVideos] = useState<Video[]>([]);
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState<SortOption>("rating");

	const filteredVideos = useMemo(() => {
		let videos = selectedVideos.filter((v) => v.title.toLowerCase().includes(query.toLowerCase()));

		return [...videos].sort((a, b) => {
			if (sort === "views") return b.views - a.views;
			if (sort === "upvotes") return b.upvotes - a.upvotes;
			return b.rating - a.rating;
		});
	}, [selectedVideos, query, sort]);

	return (
		<section className='min-h-screen bg-neutral-950 py-10'>
			<div className='fixed inset-0 z-0 opacity-[0.5]'>
				{/* Subtle grid */}
				<motion.div
					className='absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-500/30 blur-[120px]'
					animate={{ x: [0, 40, -20], y: [0, 20, -10] }}
					transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
				/>

				<motion.div
					className='absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-400/20 blur-[140px]'
					animate={{ x: [0, -30, 20], y: [0, -20, 10] }}
					transition={{ duration: 14, repeat: Infinity, repeatType: "mirror" }}
				/>

				{/* Subtle grid overlay */}
				<div
					className='absolute inset-0 opacity-[0.06]'
					style={{
						backgroundImage:
							"linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
						backgroundSize: "48px 48px",
					}}
				/>
			</div>

			<Container>
				{/* Domain Tabs */}
				<DomainTabs
					value={domain}
					onChange={setDomain}
				/>

				<div className='mt-8 z-50 grid grid-cols-12 gap-10'>
					{/* Sidebar */}
					<aside className='col-span-3'>
						<CategorySidebar
							domains={mockContent[domain]}
							onSelectVideos={setSelectedVideos}
						/>
					</aside>

					{/* Main */}
					<main className='col-span-9 space-y-6 z-50'>
						<ExploreToolbar
							query={query}
							onQueryChange={setQuery}
							sort={sort}
							onSortChange={setSort}
						/>

						<VideoGrid videos={filteredVideos} />
					</main>
				</div>
			</Container>
		</section>
	);
}
