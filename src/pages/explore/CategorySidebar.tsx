import GlowCard from "../../components/ui/GlowCard";

export default function CategorySidebar({ domains, onSelectVideos }: any) {
	return (
		<div className='space-y-4'>
			{domains.map((domain: any) => (
				<GlowCard
					key={domain.id}
					className='cursor-default'>
					<h3 className='text-sm font-semibold text-white mb-3'>{domain.title}</h3>

					<div className='space-y-2'>
						{domain.subtopics.map((sub: any) =>
							sub.miniTopics.map((mini: any) => (
								<button
									key={mini.id}
									onClick={() => onSelectVideos(mini.videos)}
									className='
                                            cursor-pointer
                                                block w-full text-left text-sm
                                                text-neutral-400 hover:text-white
                                                transition
                                            '>
									{mini.title}
								</button>
							))
						)}
					</div>
				</GlowCard>
			))}
		</div>
	);
}
