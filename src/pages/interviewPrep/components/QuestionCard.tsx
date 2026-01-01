"use client";

import { useState } from "react";
import {  motion } from "framer-motion";
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
		<div
			onClick={() => setOpen((o) => !o)}
			className='
        cursor-pointer
        rounded-lg
        border border-white/10
        bg-neutral-950
        p-4
        transition
        hover:border-white/20
      '>
			<div className='flex items-start justify-between gap-4'>
				<h3 className='text-white font-medium leading-snug'>{question.question}</h3>

				<ChevronDown
					size={16}
					className={`transition ${open ? "rotate-180 text-indigo-400" : "text-neutral-400"}`}
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
								rounded-md
								border
								px-2 py-0.5
								font-medium
								capitalize
								backdrop-blur-sm
								'>
							{tag}
						</span>
					);
				})}
			</div>

			<div>
				{open && (
					<motion.div
						className='
							mt-4
							rounded-lg
							border border-white/10
							bg-neutral-900/70
							py-3 px-2
							relative
						'>
						{/* Label */}
						<div className='mb-2 text-xs font-medium uppercase tracking-wide text-indigo-300'>Answer</div>

						{/* Answer text */}
						<p className='text-sm text-neutral-200 leading-relaxed'>{question.answer}</p>
					</motion.div>
				)}
			</div>
		</div>
	);
}
