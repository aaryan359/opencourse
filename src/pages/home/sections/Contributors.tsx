"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Container from "../../../components/ui/Container";
import { contributors } from "../../../utils/data";

export default function Contributors() {
  return (
    <section className="relative py-10 bg-neutral-950 overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

      <Container>
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 "
        >
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-indigo-300 backdrop-blur">
            Community
          </span>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white">
            Contributors
          </h2>

          <p className="mt-4 text-neutral-400 leading-relaxed">
            OpenCourse is maintained by developers, educators, and students
            from around the world — ensuring content stays accurate,
            relevant, and production-ready.
          </p>
        </motion.div>

        {/* ===== GRID ===== */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {contributors.map((c, index) => (
            <ContributorCard key={c.name} contributor={c} index={index} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-sm text-neutral-500">
          Showing {contributors.length}+ active contributors · Updated regularly
        </div>
      </Container>
    </section>
  );
}

/* ================= CARD ================= */

function ContributorCard({ contributor, index }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useMotionTemplate`
    radial-gradient(
      200px at ${mouseX}px ${mouseY}px,
      rgba(99,102,241,0.18),
      transparent 70%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      className="
        group relative overflow-hidden rounded-xl
        border border-white/10
        bg-white/[0.035]
        backdrop-blur-xl
        p-4
        transition-all duration-300
        hover:-translate-y-1
        hover:border-white/20
      "
    >
      {/* Hover glow */}
      <motion.div
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Inner stroke */}
      <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="
            h-10 w-10 rounded-full
            bg-linear-to-br from-indigo-500/30 to-purple-500/20
            flex items-center justify-center
            text-sm font-semibold text-white
            ring-1 ring-white/10
          ">
            {contributor.name.charAt(0)}
          </div>

          {/* Name + Role */}
          <div className="leading-tight">
            <div className="text-sm font-medium text-white">
              {contributor.name}
            </div>
            <div className="text-xs text-neutral-400">
              {contributor.role}
            </div>
          </div>
        </div>

        {/* Status */}
        <span
          className="
            relative h-2.5 w-2.5 rounded-full
            bg-emerald-400
          "
          title="Active contributor"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400/60 blur-sm" />
        </span>
      </div>

      {/* Meta */}
      <div className="mt-3 text-xs text-neutral-500">
        Actively contributing
      </div>
    </motion.div>
  );
}
