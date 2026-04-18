import { Sparkles } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";

type FeatureItem = {
	title: string;
	desc: string;
	img: string;
};

const features: FeatureItem[] = [
	{
		title: "Lightning-Fast Performance",
		desc: "Built with speed - minimal load times and optimized rendering.",
		img: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=640&q=80",
	},
	{
		title: "Beautifully Designed Components",
		desc: "Modern, production-ready UI blocks for your product pages.",
		img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=640&q=80",
	},
	{
		title: "Plug-and-Play Integration",
		desc: "Simple integration with React, TypeScript and Tailwind CSS.",
		img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=640&q=80",
	},
	{
		title: "Clear & Comprehensive",
		desc: "Easy-to-read layout with practical examples and structure.",
		img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=640&q=80",
	},
	{
		title: "Fully Customizable",
		desc: "Colors, spacing and typography can be adapted quickly.",
		img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=640&q=80",
	},
	{
		title: "Accessibility First",
		desc: "Built with readability and inclusive design principles.",
		img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=640&q=80",
	},
];

export default function AboutSectionDemo() {
	return (
		<section className="relative mx-auto min-h-screen max-w-6xl px-4 py-16 text-white md:py-20">
			<div
				className="pointer-events-none absolute -top-64 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-white/10 blur-[220px]"
				aria-hidden
			/>

			<header className="mx-auto max-w-2xl text-center">
				<p className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white border border-white/20">
					<Sparkles className="h-3.5 w-3.5" />
					About OpenCourse
				</p>
				<h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">About our apps</h1>
				<p className="mt-2 text-sm text-gray-300 md:text-base">
					A visual collection of our most recent work - each piece crafted with intention,
					emotion and style.
				</p>
			</header>

			<div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-12">
				{features.map((item) => (
					<Feature key={item.title} {...item} />
				))}
			</div>
		</section>
	);
}

function Feature({ title, desc, img }: FeatureItem) {
	return (
		<GlowCard
			glowColor="neutral"
			customSize
			className="group h-full rounded-xl border border-white/20 bg-black p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-neutral-900 hover:shadow-md"
		>
			<div className="flex items-start gap-4">
				<div className="h-10 w-10 shrink-0 overflow-hidden rounded border border-white/20 bg-neutral-900">
					<img src={img} alt={title} className="h-full w-full object-cover" loading="lazy" />
				</div>
				<div>
					<h3 className="text-base font-medium text-white">{title}</h3>
					<p className="mt-1 text-sm leading-relaxed text-gray-300">{desc}</p>
				</div>
			</div>
		</GlowCard>
	);
}
