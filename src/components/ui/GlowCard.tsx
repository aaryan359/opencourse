import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { ReactNode, MouseEvent, KeyboardEvent } from "react";

type GlowCardProps = {
	children: ReactNode;
	accent?: "indigo" | "emerald" | "purple" | "cyan";
	className?: string;
	selected?: boolean;
	disabled?: boolean;
	onClick?: () => void;
};

const ACCENT = {
	indigo: "94,106,210",
	emerald: "16,185,129",
	purple: "139,92,246",
	cyan: "6,182,212",
};

export default function GlowCard({ 
	children, 
	accent = "indigo", 
	className = "", 
	selected = false,
	disabled = false,
	onClick 
}: GlowCardProps) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
		if (disabled) return;
		const rect = e.currentTarget.getBoundingClientRect();
		mouseX.set(e.clientX - rect.left);
		mouseY.set(e.clientY - rect.top);
	}

	function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
		if (!onClick || disabled) return;
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick();
		}
	}

	const mask = useMotionTemplate`
		radial-gradient(
			200px at ${mouseX}px ${mouseY}px,
			white,
			transparent
		)
	`;

	const rgb = ACCENT[accent];

	return (
		<motion.div
			onMouseMove={handleMouseMove}
			onClick={disabled ? undefined : onClick}
			onKeyDown={handleKeyDown}
			whileHover={!disabled ? { y: -2 } : undefined}
			whileTap={!disabled && onClick ? { scale: 0.98 } : undefined}
			tabIndex={onClick && !disabled ? 0 : undefined}
			role={onClick ? "button" : undefined}
			className={`
				group relative rounded-2xl
				border transition-all duration-300
				overflow-hidden cursor-pointer
				${selected 
					? `border-[rgb(${rgb})]/50 bg-[rgb(${rgb})]/10` 
					: disabled 
						? "border-white/[0.04] bg-white/[0.01] opacity-50 cursor-not-allowed" 
						: "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.05]"
				}
				${className}
			`}
			style={{
				boxShadow: selected 
					? `0 0 0 1px rgba(${rgb},0.3), 0 0 30px rgba(${rgb},0.15)` 
					: '0 0 0 1px rgba(255,255,255,0.04)',
			}}
		>
			{/* Mouse-tracking glow effect */}
			{!disabled && (
				<motion.div
					className='pointer-events-none absolute inset-0'
					style={{
						maskImage: mask,
						WebkitMaskImage: mask,
					}}
				>
					<div
						className='absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100'
						style={{
							boxShadow: `
								inset 0 0 0 1px rgba(${rgb}, 0.2),
								0 0 30px rgba(${rgb}, 0.3)
							`,
						}}
					/>
				</motion.div>
			)}

			{/* Top highlight */}
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

			{/* Content */}
			<div className='relative z-10 p-5'>{children}</div>

			{/* Selection indicator */}
			{selected && (
				<div 
					className="absolute top-3 right-3 w-2 h-2 rounded-full"
					style={{ backgroundColor: `rgb(${rgb})` }}
				/>
			)}
		</motion.div>
	);
}
