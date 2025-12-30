import clsx from "clsx"

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}:any) {
  return (
    <button
      {...props}
      className={clsx(
        "px-6 py-3 rounded-xl font-semibold transition-all duration-300",
        "active:scale-[0.97]",
        variant === "primary" &&
          "bg-white text-black hover:bg-neutral-200",
        variant === "secondary" &&
          "bg-neutral-800 text-white hover:bg-neutral-700",
        className
      )}
    >
      {children}
    </button>
  )
}
