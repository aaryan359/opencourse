import { motion, useMotionValue, useSpring } from "framer-motion";
import GlowCard from "../../components/ui/GlowCard";
import { MessageCircle, ThumbsUp, Users, Sparkles } from "lucide-react";

const containerVariants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.08,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 16 },
	show: { opacity: 1, y: 0 },
};

export default function CommunityPage() {
	return (
		<section className='min-h-screen bg-neutral-950 pt-28 pb-32'>
			<motion.div
				className='fixed -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-500/30 blur-[120px]'
				animate={{ x: [0, 40, -20], y: [0, 20, -10] }}
				transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
			/>

			<motion.div
				className=' fixed top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-400/20 blur-[140px]'
				animate={{ x: [0, -30, 20], y: [0, -20, 10] }}
				transition={{ duration: 14, repeat: Infinity, repeatType: "mirror" }}
			/>

			{/* Subtle grid overlay */}
			<div
				className='absolute fixed inset-0 opacity-[0.09]'
				style={{
					backgroundImage:
						"linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
					backgroundSize: "48px 48px",
				}}
			/>
			<div className='max-w-7xl mx-auto px-6 space-y-24'>
				<Hero />
				<Stats />
				<FeaturedDiscussions />
				<Creators />
				<CTA />
			</div>
		</section>
	);
}

/* -------------------------------- HERO -------------------------------- */

function Hero() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className='relative text-center space-y-6'>
			<div className='flex justify-center'>
				<span className='px-4 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-neutral-300'>
					Community Driven Learning
				</span>
			</div>

			<h1 className='text-5xl md:text-6xl font-semibold text-white leading-tight'>
				Learn. Share. <span className='text-indigo-400'>Grow Together.</span>
			</h1>

			<p className='max-w-2xl mx-auto text-neutral-400 text-lg'>
				Join a community of learners and creators sharing knowledge, experiences, and real-world insights.
			</p>
		</motion.div>
	);
}

/* -------------------------------- STATS -------------------------------- */

function Stats() {
	const stats = [
		{ label: "Active Members", value: "12.4K+" },
		{ label: "Discussions", value: "3.1K+" },
		{ label: "Creators", value: "820+" },
	];

	return (
		<div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
			{stats.map((s) => (
				<GlowCard key={s.label}>
					<div className='text-center space-y-2'>
						<div className='text-3xl font-semibold text-white'>{s.value}</div>
						<div className='text-sm text-neutral-400'>{s.label}</div>
					</div>
				</GlowCard>
			))}
		</div>
	);
}

/* -------------------------- FEATURED DISCUSSIONS ------------------------ */

function FeaturedDiscussions() {
	const discussions = [
		{
			title: "How I cracked System Design interviews",
			author: "Aaryan",
			replies: 42,
			likes: 128,
		},
		{
			title: "Best way to learn React in 2025?",
			author: "Sneha",
			replies: 31,
			likes: 94,
		},
		{
			title: "Is DSA still relevant for startups?",
			author: "Rahul",
			replies: 58,
			likes: 176,
		},
	];

	return (
		<div className='space-y-10'>
			<SectionHeader
				icon={<MessageCircle size={18} />}
				title='Featured Discussions'
				accent='indigo'
			/>

			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='show'
				className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{discussions.map((d) => (
					<motion.div
						key={d.title}
						variants={itemVariants}>
						<DiscussionCard {...d} />
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}

function DiscussionCard({ title, author, replies, likes }: any) {
	const hoverY = useMotionValue(0);
	const y = useSpring(hoverY, { stiffness: 120, damping: 14 });

	return (
		<motion.div
			style={{ y }}
			onHoverStart={() => hoverY.set(-6)}
			onHoverEnd={() => hoverY.set(0)}>
			<GlowCard className='cursor-pointer'>
				<div className='space-y-4'>
					<h3 className='text-lg font-medium text-white'>{title}</h3>

					<div className='text-sm text-neutral-400'>by {author}</div>

					<div className='flex items-center gap-5 text-sm text-neutral-400'>
						<span className='flex items-center gap-1'>
							<MessageCircle size={14} />
							{replies}
						</span>
						<span className='flex items-center gap-1'>
							<ThumbsUp size={14} />
							{likes}
						</span>
					</div>
				</div>
			</GlowCard>
		</motion.div>
	);
}

/* ------------------------------ CREATORS -------------------------------- */

function Creators() {
	const creators = [
		{ name: "Aaryan", role: "Full-Stack Dev" },
		{ name: "Sneha", role: "ML Engineer" },
		{ name: "Rahul", role: "Backend Architect" },
	];

	return (
		<div className='space-y-10'>
			<SectionHeader
				icon={<Users size={18} />}
				title='Top Contributors'
				accent='emerald'
			/>

			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{creators.map((c) => (
					<GlowCard
						key={c.name}
						accent='emerald'>
						<div className='flex items-center gap-4'>
							<div className='h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold'>
								{c.name[0]}
							</div>

							<div>
								<div className='text-white font-medium'>{c.name}</div>
								<div className='text-sm text-neutral-400'>{c.role}</div>
							</div>
						</div>
					</GlowCard>
				))}
			</div>
		</div>
	);
}

/* --------------------------------- CTA ---------------------------------- */

function CTA() {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.96 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4 }}
			className='relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 p-12 text-center'>
			<div className='absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-emerald-500/10' />

			<div className='relative space-y-6'>
				<Sparkles className='mx-auto text-indigo-400' />

				<h2 className='text-3xl font-semibold text-white'>Become a Community Creator</h2>

				<p className='max-w-xl mx-auto text-neutral-400'>
					Share your knowledge, build your reputation, and help others grow.
				</p>

				<button
					className='
            inline-flex items-center justify-center
            rounded-xl
            px-6 py-3
            text-sm font-medium
            text-white
            bg-indigo-500/90
            hover:bg-indigo-500
            transition
          '>
					Start Contributing
				</button>
			</div>
		</motion.div>
	);
}

/* --------------------------- SECTION HEADER ------------------------------ */

function SectionHeader({ title, icon, accent }: { title: string; icon: React.ReactNode; accent: "indigo" | "emerald" }) {
	return (
		<div className='flex items-center gap-4'>
			<div className={`h-9 w-9 rounded-lg flex items-center justify-center bg-${accent}-500/10 text-${accent}-400`}>{icon}</div>
			<h2 className='text-2xl font-semibold text-white'>{title}</h2>
		</div>
	);
}
