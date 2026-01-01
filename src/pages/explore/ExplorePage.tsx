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
	const [activeMiniTopic, setActiveMiniTopic] = useState<any>(null);
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState<SortOption>("rating");

	const videos = useMemo(() => {
		if (!activeMiniTopic) return [];
		let v = activeMiniTopic.videos.filter((video: Video) => video.title.toLowerCase().includes(query.toLowerCase()));

		return [...v].sort((a, b) => {
			if (sort === "views") return b.views - a.views;
			if (sort === "upvotes") return b.upvotes - a.upvotes;
			return b.rating - a.rating;
		});
	}, [activeMiniTopic, query, sort]);

	return (
		<section className='relative h-[calc(100vh-64px)] bg-neutral-950 py-10'>
			<Container>
				<DomainTabs
					value={domain}
					onChange={setDomain}
				/>

				<div className='mt-6 grid grid-cols-12 gap-8'>
					{/* Sidebar */}
					<aside className='col-span-3 h-[calc(100vh-160px)] overflow-y-auto pr-2'>
						<CategorySidebar
							domains={mockContent[domain]}
							activeMiniTopic={activeMiniTopic}
							onSelectMiniTopic={setActiveMiniTopic}
						/>
					</aside>

					{/* Main Content */}
					<main className='col-span-9 flex flex-col h-[calc(100vh-160px)]'>
						<ExploreToolbar
							query={query}
							onQueryChange={setQuery}
							sort={sort}
							onSortChange={setSort}
							title={activeMiniTopic?.title}
						/>

						{/* Scrollable Videos */}
						<div className='mt-4 flex-1 overflow-y-auto pr-2 no-scrollbar'>
							<VideoGrid videos={videos} />
						</div>
					</main>
				</div>
			</Container>
		</section>
	);
}
