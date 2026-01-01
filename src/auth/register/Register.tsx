"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, User, Code2, GraduationCap, ArrowRight, CheckCircle2, Linkedin } from "lucide-react";
import GlowCard from "../../components/ui/GlowCard";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";

// -----------------------------
// Register Component
// -----------------------------

export default function Register() {
	const [loading, setLoading] = useState(false);

	const [form, setForm] = useState({
		name: "",
		email: "",
		role: "developer",
		experience: "",
		expertise: "",
	});

	const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

	const submit = async () => {
		setLoading(true);
		await new Promise((r) => setTimeout(r, 1200));
		setLoading(false);
		alert("Registration submitted for review ");
	};

	return (
		<section className='min-h-screen bg-neutral-950 flex items-center'>
			<Container className='max-w-xl'>
				<GlowCard accent='indigo'>
					<div className='space-y-6'>
						{/* Header */}
						<header className='space-y-2'>
							<h1 className='text-3xl font-semibold text-white'>Become a Contributor</h1>
							<p className='text-neutral-400 text-sm'>
								Help keep courses up‑to‑date. We verify contributors lightly — enough to ensure
								quality, not friction.
							</p>
						</header>

						{/* OAuth */}
						<div className='grid grid-cols-2 gap-3'>
							<OAuthButton
								icon={<Mail />}
								label='Google'
							/>
							<OAuthButton
								icon={<Github />}
								label='GitHub'
							/>
						</div>

						<div className='flex items-center gap-3 text-neutral-500 text-xs'>
							<div className='h-px flex-1 bg-neutral-800' />
							or continue with details
							<div className='h-px flex-1 bg-neutral-800' />
						</div>

						{/* Form */}
						<AnimatePresence>
							<motion.div
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -12 }}
								transition={{ duration: 0.35 }}
								className='space-y-4'>
								<Input
									icon={<User />}
									placeholder='Full name'
									value={form.name}
									onChange={(e) => update("name", e.target.value)}
								/>
								<Input
									icon={<Mail />}
									placeholder='Email address'
									value={form.email}
									onChange={(e) => update("email", e.target.value)}
								/>

								<RoleSelector
									value={form.role}
									onChange={(v) => update("role", v)}
								/>

								<Input
									icon={<Github />}
									placeholder='Github Link'
									value={form.email}
									onChange={(e) => update("github", e.target.value)}
								/>

								<Input
									icon={<Linkedin size={20} />}
									placeholder='LinkedIn'
									value={form.email}
									onChange={(e) => update("linkedin", e.target.value)}
								/>

								<Input
									icon={<Code2 />}
									placeholder='Years of experience (e.g. 3+ years)'
									value={form.experience}
									onChange={(e) => update("experience", e.target.value)}
								/>
								<Input
									icon={<GraduationCap />}
									placeholder='Primary expertise (React, DSA, ML, etc.)'
									value={form.expertise}
									onChange={(e) => update("expertise", e.target.value)}
								/>

								<div className='rounded-lg bg-neutral-900 border border-neutral-800 p-3 text-xs text-neutral-400'>
									<CheckCircle2 className='inline w-4 h-4 text-emerald-400 mr-1' />
									Your profile is reviewed automatically & occasionally manually. Most
									contributors are approved instantly.
								</div>

								<Button
									loading={loading}
									className='w-full'
									onClick={submit}>
									Submit for Access
								</Button>
							</motion.div>
						</AnimatePresence>
					</div>
				</GlowCard>
			</Container>
		</section>
	);
}

// -----------------------------
// Small Components
// -----------------------------

function OAuthButton({ icon, label }: { icon: React.ReactNode; label: string }) {
	return (
		<motion.button
			whileHover={{ y: -1 }}
			whileTap={{ scale: 0.98 }}
			className='flex items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-200 hover:border-neutral-700'>
			{icon}
			{label}
		</motion.button>
	);
}

function Input({ icon, ...props }: any) {
	return (
		<div className='relative'>
			<span className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500'>{icon}</span>
			<input
				{...props}
				className='w-full rounded-lg bg-neutral-900 border border-neutral-800 pl-10 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40'
			/>
		</div>
	);
}

function RoleSelector({ value, onChange }: any) {
	return (
		<div className='grid grid-cols-2 gap-3'>
			{[
				{ id: "developer", label: "Developer" },
				{ id: "educator", label: "Educator" },
			].map((r) => (
				<motion.div
					key={r.id}
					onClick={() => onChange(r.id)}
					whileHover={{ y: -2 }}
					className={`cursor-pointer rounded-lg border p-3 text-sm transition ${
						value === r.id
							? "border-indigo-500 bg-indigo-500/10 text-white"
							: "border-neutral-800 bg-neutral-900 text-neutral-400"
					}`}>
					{r.label}
				</motion.div>
			))}
		</div>
	);
}
