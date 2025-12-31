import { motion } from "framer-motion"
import Container from "../../../components/ui/Container"
import Button from "../../../components/ui/Button"

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      
      {/* ===== BACKGROUND LAYERS ===== */}
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-500/30 blur-[120px]"
        animate={{ x: [0, 40, -20], y: [0, 20, -10] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
      />

      <motion.div
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-400/20 blur-[140px]"
        animate={{ x: [0, -30, 20], y: [0, -20, 10] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ===== CONTENT ===== */}
      <Container>
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center min-h-screen py-32">

          {/* ===== LEFT CONTENT ===== */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-[1.05]">
              <span className="block">OPEN COURSE.</span>
              <span className="block text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400">
                   Built by people.
              </span>
            </h1>

            <p className="mt-8 text-xl text-neutral-400 max-w-xl leading-[1.5] ">
              OpenCourse is a living knowledge platform where developers,
              educators, and learners continuously build and evolve
              courses, interview prep, and real-world skills.
            </p>

            {/* CTA */}
            <div className="mt-12 flex gap-5">
              <Button className="shadow-[0_0_60px_rgba(99,102,241,0.45)]">
                Explore Courses
              </Button>

              <Button variant="secondary">
                Become a Contributor
              </Button>
            </div>

            {/* Trust / signal */}
            <div className="mt-10 text-sm text-neutral-400">
              Trusted by <span className="text-white font-medium">7,000+</span> learners · Updated weekly
            </div>
          </motion.div>

          {/* ===== RIGHT VISUAL SYSTEM ===== */}
          <div className="relative hidden lg:block">

            {/* Floating cards */}
            <motion.div
              className="absolute top-0 left-0 w-70 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-sm text-neutral-400">Latest Update</div>
              <div className="mt-2 text-lg font-semibold">
                New DevOps Interview Pack
              </div>
            </motion.div>

            <motion.div
              className="absolute top-40 right-0 w-72 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-sm text-neutral-400">Contributor</div>
              <div className="mt-2 font-semibold">Aryan Meena</div>
              <div className="text-sm text-neutral-400">Web • DevOps</div>
            </motion.div>

            <motion.div
              className="absolute bottom-5 left-24 w-70 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-sm text-neutral-400">
                Community Activity
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm">3 new lessons added today</span>
              </div>
            </motion.div>

          </div>
        </div>
      </Container>
    </section>
  )
}
