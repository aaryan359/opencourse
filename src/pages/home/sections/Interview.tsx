import Container from "../../../components/ui/Container";

const interviewCategories = [
	{
		title: "Data Structures & Algorithms",
		description: "Frequently asked problems covering arrays, trees, graphs, and complexity.",
		count: 120,
	},
	{
		title: "System Design",
		description: "Design scalable systems, APIs, databases, and distributed architectures.",
		count: 45,
	},
	{
		title: "Backend & APIs",
		description: "REST, authentication, databases, and backend best practices.",
		count: 60,
	},
	{
		title: "Frontend",
		description: "JavaScript, React, performance, accessibility, and UI patterns.",
		count: 55,
	},
];

export default function Interview() {
	return (
		<section className='py-20 bg-neutral-950'>
			<Container>
				{/* Header */}
				<div className='mb-10 max-w-3xl'>
					<h2 className='text-4xl font-semibold text-white'>Interview Preparation</h2>
					<p className='mt-3 text-neutral-400 leading-relaxed'>
						Practice real interview questions curated and reviewed by the OpenCourse community. Updated
						continuously to match current hiring trends.
					</p>
				</div>

				{/* Categories */}
				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
					{interviewCategories.map((cat) => (
						<div
							key={cat.title}
							tabIndex={0}
							className='
                group relative
                rounded-xl
                border border-white/10
                bg-white/[0.03]
                p-6
                transition-all duration-300
                hover:-translate-y-[2px]
                hover:border-white/20
                hover:bg-white/[0.05]
                hover:shadow-lg hover:shadow-indigo-500/10
                focus-visible:outline-none
                focus-visible:ring-1 focus-visible:ring-white/30
              '>
							{/* Top light line */}
							{/* <div
                className="
                  pointer-events-none
                  absolute top-0 left-1/2
                  h-px w-1/2
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-indigo-400
                  to-transparent
                  opacity-0
                  group-hover:opacity-100
                  transition
                "
              /> */}

							{/* Inner glow */}
							<div
								className='
                  pointer-events-none
                  absolute inset-0
                  rounded-xl
                  opacity-0
                  group-hover:opacity-100
                  transition
                  shadow-[inset_0_0_0_1px_rgba(99,102,241,0.15)]
                '
							/>

							{/* Content */}
							<h3 className='text-lg font-medium text-white'>{cat.title}</h3>

							<p className='mt-2 text-sm text-neutral-400 leading-relaxed'>{cat.description}</p>

							<div className='mt-4 flex items-center  justify-between text-xs text-neutral-500'>
								<span>{cat.count}+ questions</span>
								<span className='text-indigo-400/80  cursor-pointer'>Practice →</span>
							</div>
						</div>
					))}
				</div>

				{/* Footer actions */}
				<div className='mt-12 flex flex-col sm:flex-row gap-4 '>
					<button
						className='
              inline-flex items-center justify-center
              cursor-pointer
              rounded-lg
              bg-white
              px-5 py-2.5
              text-sm font-medium text-black
              transition
              hover:bg-neutral-200
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/30
            '>
						Start Practicing
					</button>

					<button
						className='
              inline-flex items-center justify-center
              rounded-lg
               cursor-pointer
              border border-white/15
              px-5 py-2.5
              text-sm font-medium text-white
              transition
              hover:border-white/25
              hover:bg-white/[0.05]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/30
            '>
						Contribute Questions
					</button>
				</div>

				{/* Trust signal */}
				<div className='mt-6 text-sm text-neutral-500'>Questions reviewed by community contributors · Updated weekly</div>
			</Container>
		</section>
	);
}
