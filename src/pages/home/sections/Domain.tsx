import Container from "../../../components/ui/Container"
import { domains } from "../../../utils/data"

export default function Domains() {
  return (
    <section className="py-10 bg-neutral-950">
      <Container>

        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <h2 className="text-4xl font-semibold text-white">
            What you can learn
          </h2>
          <p className="mt-3 text-neutral-400">
            Structured learning paths built and maintained by the
            OpenCourse community.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d) => (
            <div
              key={d.name}
              tabIndex={0}
              className="
                group relative overflow-hidden
                rounded-xl
                border border-white/10
                bg-white/[0.03]
                p-6
                transition-all duration-300
                hover:-translate-y-[2px]
                hover:border-white/20
                hover:bg-white/[0.05]
                hover:shadow-xl hover:shadow-indigo-500/10
                focus-visible:outline-none
                focus-visible:ring-1 focus-visible:ring-white/30
              "
            >
              {/* Glow line */}
              <div
                className="
                  absolute top-0 left-1/2
                  h-px w-1/2
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-indigo-400
                  to-transparent
                  opacity-0
                  group-hover:opacity-100
                  transition
                "
              />

              {/* Title + Icon */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg opacity-80">
                  {d.icon}
                </span>
                <h3 className="text-lg font-medium text-white">
                  {d.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-white/60 leading-relaxed">
                Community-driven curriculum with real-world examples,
                interview prep, and continuous updates.
              </p>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                <span>{d.contributors} contributors</span>
                <span className="text-indigo-400/80">
                  Explore →
                </span>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  )
}
