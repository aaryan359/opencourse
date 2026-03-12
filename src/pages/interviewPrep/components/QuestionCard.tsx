"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Question } from "../InterviewPrep";

function getTagStyle(tag: string) {
	let hash = 0;
	for (let i = 0; i < tag.length; i++) {
		hash = tag.charCodeAt(i) + ((hash << 5) - hash);
	}

	const hue = Math.abs(hash) % 360;

	return {
		background: `hsla(${hue}, 70%, 55%, 0.15)`,
		color: `hsl(${hue}, 70%, 70%)`,
		border: `hsla(${hue}, 70%, 60%, 0.35)`,
	};
}

export default function QuestionCard({ question }: { question: Question }) {
	const [open, setOpen] = useState(false);

	return (
		<motion.div
			onClick={() => setOpen((o) => !o)}
			whileHover={{ y: -2 }}
			transition={{ duration: 0.2 }}
			className='
        cursor-pointer
        rounded-xl
        border border-white/[0.08]
        bg-white/[0.03]
        p-4
        transition-all duration-200
        hover:border-white/[0.15]
        hover:bg-white/[0.05]
      '>
			<div className='flex items-start justify-between gap-4'>
				<h3 className='text-[#EDEDEF] font-medium leading-snug'>{question.question}</h3>

				<ChevronDown
					size={16}
					className={`transition-transform duration-200 ${open ? "rotate-180 text-[#5E6AD2]" : "text-[#8A8F98]"}`}
				/>
			</div>

			<div className='mt-3 flex flex-wrap gap-2 text-xs'>
				{[question.skill, question.companyName, question.difficulty].map((tag) => {
					const style = getTagStyle(tag);

					return (
						<span
							key={tag}
							style={{
								backgroundColor: style.background,
								color: style.color,
								borderColor: style.border,
							}}
							className='
								rounded-lg
								border
								px-2.5 py-1
								font-medium
								capitalize
								backdrop-blur-sm
								'>
							{tag}
						</span>
					);
				})}
			</div>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className='overflow-hidden'
					>
						<div className='
							mt-4
							rounded-xl
							border border-white/[0.08]
							bg-[#0f0f12]
							py-3 px-4
							relative
						'>
							{/* Label */}
							<div className='mb-2 text-xs font-medium uppercase tracking-wider text-[#5E6AD2]'>Answer</div>

							{/* Answer text */}
							<p className='text-sm text-[#EDEDEF]/80 leading-relaxed'>{question.answer}</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
