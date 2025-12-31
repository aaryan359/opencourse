import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { ReactNode, MouseEvent, KeyboardEvent } from "react";

type GlowCardProps = {
	children: ReactNode;
	accent?: "indigo" | "emerald";
	className?: string;
    
	onClick?: () => void;
};

const ACCENT = {
	indigo: "99,102,241",
	emerald: "99,102,241",
};

export default function GlowCard({ children, accent = "indigo", className = "", onClick, }: GlowCardProps) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
		const rect = e.currentTarget.getBoundingClientRect();
		mouseX.set(e.clientX - rect.left);
		mouseY.set(e.clientY - rect.top);
	}
	function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
		if (!onClick) return;
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick();
		}
	}

	const mask = useMotionTemplate`
    radial-gradient(
      260px at ${mouseX}px ${mouseY}px,
      white,
      transparent
    )
  `;

	const rgb = ACCENT[accent];

	return (
		<div
			onMouseMove={handleMouseMove}
			onClick={onClick}
			onKeyDown={handleKeyDown}
			className={`
                group relative rounded-2xl
                border border-white/10
                bg-neutral-900/80
                backdrop-blur-sm
                overflow-hidden
                transition
                z-100
                ${className}
            `}>
			<motion.div
				className='pointer-events-none absolute inset-0'
				style={{
					maskImage: mask,
					WebkitMaskImage: mask,
				}}>
				<div
					className='absolute inset-0 rounded-2xl'
					style={{
						boxShadow: `
                      inset 0 0 0 0.7px rgba(${rgb}, 10),
                      0 0 24px rgba(${rgb}, .45)
                         `,
					}}
				/>
			</motion.div>

			<div
				className='pointer-events-none absolute inset-0 rounded-2xl'
				style={{
					boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.02)`,
				}}
			/>

			<div className='relative z-10 p-6'>{children}</div>
		</div>
	);
}
