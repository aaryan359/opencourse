import { motion } from "framer-motion";
import Container from "../../components/ui/Container";
import GlowCard from "../../components/ui/GlowCard";
import VideoCard from "../../components/video/VideoCard";
import Progress from "./components/Progress";
import StatCard from "./components/StatCard";
import Section from "./components/Selection";
import { mockVideos } from "../../utils/mockContent";

export default function DashboardPage() {
	return (
		<section className='relative min-h-screen bg-neutral-950 py-5'>
			{/* background system (reuse your theme) */}
			<div className='fixed inset-0 z-0'>
				<motion.div
					className='absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-500/25 blur-[120px]'
					animate={{ x: [0, 40, -20], y: [0, 20, -10] }}
					transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
				/>
				<motion.div
					className='absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-400/20 blur-[140px]'
					animate={{ x: [0, -30, 20], y: [0, -20, 10] }}
					transition={{ duration: 14, repeat: Infinity, repeatType: "mirror" }}
				/>
			</div>

			<Container>
				{/* ===== HEADER ===== */}
				<div className='mb-10'>
					<h1 className='text-3xl font-semibold text-white'>Welcome back, Aryan 👋</h1>
					<p className='text-neutral-400 mt-2'>Keep building skills. You’re making solid progress.</p>
				</div>

				{/* ===== QUICK STATS ===== */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-12'>
					<StatCard
						label='Courses Enrolled'
						value='6'
					/>
					<StatCard
						label='Videos Watched'
						value='42'
					/>
					<StatCard
						label='Uploaded Videos'
						value='9'
					/>
					<StatCard
						label='Streak'
						value='12 days'
					/>
				</div>

				{/* ===== MAIN GRID ===== */}
				<div className='grid grid-cols-12 gap-8 '>
					{/* LEFT CONTENT */}
					<div className='col-span-12 lg:col-span-8 space-y-8  '>
						{/* Continue Learning */}
						<Section title='Continue Learning'>
							<div className='flex gap-6'>
								{mockVideos.map((video, index) => (
									<div
										key={index}
										className='min-w-[280px]'>
										<VideoCard video={video} />
									</div>
								))}
							</div>
						</Section>

						{/* Uploaded Videos */}
						<Section title='Your Uploaded Videos'>
							<div className='flex gap-6'>
								{mockVideos.map((video, index) => (
									<div
										key={index}
										className='min-w-[280px]'>
										<VideoCard video={video} />
									</div>
								))}
							</div>
						</Section>
					</div>

					{/* RIGHT SIDEBAR */}
					<div className='col-span-12 lg:col-span-4 space-y-6'>
						{/* Profile */}
						<GlowCard>
							<div className='flex items-center gap-4'>
								<img
									src='https://i.pravatar.cc/100'
									className='h-14 w-14 rounded-full'
								/>
								<div>
									<div className='font-semibold'>Aryan Meena</div>
									<div className='text-sm text-neutral-400'>Contributor · Web & DevOps</div>
								</div>
							</div>
						</GlowCard>

						{/* Progress */}
						<GlowCard>
							<div className='text-sm text-neutral-400 mb-3'>Weekly Progress</div>

							<div className='space-y-3'>
								<Progress
									label='Frontend'
									value={72}
								/>
								<Progress
									label='Backend'
									value={48}
								/>
								<Progress
									label='DevOps'
									value={30}
								/>
							</div>
						</GlowCard>

						{/* Activity */}
						<GlowCard>
							<div className='text-sm text-neutral-400 mb-3'>Recent Activity</div>

							<ul className='space-y-2 text-sm'>
								<li className='text-neutral-300'>
									• Uploaded <span className='text-white'>Docker Basics</span>
								</li>
								<li className='text-neutral-300'>
									• Completed <span className='text-white'>JS Closures</span>
								</li>
								<li className='text-neutral-300'>
									• Started <span className='text-white'>System Design</span>
								</li>
							</ul>
						</GlowCard>
					</div>
				</div>
			</Container>
		</section>
	);
}
