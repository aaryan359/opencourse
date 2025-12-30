export type Domain = {
  slug: string
  name: string
  description: string
  contributors: number
  icon: string
}

export const domains: Domain[] = [
  {
    slug: "web-development",
    name: "Web Development",
    description:
      "Frontend, backend, performance, architecture, and modern tooling.",
    contributors: 18,
    icon: "🌐",
  },
  {
    slug: "ai-ml",
    name: "AI / ML",
    description:
      "Machine learning, deep learning, and applied AI systems.",
    contributors: 12,
    icon: "🤖",
  },
  {
    slug: "data-science",
    name: "Data Science",
    description:
      "Data analysis, statistics, visualization, and pipelines.",
    contributors: 9,
    icon: "📊",
  },
  {
    slug: "android",
    name: "Android",
    description:
      "Android apps, Kotlin, system APIs, and performance.",
    contributors: 7,
    icon: "📱",
  },
  {
    slug: "devops",
    name: "DevOps",
    description:
      "CI/CD, cloud, containers, monitoring, and infra.",
    contributors: 10,
    icon: "⚙️",
  },
]
