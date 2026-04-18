import { useRef, type CSSProperties, type ReactNode } from "react";

type GlowColor = "blue" | "purple" | "green" | "red" | "orange" | "neutral";
type GlowSize = "sm" | "md" | "lg";

interface GlowCardProps {
	children?: ReactNode;
	className?: string;
	glowColor?: GlowColor;
	size?: GlowSize;
	width?: string | number;
	height?: string | number;
	customSize?: boolean;
}

const glowColorMap: Record<GlowColor, string> = {
	blue: "59 130 246",
	purple: "168 85 247",
	green: "34 197 94",
	red: "239 68 68",
	orange: "249 115 22",
	neutral: "255 255 255",
};

const sizeMap: Record<GlowSize, string> = {
	sm: "w-48 h-64",
	md: "w-64 h-80",
	lg: "w-80 h-96",
};

export function GlowCard({
	children,
	className = "",
	glowColor = "neutral",
	size = "md",
	width,
	height,
	customSize = false,
}: GlowCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	const glowRgb = glowColorMap[glowColor];
	const sizeClasses = customSize ? "" : sizeMap[size];

	const styles: CSSProperties & Record<string, string | number> = {
		"--mx": "50%",
		"--my": "50%",
		position: "relative",
		overflow: "hidden",
		isolation: "isolate",
		touchAction: "none",
	};

	if (width !== undefined) styles.width = typeof width === "number" ? `${width}px` : width;
	if (height !== undefined) styles.height = typeof height === "number" ? `${height}px` : height;

	const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		cardRef.current.style.setProperty("--mx", `${x}px`);
		cardRef.current.style.setProperty("--my", `${y}px`);
	};

	return (
		<div
			ref={cardRef}
			data-glow
			style={styles}
			onPointerMove={handlePointerMove}
			className={`group ${sizeClasses} rounded-2xl p-4 shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-xs ${className}`}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					background: `radial-gradient(180px circle at var(--mx) var(--my), rgba(${glowRgb} / 0.16), transparent 72%)`,
				}}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					// Border-only spotlight: bright edge follows cursor position.
					padding: "1px",
					background: `radial-gradient(170px circle at var(--mx) var(--my), rgba(${glowRgb} / 0.95), rgba(${glowRgb} / 0.45) 28%, transparent 70%)`,
					WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
					WebkitMaskComposite: "xor",
					maskComposite: "exclude",
				}}
			/>
			<div className="relative z-10">{children}</div>
		</div>
		);
}
