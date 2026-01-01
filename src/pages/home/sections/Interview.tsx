"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Container from "../../../components/ui/Container";

const interviewCategories = [
  {
    title: "Data Structures & Algorithms",
    description:
      "Frequently asked problems covering arrays, trees, graphs, and complexity.",
    count: 120,
  },
  {
    title: "System Design",
    description:
      "Design scalable systems, APIs, databases, and distributed architectures.",
    count: 45,
  },
  {
    title: "Backend & APIs",
    description:
      "REST, authentication, databases, and backend best practices.",
    count: 60,
  },
  {
    title: "Frontend",
    description:
      "JavaScript, React, performance, accessibility, and UI patterns.",
    count: 55,
  },
];

export default function Interview() {
  return (
    <section className="relative py-10 bg-neutral-950 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />

      <Container>
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 "
        >
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-indigo-300 backdrop-blur">
            Interview Prep
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Prepare with real,
            <span className="block text-neutral-400">
              industry-level questions
            </span>
          </h2>

          <p className="mt-4 text-neutral-400 leading-relaxed">
            Practice interview questions curated and reviewed by the
            OpenCourse community — continuously updated to reflect
            real hiring trends.
          </p>
        </motion.div>

        {/* ===== GRID ===== */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {interviewCategories.map((cat, index) => (
            <CategoryCard key={cat.title} category={cat} index={index} />
          ))}
        </div>

        {/* ===== CTA ===== */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            className="
              inline-flex items-center justify-center
              rounded-lg
              bg-white
              px-6 py-3
              text-sm font-medium text-black
              transition
              hover:bg-neutral-200
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-white/30
            "
          >
            Start Practicing
          </button>

          <button
            className="
              inline-flex items-center justify-center
              rounded-lg
              border border-white/15
              px-6 py-3
              text-sm font-medium text-white
              transition
              hover:border-white/25
              hover:bg-white/[0.05]
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-white/30
            "
          >
            Contribute Questions
          </button>
        </div>

        {/* Trust */}
        <div className="mt-6 text-sm text-neutral-500">
          Questions reviewed by community contributors · Updated weekly
        </div>
      </Container>
    </section>
  );
}

/* ================= CARD ================= */

function CategoryCard({ category, index }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useMotionTemplate`
    radial-gradient(
      220px at ${mouseX}px ${mouseY}px,
      rgba(99,102,241,0.18),
      transparent 70%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      className="
        group relative overflow-hidden rounded-2xl
        border border-white/10
        bg-white/[0.035]
        backdrop-blur-xl
        p-6
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
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Count badge */}
        <span className="inline-flex w-fit rounded-md bg-indigo-500/15 px-2.5 py-1 text-xs font-medium text-indigo-300">
          {category.count}+ questions
        </span>

        <h3 className="mt-4 text-lg font-medium text-white">
          {category.title}
        </h3>

        <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
          {category.description}
        </p>

        <div className="mt-auto pt-6 flex items-center justify-between text-sm">
          <span className="text-neutral-500">Updated regularly</span>
          <span className="flex items-center gap-1 text-indigo-400 transition group-hover:gap-2">
            Practice
            <span className="transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
