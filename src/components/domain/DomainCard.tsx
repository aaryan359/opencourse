"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function DomainCard({ domain }: any) {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useMotionTemplate`
    radial-gradient(
      280px at ${mouseX}px ${mouseY}px,
      rgba(85, 37, 196, 0.35),
      transparent 70%
    )
  `;

  return (
    <motion.div
      onClick={() => navigate(domain.href)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      whileHover={{ y: -4 }}
      className="cursor-pointer group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/20 backdrop-blur-xl p-6"
    >
      <motion.div
        style={{ background: glow }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
      />

      <div className="relative z-10 flex flex-col h-full">
        <span className="inline-flex w-fit rounded-md bg-purple-700/20 px-3 py-1 text-sm text-purple-200">
          {domain.name}
        </span>

        <p className="mt-4 text-sm text-neutral-300">
          Curated learning paths with hands-on depth and real-world focus.
        </p>

        <div className="mt-auto flex justify-between text-xs text-neutral-400">
          <span>{domain.contributors}+ contributors</span>
          <span className="text-indigo-400">Explore →</span>
        </div>
      </div>
    </motion.div>
  );
}
