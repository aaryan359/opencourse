export type ContributionType = "video" | "course" | "interview"

export type MiniTopic = {
  id: string
  title: string
  videos?: any[]
}

export type Subtopic = {
  id: string
  title: string
  miniTopics: MiniTopic[]
}

export type Topic = {
  id: string
  title: string
  subtopics: Subtopic[]
}

export type DomainContent = {
  tech: Topic[]
  nonTech: Topic[]
}
