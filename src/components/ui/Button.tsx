import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        // Base
        "relative group overflow-hidden",
        "px-6 py-3 rounded-xl font-semibold",
        "transition-all duration-300",
        "active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",

        // Variants
        variant === "primary" &&
          "bg-[#5E6AD2] text-white hover:bg-[#6872D9] shadow-[0_8px_30px_rgba(94,106,210,0.35)]",

        variant === "secondary" &&
          "bg-white/[0.06] text-[#EDEDEF] hover:bg-white/[0.10] border border-white/10",

        className
      )}
    >
      {/* ✨ SHINE EFFECT */}
      <span
        aria-hidden
        className={clsx(
          "pointer-events-none absolute inset-0",
          "translate-x-[-120%] group-hover:translate-x-[120%]",
          "transition-transform duration-700 ease-out",

          // Shine gradient per variant
          variant === "primary" &&
            "bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent",

          variant === "secondary" &&
            "bg-gradient-to-r from-transparent via-white/20 to-transparent"
        )}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
