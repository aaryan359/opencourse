export type Video = {
    id: string
    title: string
    description: string
    thumbnail: string
    videoUrl: string
    duration: string
    rating: number
    views: number
    upvotes: number
    downvotes: number
    tags: string[]
    author?: string
}