import { motion, useMotionValue, useTransform } from "framer-motion";
import { CheckCircle, Users, Layers, BookOpen } from "lucide-react";
import type { ReactNode } from "react";
import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";
import { HoverBorderGradient } from "../../../components/ui/hover-border-gradient";
import { useNavigate } from "react-router-dom";
import { BorderBeam } from "@/components/ui/border-beam";

const heroFeatures = [
	{
		icon: <Layers />,
		title: "Structured Courses",
		desc: "Community-maintained curricula with real-world depth.",
		beamFrom: "#60a5fa",
		beamTo: "#dbeafe",
	},
	{
		icon: <Users />,
		title: "Verified Contributors",
		desc: "Developers and educators reviewed by peers.",
		beamFrom: "#a78bfa",
		beamTo: "#ede9fe",
	},
	{
		icon: <CheckCircle />,
		title: "Always Up-to-date",
		desc: "Lessons evolve with hiring trends.",
		beamFrom: "#34d399",
		beamTo: "#dcfce7",
	},
];

export default function Hero() {
  const navigate = useNavigate();
  
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
				<div className='relative z-10 pt-20 pb-10'>
					
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						className='mb-6 flex'>
						<HoverBorderGradient
							containerClassName='rounded-full px-1 py-0.5'
							as='button'
							className='bg-[#050506] to-[#050506] from-indigo-400 text-white flex items-center space-x-2 px-4 py-1.5 text-xs'>
							<span>Open-source · Community driven</span>
						</HoverBorderGradient>
					</motion.div>

					
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
								<Button   onClick={() => navigate("/courses")} className='shadow-[0_0_45px_rgba(99,102,241,0.45)]'>Browse Courses</Button>
								<Button variant='secondary'>Become a Contributor</Button>
							</div>

							<div className='mt-12 grid grid-cols-3 gap-6 max-w-xl'>
								<Stat
									value='12+'
									label='Courses & Paths'
								/>
								<Stat
									value='3+'
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
									{heroFeatures.map((feature) => (
										<Feature
											key={feature.title}
											icon={feature.icon}
											title={feature.title}
											desc={feature.desc}
											beamFrom={feature.beamFrom}
											beamTo={feature.beamTo}
										/>
									))}
								</div>

								<div className='relative mt-8 overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4'>
									<BorderBeam
										size={92}
										duration={8}
										delay={0}
										anchor={86}
										borderWidth={1.1}
										colorFrom='#f59e0b'
										colorTo='#fef3c7'
										className='opacity-95'
									/>
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


function Feature({
	icon,
	title,
	desc,
	beamFrom,
	beamTo,
}: {
	icon: ReactNode;
	title: string;
	desc: string;
	beamFrom: string;
	beamTo: string;
}) {
	return (
		<div className='relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>
			<BorderBeam
				size={96}
				duration={8}
				delay={0}
				anchor={84}
				borderWidth={1.1}
				colorFrom={beamFrom}
				colorTo={beamTo}
				className='opacity-90'
			/>
			<div className='relative z-10 flex gap-4'>
				<div className='mt-1 text-indigo-400'>{icon}</div>
				<div>
				<div className='text-white font-medium'>{title}</div>
				<div className='text-sm text-neutral-400'>{desc}</div>
				</div>
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

