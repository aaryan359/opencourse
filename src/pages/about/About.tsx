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

const teamMembers = [
	{
		name: "Aryan Meena",
		role: "Founder",
		skills: "Product Strategy, Full-Stack Development",
		bio: "Drives OpenCourse vision and product direction with strong focus on learner outcomes.",
	},
	{
		name: "Vikas",
		role: "Core Team",
		skills: "Backend, Platform Architecture",
		bio: "Builds scalable technical systems and contributes to intelligent learning workflows.",
	},
	{
		name: "Anurag",
		role: "Core Team",
		skills: "Full-Stack Development, Mobile Platforms",
		bio: "Shapes mobile-first experiences so learners can practice and study from anywhere.",
	},
	{
		name: "Ayush",
		role: "Core Team",
		skills: "AI/ML, API Engineering",
		bio: "Strengthens APIs and moderation flows to keep contributor operations stable.",
	},
	{
		name: "Manroop",
		role: "Core Team",
		skills: "UI Design, Visual Systems",
		bio: "Designs clean interfaces and visual language for consistent product quality.",
	},
	{
		name: "Chandra Shekar",
		role: "Core Team",
		skills: "Operations, Community Support",
		bio: "Supports team execution and contributor coordination across platform initiatives.",
	},
];

const faqItems = [
	{
		question: "How can I become a contributor?",
		answer:
			"Create your account, apply from the dashboard, and wait for admin review. Once approved, you can submit course videos and interview Q&A.",
	},
	{
		question: "Why is my content not visible publicly?",
		answer:
			"All submissions go through moderation. Content appears publicly only after admin approval.",
	},
	{
		question: "Can I update my profile picture and details?",
		answer:
			"Yes. Use the dashboard profile section to upload your profile picture and update bio, skills, and title.",
	},
	{
		question: "What video formats are supported for contribution?",
		answer:
			"You can upload MP4, WebM, OGG, MOV, and MKV files with platform limits on size and duration.",
	},
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
					<p className="mt-4 max-w-3xl rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm font-medium text-neutral-200">
						Slogan: Learn deeply, build consistently, and grow together.
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

				<div className="relative z-10 mt-12 space-y-6">
					<section id="company-history" className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-violet-400/25 bg-linear-to-br from-purple-500/16 via-violet-500/12 to-[#C8A2C8]/18 p-6 md:p-7">
						<div className="pointer-events-none absolute -top-20 -right-16 h-44 w-44 rounded-full bg-purple-400/24 blur-3xl" />
						<div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-[#C8A2C8]/22 blur-3xl" />

						<h3 className="relative z-10 text-xl font-semibold text-white">Company History</h3>
						<p className="relative z-10 mt-3 text-sm leading-relaxed text-neutral-200 md:text-base">
							OpenCourse started as a student-led initiative when we repeatedly faced the same issue: quality learning content was fragmented across platforms, often outdated, and difficult to follow in a structured way.
						</p>
						<p className="relative z-10 mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">
							We began by curating practical paths for topics we were learning ourselves, then built a contribution and moderation system so every video and interview question could be reviewed before reaching learners.
						</p>
						<p className="relative z-10 mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">
							Today, OpenCourse is a community-first platform where contributors, reviewers, and learners collaborate continuously to keep content useful for real projects and real hiring expectations.
						</p>

						<div className="relative z-10 mt-4 grid gap-3 md:grid-cols-3">
							<div className="rounded-lg border border-white/12 bg-white/6 px-3 py-2 text-xs text-neutral-200">Student-led beginning</div>
							<div className="rounded-lg border border-white/12 bg-white/6 px-3 py-2 text-xs text-neutral-200">Community moderation model</div>
							<div className="rounded-lg border border-white/12 bg-white/6 px-3 py-2 text-xs text-neutral-200">Practical, career-focused learning</div>
						</div>

						<p className="relative z-10 mt-4 rounded-lg border border-violet-300/30 bg-violet-500/18 px-3 py-2 text-sm font-medium text-violet-100">
							Our slogan: Learn deeply, build consistently, and grow together.
						</p>
					</section>

					<section id="meet-the-team" className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/3 p-6 md:p-7">
						<h3 className="text-xl font-semibold text-white">Meet the Team</h3>
						<p className="mt-2 text-sm text-neutral-400">Founder and core team driving OpenCourse.</p>
						<div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
							{teamMembers.map((member) => (
								<article key={member.name} className="rounded-xl border border-white/12 bg-white/4 p-4">
									<div className="flex items-center justify-between gap-3">
										<h4 className="text-base font-semibold text-white">{member.name}</h4>
										<span className="rounded-full border border-indigo-400/25 bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-300">
											{member.role}
										</span>
									</div>
									<p className="mt-2 text-xs text-cyan-300">Skills: {member.skills}</p>
									<p className="mt-2 text-sm leading-relaxed text-neutral-300">{member.bio}</p>
								</article>
							))}
						</div>
					</section>

					<section id="careers" className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/3 p-6 md:p-7">
						<h3 className="text-xl font-semibold text-white">Careers</h3>
						<p className="mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">
							Want to contribute to OpenCourse as a collaborator, reviewer, or builder? We are always open to people who care about education and product quality.
						</p>
						<p className="mt-3 text-sm text-neutral-200">
							Email us at{" "}
							<a href="mailto:aaryanmeena96@gmail.com" className="font-medium text-indigo-300 underline underline-offset-4 hover:text-indigo-200">
								aaryanmeena96@gmail.com
							</a>{" "}
							if you want to contribute.
						</p>
					</section>

					<section id="faqs" className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/3 p-6 md:p-7">
						<h3 className="text-xl font-semibold text-white">FAQs</h3>
						<div className="mt-5 space-y-3">
							{faqItems.map((item) => (
								<article key={item.question} className="rounded-lg border border-white/12 bg-white/4 p-4">
									<h4 className="text-sm font-semibold text-white md:text-base">{item.question}</h4>
									<p className="mt-2 text-sm leading-relaxed text-neutral-300">{item.answer}</p>
								</article>
							))}
						</div>
					</section>

					<section id="support" className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/3 p-6 md:p-7">
						<h3 className="text-xl font-semibold text-white">Support</h3>
						<p className="mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">
							If you need help with account access, contributions, moderation, or any platform issue, contact support and include your registered email and issue details.
						</p>
						<p className="mt-3 text-sm text-neutral-200">
							Support Email:{" "}
							<a href="mailto:aaryanmeena96@gmail.com" className="font-medium text-cyan-300 underline underline-offset-4 hover:text-cyan-200">
								aaryanmeena96@gmail.com
							</a>
						</p>
					</section>
				</div>
			</Container>
		</section>
	);
}
