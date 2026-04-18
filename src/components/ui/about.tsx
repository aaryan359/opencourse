export default function AboutSectionBasic() {
	return (
		<section className="mx-auto min-h-screen max-w-6xl px-4 py-16 text-slate-100">
			<h1 className="text-center text-3xl font-semibold text-slate-100">About our apps</h1>
			<p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-300">
				A visual collection of our most recent works - each piece crafted with intention,
				emotion and style.
			</p>

			<div className="relative mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-10 px-2 md:grid-cols-2 lg:grid-cols-3 md:gap-12">
				<div
					className="pointer-events-none absolute -top-56 left-1/2 h-115 w-115 -translate-x-1/2 rounded-full bg-[#1B273A] blur-[180px]"
					aria-hidden
				/>

				{[
					{
						title: "Lightning-Fast Performance",
						desc: "Built with speed - minimal load times and optimized.",
						img: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=400&q=80",
					},
					{
						title: "Beautifully Designed Components",
						desc: "Modern, pixel-perfect UI components ready for any project.",
						img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=400&q=80",
					},
					{
						title: "Plug-and-Play Integration",
						desc: "Simple setup with support for React, Next.js and Tailwind CSS.",
						img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
					},
					{
						title: "Clear & Comprehensive",
						desc: "Get started fast with usage examples, live previews and code.",
						img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
					},
					{
						title: "Fully Customizable",
						desc: "Easily adapt styles, colors and layout to match your product.",
						img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80",
					},
					{
						title: "Accessibility First",
						desc: "Built with inclusive UX patterns for all users.",
						img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
					},
				].map((item) => (
					<article key={item.title} className="relative rounded-xl border border-slate-700 bg-[#111827] p-5 shadow-sm">
						<div className="h-12 w-12 overflow-hidden rounded border border-slate-600 bg-slate-800">
							<img src={item.img} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
						</div>
						<div className="mt-5 space-y-2">
							<h3 className="text-base font-medium text-slate-100">{item.title}</h3>
							<p className="text-sm text-slate-300">{item.desc}</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
