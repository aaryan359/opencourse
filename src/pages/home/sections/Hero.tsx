import { motion, useMotionValue, useTransform } from "framer-motion";
import { CheckCircle, Users, Layers, BookOpen } from "lucide-react";
import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";
import { HoverBorderGradient } from "../../../components/ui/hover-border-gradient";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const handleExploreCourses = () => {
    navigate("/explore");
  };

  const handleBecomeContributor = () => {
    navigate("/contribute");
  };
  
	const mx = useMotionValue(0);
	const my = useMotionValue(0);

	const rotateX = useTransform(my, [-200, 200], [4, -4]);
	const rotateY = useTransform(mx, [-200, 200], [-4, 4]);

	return (
		<section
			onMouseMove={(e) => {
				const r = e.currentTarget.getBoundingClientRect();
				mx.set(e.clientX - r.left - r.width / 2);
				my.set(e.clientY - r.top - r.height / 2);
			}}
			className='relative overflow-hidden bg-neutral-950'>
			<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.18),transparent_60%)]' />
			<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.12),transparent_55%)]' />

			<Container>
				<div className='relative z-10 pt-20 pb-15'>
					
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						className='mb-8 flex'>
						<HoverBorderGradient
							containerClassName='rounded-full px-1 py-0.5'
							as='button'
							className='bg-[#050506] to-[#050506] from-indigo-400 text-white flex items-center space-x-2 px-4 py-1.5 text-xs'>
							<span>Open-source · Community driven</span>
						</HoverBorderGradient>
					</motion.div>

					{/* ===== MAIN GRID ===== */}
					<div className='grid lg:grid-cols-2 gap-16 items-start'>
						{/* ===== LEFT ===== */}
						<motion.div
							initial={{ opacity: 0, y: 32 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
							<h1 className='text-[3.2rem] md:text-[4.6rem] font-semibold leading-[1.05] tracking-tight'>
								<span className='block text-white'>Learning that evolves</span>
								<span className='block bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent'>
									with the industry
								</span>
							</h1>

							<p className='mt-7 max-w-xl text-lg text-neutral-400 leading-relaxed'>
								OpenCourse is a community-driven platform where developers continuously build, review,
								and refine courses and interview preparation — keeping knowledge relevant, practical,
								and current.
							</p>

							<div className='mt-10 flex flex-wrap gap-4'>
								<Button
									type='button'
									onClick={handleExploreCourses}
									className='shadow-[0_0_45px_rgba(99,102,241,0.45)]'>
									Explore Courses
								</Button>
								<Button
									type='button'
									variant='secondary'
									onClick={handleBecomeContributor}>
									Become a Contributor
								</Button>
							</div>

							<div className='mt-12 grid grid-cols-3 gap-6 max-w-xl'>
								<Stat
									value='120+'
									label='Courses & Paths'
								/>
								<Stat
									value='300+'
									label='Contributors'
								/>
								<Stat
									value='Weekly'
									label='Content Updates'
								/>
							</div>
						</motion.div>

						{/* ===== RIGHT ===== */}
						<motion.div
							style={{ rotateX, rotateY }}
							className='relative perspective-[1200px]'>
								
							<div className='rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-8 shadow-2xl'>
								<div className='space-y-6'>
									<Feature
										icon={<Layers />}
										title='Structured Courses'
										desc='Community-maintained curricula with real-world depth.'
									/>
									<Feature
										icon={<Users />}
										title='Verified Contributors'
										desc='Developers and educators reviewed by peers.'
									/>
									<Feature
										icon={<CheckCircle />}
										title='Always Up-to-date'
										desc='Lessons evolve with hiring trends.'
									/>
								</div>

								<div className='mt-8 rounded-xl border border-white/10 bg-black/30 p-4'>
									<div className='flex items-center gap-2 text-xs text-neutral-400 mb-2'>
										<BookOpen className='h-4 w-4 text-indigo-400' />
										Community activity
									</div>
									<div className='flex items-center gap-3 text-sm text-neutral-300'>
										<span className='h-2 w-2 rounded-full bg-emerald-400 animate-pulse' />
										3 new lessons published today
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</Container>
		</section>
	);
}

/* ================= HELPERS ================= */

function Feature({ icon, title, desc }: any) {
	return (
		<div className='flex gap-4'>
			<div className='mt-1 text-indigo-400'>{icon}</div>
			<div>
				<div className='text-white font-medium'>{title}</div>
				<div className='text-sm text-neutral-400'>{desc}</div>
			</div>
		</div>
	);
}

function Stat({ value, label }: { value: string; label: string }) {
	return (
		<div>
			<div className='text-xl font-semibold text-white'>{value}</div>
			<div className='text-xs text-neutral-400'>{label}</div>
		</div>
	);
}
