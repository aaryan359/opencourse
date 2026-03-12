"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
	children,
	containerClassName,
	className,
	as: Tag = "button",
	duration = 1,
	clockwise = true,
	...props
}: React.PropsWithChildren<
	{
		as?: React.ElementType;
		containerClassName?: string;
		className?: string;
		duration?: number;
		clockwise?: boolean;
	} & React.HTMLAttributes<HTMLElement>
>) {                     
	const [direction, setDirection] = useState<Direction>("TOP");

	const rotateDirection = (current: Direction): Direction => {
		const dirs: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
		const i = dirs.indexOf(current);
		return clockwise ? dirs[(i - 1 + dirs.length) % dirs.length] : dirs[(i + 1) % dirs.length];
	};

	const movingMap: Record<Direction, string> = {
		TOP: `
      radial-gradient(28% 75% at 50% 0%,
        rgba(200,210,255,1) 0%,
        rgba(150,165,255,0.95) 8%,
        rgba(94,106,210,0.85) 16%,
        rgba(94,106,210,0.45) 30%,
        rgba(94,106,210,0.18) 48%,
        rgba(94,106,210,0.08) 65%,
        transparent 82%)
    `,
		LEFT: `
      radial-gradient(28% 75% at 0% 50%,
        rgba(200,210,255,1) 0%,
        rgba(150,165,255,0.95) 8%,
        rgba(94,106,210,0.85) 16%,
        rgba(94,106,210,0.45) 30%,
        rgba(94,106,210,0.18) 48%,
        rgba(94,106,210,0.08) 65%,
        transparent 82%)
    `,
		BOTTOM: `
      radial-gradient(28% 75% at 50% 100%,
        rgba(200,210,255,1) 0%,
        rgba(150,165,255,0.95) 8%,
        rgba(94,106,210,0.85) 16%,
        rgba(94,106,210,0.45) 30%,
        rgba(94,106,210,0.18) 48%,
        rgba(94,106,210,0.08) 65%,
        transparent 82%)
    `,
		RIGHT: `
      radial-gradient(28% 75% at 100% 50%,
        rgba(200,210,255,1) 0%,
        rgba(150,165,255,0.95) 8%,
        rgba(94,106,210,0.85) 16%,
        rgba(94,106,210,0.45) 30%,
        rgba(94,106,210,0.18) 48%,
        rgba(94,106,210,0.08) 65%,
        transparent 82%)
    `,
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setDirection((prev) => rotateDirection(prev));
		}, duration * 1000);

		return () => clearInterval(interval);
	}, [duration]);

	return (
		<Tag
			className={cn("relative flex rounded-full p-px w-fit overflow-visible", containerClassName)}
			{...props}>
			{/* inner surface */}
			<div
				className={cn(
					"relative z-10 rounded-[inherit] px-3 py-2",
					"bg-[#050506]/90 backdrop-blur-xl",
					"border border-white/[0.06]",
					"text-[#EDEDEF]",
					"shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_6px_28px_rgba(0,0,0,0.7),0_0_60px_rgba(94,106,210,0.18)]",
					className
				)}>
				{/* inner top highlight */}
				<span className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent' />
				{children}
			</div>

			{/* sharp beam */}
			<motion.div
				className='absolute inset-0 rounded-full z-0'
				style={{ filter: "blur(1px)" }}
				initial={{ background: movingMap[direction] }}
				animate={{ background: movingMap[direction] }}
				transition={{ ease: "linear", duration }}
			/>

			{/* outer bloom */}
			<motion.div
				className='absolute -inset-6 rounded-full z-0 opacity-70'
				style={{ filter: "blur(30px)" }}
				initial={{ background: movingMap[direction] }}
				animate={{ background: movingMap[direction] }}
				transition={{ ease: "linear", duration }}
			/>

			{/* depth mask */}
			<div className='bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]' />
		</Tag>
	);
}
