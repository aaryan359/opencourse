import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...(props as any)}
      disabled={isDisabled}
      className={clsx(
        "relative group overflow-hidden inline-flex items-center justify-center gap-2",
        "font-semibold rounded-xl",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E6AD2]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050506]",

        // Sizes
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",

        // Variants
        variant === "primary" && [
          "bg-[#5E6AD2] text-white",
          "shadow-[0_4px_20px_rgba(94,106,210,0.35)]",
          !isDisabled && "hover:bg-[#6872D9] hover:shadow-[0_8px_30px_rgba(94,106,210,0.45)] active:scale-95",
        ],

        variant === "secondary" && [
          "bg-white/[0.05] text-[#EDEDEF]",
          "border border-white/[0.08]",
          !isDisabled && "hover:bg-white/[0.08] hover:border-white/[0.15]",
        ],

        variant === "ghost" && [
          "bg-transparent text-[#8A8F98]",
          !isDisabled && "hover:bg-white/[0.05] hover:text-white",
        ],

        variant === "danger" && [
          "bg-rose-500/10 text-rose-400",
          "border border-rose-500/20",
          !isDisabled && "hover:bg-rose-500/20 hover:border-rose-500/30",
        ],

        // Disabled state
        isDisabled && "opacity-60 cursor-not-allowed",

        className
      )}
    >
      {/* Shine effect for primary variant */}
      {variant === "primary" && !isDisabled && (
        <span
          aria-hidden
          className={clsx(
            "pointer-events-none absolute inset-0",
            "translate-x-[-100%] group-hover:translate-x-[100%]",
            "transition-transform duration-700 ease-out",
            "bg-gradient-to-r from-transparent via-white/20 to-transparent"
          )}
        />
      )}

      {/* Loading spinner */}
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
