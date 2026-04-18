import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, ShieldCheck, RefreshCw, Sparkles, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

const highlights = [
	{
		title: "Structured Courses",
		description: "Carefully sequenced learning paths that balance fundamentals with practical project work.",
		icon: BookOpen,
		cardClass: "from-indigo-500/24 via-indigo-400/10 to-transparent",
		iconClass: "text-indigo-300",
	},
	{
		title: "Verified Contributors",
		description: "Community members and educators collaborate, review, and refine each contribution before release.",
		icon: ShieldCheck,
		cardClass: "from-cyan-500/22 via-cyan-400/10 to-transparent",
		iconClass: "text-cyan-300",
	},
	{
		title: "Always Up-to-date",
		description: "Lessons are revised continuously to match hiring trends, tools, and real interview expectations.",
		icon: RefreshCw,
		cardClass: "from-purple-500/24 via-purple-400/10 to-transparent",
		iconClass: "text-purple-300",
	},
];

const principles = [
	"Keep content practical and directly usable in real jobs.",
	"Build with community review, not one-time publishing.",
	"Prioritize clarity over complexity in every course.",
	"Stay accessible for beginners without losing depth.",
];

export default function About() {
	return (
		<section className="relative overflow-hidden bg-neutral-950 py-16 text-[#eef3ff] md:py-24">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.2),transparent_58%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.12),transparent_55%)]" />

			<Container>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
					className="relative z-10"
				>
					<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-indigo-300 backdrop-blur">
						<Sparkles className="h-4 w-4" />
						About OpenCourse
					</div>

					<h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
						Learning infrastructure built by the community,
						<span className="block bg-linear-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
							for real-world growth.
						</span>
					</h1>

					<p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-400 md:text-lg">
						OpenCourse is a collaborative platform where developers, educators, and learners build modern course paths and interview prep together.
						We focus on practical depth, clear progression, and updates that reflect how teams actually hire and work.
					</p>

					<div className="mt-8 flex flex-wrap gap-4">
						<Link
							to="/courses"
							className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
						>
							Explore Courses
							<ArrowRight className="h-4 w-4" />
						</Link>
						<Link
							to="/contribute"
							className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-transparent px-5 py-3 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/5"
						>
							Become a Contributor
							<Users className="h-4 w-4" />
						</Link>
					</div>
				</motion.div>

				<div className="relative z-10 mt-14 grid gap-5 md:grid-cols-3">
					{highlights.map((item, index) => {
						const Icon = item.icon;

						return (
							<motion.article
								key={item.title}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.35, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
								className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl"
							>
								<div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${item.cardClass}`} />
								<div className="relative z-10 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 p-2">
									<Icon className={`h-5 w-5 ${item.iconClass}`} />
								</div>
								<h2 className="relative z-10 mt-4 text-xl font-semibold text-white">{item.title}</h2>
								<p className="relative z-10 mt-2 text-sm leading-relaxed text-neutral-400">{item.description}</p>
							</motion.article>
						);
					})}
				</div>

				<div className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
					<div className="rounded-2xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl">
						<h3 className="text-xl font-semibold text-white">How We Work</h3>
						<p className="mt-2 text-sm text-neutral-400">
							Every piece of content follows a simple lifecycle to maintain quality without slowing down contributors.
						</p>

						<div className="mt-6 grid gap-4 sm:grid-cols-3">
							<div className="rounded-xl border border-white/12 bg-indigo-500/8 p-4">
								<div className="text-xs uppercase tracking-wide text-indigo-300">Step 01</div>
								<div className="mt-1 text-sm font-medium text-white">Submit</div>
								<div className="mt-1 text-xs text-neutral-400">Contributors propose questions, topics, or updates.</div>
							</div>
							<div className="rounded-xl border border-white/12 bg-cyan-500/8 p-4">
								<div className="text-xs uppercase tracking-wide text-cyan-300">Step 02</div>
								<div className="mt-1 text-sm font-medium text-white">Review</div>
								<div className="mt-1 text-xs text-neutral-400">Moderators validate accuracy, clarity, and depth.</div>
							</div>
							<div className="rounded-xl border border-white/12 bg-purple-500/8 p-4">
								<div className="text-xs uppercase tracking-wide text-purple-300">Step 03</div>
								<div className="mt-1 text-sm font-medium text-white">Publish</div>
								<div className="mt-1 text-xs text-neutral-400">Approved content goes live for everyone.</div>
							</div>
						</div>
					</div>

					<div className="rounded-2xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl">
						<h3 className="text-xl font-semibold text-white">Core Principles</h3>
						<ul className="mt-4 space-y-3">
							{principles.map((principle) => (
								<li
									key={principle}
									className="rounded-lg border border-white/12 bg-white/3 px-3 py-2 text-sm text-neutral-300"
								>
									{principle}
								</li>
							))}
						</ul>
					</div>
				</div>
			</Container>
		</section>
	);
}
