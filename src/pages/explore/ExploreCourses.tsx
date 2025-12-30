import SectionBlock from "../../components/SectionBlock";
import Container from "../../components/ui/Container";
import { featuredNonTechCourses, featuredTechCourses, nonTechCategories, techCategories } from "../../utils/data";

export default function ExploreCourses() {
	return (
		<section className='relative py-28 bg-neutral-950 overflow-hidden'>
			<div className='absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[800px] bg-indigo-500/10 blur-[120px]' />

			<Container>
				<div className='mb-24 max-w-3xl relative z-10'>
					<h1 className='text-5xl font-semibold text-white'>Explore Courses</h1>
					<p className='mt-5 text-neutral-400 leading-relaxed text-lg'>
						Learn practical skills across technology and non-technical domains. Curated by the community, built
						for real growth.
					</p>
				</div>

				<div className='grid gap-8 md:grid-cols-2 mb-32 relative z-10'>
					<SplitCard
						title='Tech Courses'
						description='Programming, systems, data, and engineering skills.'
						accent='indigo'
					/>
					<SplitCard
						title='Non-Tech Courses'
						description='Communication, career growth, productivity, and more.'
						accent='emerald'
					/>
				</div>

				<SectionBlock
					title='Tech Categories'
					categories={techCategories}
					courses={featuredTechCourses}
					accent='indigo'
				/>

				<SectionBlock
					title='Non-Tech Categories'
					categories={nonTechCategories}
					courses={featuredNonTechCourses}
					accent='emerald'
				/>

				<div className='mt-32 text-center'>
					<p className='text-neutral-400 mb-6 text-lg'>Want to contribute or suggest improvements?</p>
					<button
						className='
                                relative overflow-hidden
                                rounded-xl
                                bg-white
                                px-8 py-3
                                text-sm font-medium text-black
                                transition
                                hover:shadow-lg hover:shadow-indigo-500/20
                            '>
						Become a Contributor
					</button>
				</div>
			</Container>
		</section>
	);
}

function SplitCard({ title, description, accent }: { title: string; description: string; accent: "indigo" | "emerald" }) {
	return (
		<div
			className={`
                group relative overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/[0.04]
                p-10
                transition-all duration-300
                hover:-translate-y-1
                hover:border-white/20
                hover:shadow-xl
                hover:shadow-${accent}-500/15
                `}>
			<div
				className={`
                    absolute top-0 left-1/2
                    h-px w-2/3
                    -translate-x-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-${accent}-400
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition
                `}
			/>

			<div
				className={`
                        absolute inset-0
                        rounded-3xl
                        opacity-0
                        group-hover:opacity-100
                        transition
                        shadow-[inset_0_0_0_1px_rgba(99,102,241,0.18)]
                    `}
			/>

			<h2 className='text-2xl font-medium text-white relative z-10'>{title}</h2>
			<p className='mt-4 text-neutral-400 relative z-10 text-lg'>{description}</p>

			<div className={`mt-8 font-medium text-${accent}-400 relative z-10`}>Browse →</div>
		</div>
	);
}
