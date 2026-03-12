import { useState } from "react";
import GlowCard from "../../../components/ui/GlowCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

function Section({ title, children }: any) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className="space-y-4"
		>
			<h3 className="text-lg font-semibold text-white flex items-center gap-2">
				<Sparkles className="h-5 w-5 text-indigo-400" />
				{title}
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{children}
			</div>
		</motion.div>
	);
}

export default function TopicFlow({ domains, onConfirm }: any) {
	const [domain, setDomain] = useState<any>(null);
	const [subtopic, setSubtopic] = useState<any>(null);
	const [mini, setMini] = useState<any>(null);

	return (
		<div className='space-y-10'>
			{/* DOMAIN */}
			<Section title='Select a Domain'>
				{domains.map((d: any) => (
					<GlowCard
						key={d.id}
						selected={domain?.id === d.id}
						disabled={!!domain && domain.id !== d.id}
						onClick={() => {
							setDomain(d);
							setSubtopic(null);
							setMini(null);
						}}>
						<h3 className='text-white font-medium'>{d.title}</h3>
					</GlowCard>
				))}
			</Section>

			<AnimatePresence>
				{domain && (
					<Section title={`Inside ${domain.title}`}>
						{domain.subtopics.map((s: any) => (
							<GlowCard
								key={s.id}
								accent='emerald'
								selected={subtopic?.id === s.id}
								disabled={!!subtopic && subtopic.id !== s.id}
								onClick={() => {
									setSubtopic(s);
									setMini(null);
								}}>
								{s.title}
							</GlowCard>
						))}
					</Section>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{subtopic && (
					<Section title='Choose Focus Area'>
						{subtopic.miniTopics.map((m: any) => (
							<GlowCard
								key={m.id}
								accent='indigo'
								selected={mini?.id === m.id}
								disabled={!!mini && mini.id !== m.id}
								onClick={() => setMini(m)}>
								{m.title}
							</GlowCard>
						))}
					</Section>
				)}
			</AnimatePresence>

			{mini && (
				<div className='sticky bottom-6 z-20'>
					<GlowCard className='flex items-center justify-between'>
						<div>
							<p className='text-xs text-neutral-400'>Selected topic</p>
							<p className='text-sm text-white'>
								{domain.title} → {subtopic.title} →{" "}
								<span className='text-indigo-400'>{mini.title}</span>
							</p>
						</div>

						<button
							onClick={() => onConfirm({ domain, subtopic, miniTopic: mini })}
							className='rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white flex items-center gap-2 hover:bg-indigo-700 transition-colors'
						>
							Review videos
							<ChevronRight className="h-4 w-4" />
						</button>
					</GlowCard>
				</div>
			)}

			{mini && (
				<motion.button
					whileTap={{ scale: 0.97 }}
					onClick={() => onConfirm({ domain, subtopic, miniTopic: mini })}
					className='
            mt-8 w-full rounded-xl bg-indigo-600 px-6 py-3
            text-sm font-medium text-white flex items-center justify-center gap-2
            hover:bg-indigo-700 transition-colors
          '>
					Confirm & Continue
					<ChevronRight className="h-4 w-4" />
				</motion.button>
			)}
		</div>
	);
}
