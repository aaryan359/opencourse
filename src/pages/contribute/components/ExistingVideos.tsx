import { useState } from "react"
import type { Video } from "../../../types/videos.types"
import VideoCard from "../../../components/video/VideoCard"

type ExistingVideosProps = {
  videos: Video[]
}

export default function ExistingVideos({ videos }: ExistingVideosProps) {
  const [open, setOpen] = useState(true)

  if (!videos.length) return null

  return (
    <section className="space-y-4">
      
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex w-full items-center justify-between
          text-left
        "
        aria-expanded={open}
      >
        <div>
          <h4 className="text-sm font-medium text-white">
            Existing videos
          </h4>
          <p className="text-xs text-neutral-400">
            Please review existing content before uploading
          </p>
        </div>

        <span className="text-xs text-neutral-400">
          {open ? "Hide" : `Show (${videos.length})`}
        </span>
      </button>

      {/* Content */}
      {open && (
        <div
          className="
            grid gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => {
                window.open(video.videoUrl, "_blank", "noopener,noreferrer")
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
