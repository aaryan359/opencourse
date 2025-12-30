import { motion } from "framer-motion"
import Container from "../../../components/ui/Container"
import { stats } from "../../../utils/data"

export default function Stats() {
  return (
    <section className="py-28 bg-neutral-950 border-y border-white/5">
      <Container>
        {/* Header (adds context – very important) */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold text-white">
            Platform at a glance
          </h2>
          <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
            OpenCourse is growing through continuous contributions
            from the community.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              className="
                relative
                py-4
              "
            >
              {/* Number */}
              <div className="text-3xl font-semibold text-white">
                {s.value}
              </div>

              {/* Label */}
              <div className="mt-1 text-sm text-neutral-400">
                {s.label}
              </div>

              {/* Divider (visual rhythm) */}
              <div className="
                absolute
                left-0
                bottom-0
                h-px
                w-12
                bg-white/10
              " />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
