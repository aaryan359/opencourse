import { motion } from "framer-motion";
import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";

export default function CTA() {
  return (
    <section className="relative py-12 overflow-hidden">
      <Container>
        <div className="relative max-w-7xl w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] mx-auto rounded-3xl border border-white/10 bg-[#0A0B0E]/90 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,106,210,0.2),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(34,211,238,0.08),transparent_35%,rgba(99,102,241,0.08)_70%,transparent)]" />

          <motion.div
            aria-hidden
            className="absolute -top-16 -left-10 w-64 h-64 rounded-full bg-[#5E6AD2]/20 blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-20 -right-12 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl"
            animate={{ x: [0, -16, 0], y: [0, -10, 0] }}
            transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <div className="relative z-10 px-6 md:px-10 py-10 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs tracking-[0.16em] uppercase text-neutral-300">Community Mission</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-semibold tracking-tight"
            >
              <span className="bg-linear-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                Knowledge should never be static.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed"
            >
              Help shape the future of open, community-driven learning with lessons, interview insights, and real-world expertise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button className="shadow-[0_0_50px_rgba(94,106,210,0.45)]">Join OpenCourse</Button>
              <Button variant="secondary">Contribute</Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
