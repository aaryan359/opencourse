import type { Video } from "@/types";

type VideoCardProps = {
  video: Video;
  onClick?: () => void;
};

export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <article
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Play video: ${video.title}`}
      className="
        group relative cursor-pointer overflow-hidden
        rounded-2xl
        border border-white/10 hover:border-white/20
        bg-white/[0.025]
        backdrop-blur
        transition-colors duration-200
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-indigo-500/40
      "
    >
      {/* ===== THUMBNAIL ===== */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient overlay (better depth than flat black) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="
              flex h-14 w-14 items-center justify-center
              rounded-full
              bg-black/60 group-hover:bg-black/80 backdrop-blur
              ring-1 ring-white/20
              shadow-lg
              transition-all duration-200
              group-hover:scale-110
            "
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration */}
        <div className="
          absolute bottom-2 right-2
          rounded-md bg-black/70
          px-2 py-0.5
          text-[11px] font-medium text-white
          backdrop-blur
        ">
          {video.duration}
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="
          text-sm font-medium text-white
          leading-snug
          line-clamp-2
        ">
          {video.title}
        </h3>

        {/* Views + Rating */}
        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span>{video.views.toLocaleString()} views</span>
          <span className="text-neutral-600">•</span>
          <span className="flex items-center gap-1">
            ⭐ {video.rating.toFixed(1)}
          </span>
        </div>

        {/* Footer meta (secondary info) */}
        <div className="
          flex items-center justify-between
          pt-2
          text-[11px] text-neutral-500
        ">
          {/* Tags */}
          <div className="flex gap-2">
            {video.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="
                  rounded-md
                  bg-white/5
                  px-2 py-0.5
                "
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Votes */}
          <div className="flex gap-3">
            <span>👍 {video.upvotes}</span>
            <span>👎 {video.downvotes}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
