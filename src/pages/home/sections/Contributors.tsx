import { motion } from "framer-motion"
import Container from "../../../components/ui/Container"
import { contributors } from "../../../utils/data"

export default function Contributors() {
  return (
    <section className="py-10 bg-neutral-950">
      <Container>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-10 max-w-3xl"
        >
          <h2 className="text-4xl font-semibold text-white">
            Contributors
          </h2>
          <p className="mt-3 text-neutral-400 leading-relaxed">
            OpenCourse is actively maintained by developers, educators,
            and students from the community. Every contributor helps
            keep content accurate, relevant, and up to date.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {contributors.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.03,
                ease: "easeOut",
              }}
              className="
                group
                rounded-lg
                border border-white/10
                bg-neutral-900
                px-4 py-3
                transition
                hover:border-white/20
                hover:bg-neutral-900/80
              "
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="
                      h-9 w-9
                      rounded-full
                      bg-neutral-800
                      flex items-center justify-center
                      text-xs font-semibold text-white
                    "
                  >
                    {c.name.charAt(0)}
                  </div>

                  {/* Name + Role */}
                  <div className="leading-tight">
                    <div className="text-sm font-medium text-white">
                      {c.name}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {c.role}
                    </div>
                  </div>
                </div>

                {/* Status dot */}
                <span
                  className="
                    h-2 w-2
                    rounded-full
                    bg-emerald-500
                  "
                  title="Active contributor"
                />
              </div>

              {/* Meta */}
              <div className="mt-3 text-xs text-neutral-500">
                Actively contributing
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer hint (important for scale) */}
        <div className="mt-10 text-sm text-neutral-500">
          Showing {contributors.length}+ contributors · Updated regularly
        </div>
      </Container>
    </section>
  )
}
