"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function DomainCard({ domain }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Very subtle glass glow (not colorful)
  const glow = useMotionTemplate`
    radial-gradient(
      280px at ${mouseX}px ${mouseY}px,
      rgba(85, 37, 196, 0.359),
      transparent 70%
    )
  `;

  return (
    
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="
        group relative overflow-hidden rounded-2xl
        border border-white/10
        bg-neutral-900/20
        backdrop-blur-xl
        p-6
      "
    >
      {/* Glass glow */}
      <motion.div
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Dark vignette (THIS is key) */}
      <div className="
        pointer-events-none absolute inset-0
        bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]
      " />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Badge */}
        <span
          className="
            inline-flex w-fit items-center
            rounded-md
            bg-purple-700/20
            px-3 py-2
            text-sm font-medium
            text-purple-200
            backdrop-blur-md
          "
        >
          {domain.name}
        </span>

        {/* Description */}
        <p className="mt-4 text-sm leading-relaxed text-neutral-300">
          Curated learning paths with hands-on depth, real-world context,
          and continuous community refinement.
        </p>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between text-xs">
          <span className="text-neutral-500">
            {domain.contributors}+ contributors
          </span>

          <span className="
            flex items-center gap-1
            text-indigo-400
            transition group-hover:gap-2
          ">
            Explore
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>

      {/* Inner stroke */}
      <div className="
        pointer-events-none absolute inset-0 rounded-2xl
        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
      " />
    </motion.div>
  );
}
