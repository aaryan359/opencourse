export default function SectionBlock({
  title,
  categories,
  courses,
  accent,
}: {
  title: string
  categories: any[]
  courses: any[]
  accent: "indigo" | "emerald"
}) {
  return (
    <div className="mb-28">
      {/* Section header with divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className={`h-8 w-1 bg-${accent}-400 rounded-full`} />
        <h2 className="text-3xl font-semibold text-white">
          {title}
        </h2>
      </div>

      {/* Categories */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {categories.map((c) => (
          <div
            key={c.name}
            className="
              rounded-xl
              border border-white/10
              bg-neutral-900
              p-6
              transition
              hover:border-white/20
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-medium text-white">
                  {c.name}
                </div>
                <div className="mt-1 text-sm text-neutral-400">
                  {c.count} courses
                </div>
              </div>

              {/* Accent badge */}
              <span className={`text-xs text-${accent}-400 font-medium`}>
                View →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Courses */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <div
            key={c.title}
            className="
              rounded-xl
              border border-white/10
              bg-neutral-900
              p-6
              transition
              hover:border-white/20
            "
          >
            <h3 className="text-lg font-medium text-white">
              {c.title}
            </h3>

            {/* Metadata row */}
            <div className="mt-4 flex items-center gap-4 text-sm text-neutral-400">
              <span className="px-2 py-1 bg-white/5 rounded-md">
                {c.level}
              </span>
              <span>{c.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


