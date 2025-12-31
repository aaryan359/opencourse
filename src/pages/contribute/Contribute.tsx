import Container from "../../components/ui/Container";
import ContributeSelectionCard from "./components/SelectionCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const techContributions = [
	{
		title: "Create / Improve Courses",
		description: "Design structured lessons, refine explanations, and keep content current.",
	},
	{
		title: "Upload Technical Videos",
		description: "Create walkthroughs, deep dives, and engineering-focused tutorials.",
	},
	{
		title: "Add Interview Questions",
		description: "Share DSA, system design, and role-based interview questions.",
	},
];

const nonTechContributions = [
	{
		title: "Career & Communication Courses",
		description: "Help learners with soft skills, leadership, and career growth.",
	},
	{
		title: "Productivity Content",
		description: "Share workflows, habits, and professional systems.",
	},
	{
		title: "Non-Tech Interview Prep",
		description: "HR, behavioral, and managerial interview preparation.",
	},
];

export default function Contribute() {
	const navigate = useNavigate();
	return (
		<section className='relative min-h-screen bg-neutral-950 py-20 overflow-hidden'>
			{/* FIXED BACKGROUND */}
			<div className='fixed inset-0 z-1 opacity-[0.8]'>
				{/* Subtle grid */}
				<motion.div
					className='absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-500/30 blur-[120px]'
					animate={{ x: [0, 40, -20], y: [0, 20, -10] }}
					transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
				/>

				<motion.div
					className='absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-400/20 blur-[140px]'
					animate={{ x: [0, -30, 20], y: [0, -20, 10] }}
					transition={{ duration: 14, repeat: Infinity, repeatType: "mirror" }}
				/>

				{/* Subtle grid overlay */}
				<div
					className='absolute inset-0 opacity-[0.06]'
					style={{
						backgroundImage:
							"linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
						backgroundSize: "48px 48px",
					}}
				/>
			</div>

			<Container>
				{/* HEADER */}
				<header className='max-w-4xl mb-10'>
					<h1 className='text-5xl font-semibold text-white tracking-tight'>Contribute to OpenCourse</h1>
					<p className='mt-6 text-lg text-neutral-400 leading-relaxed'>
						Choose how you want to contribute. Technical and non-technical paths are clearly separated for focus.
					</p>
				</header>

				{/* TECH */}
				<section className='mb-20'>
					<SectionTitle
						title='Tech Contributions'
						subtitle='Engineering & technical knowledge'
						accent='indigo'
					/>

					<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
						{techContributions.map((item) => (
							<ContributeSelectionCard
								key={item.title}
								{...item}
								accent='indigo'
								onClick={() => {
									if (item.title.includes("Video")) {
										navigate("/contribute/new?type=video");
									}
									if (item.title.includes("Interview")) {
										navigate("/contribute/new?type=interview");
									}
									if (item.title.includes("Course")) {
										navigate("/contribute/new?type=course");
									}
								}}
							/>
						))}
					</div>
				</section>

				{/* NON TECH */}
				<section>
					<SectionTitle
						title='Non-Tech Contributions'
						subtitle='Career, communication & productivity'
						accent='emerald'
					/>

					<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
						{nonTechContributions.map((item) => (
							<ContributeSelectionCard
								key={item.title}
								{...item}
								accent='emerald'
							/>
						))}
					</div>
				</section>
			</Container>
		</section>
   



	);
}

function SectionTitle({ title, subtitle, accent }: { title: string; subtitle: string; accent: "indigo" | "emerald" }) {
	return (
		<div className='mb-2'>
			<h2 className='text-3xl font-semibold text-white'>{title}</h2>
			<p className='mt-2 text-neutral-400'>{subtitle}</p>
			<div className={`mt-4 h-px w-24 bg-${accent}-400`} />
		</div>
	);
}
