import type { Video } from "@/types";

type VideoCardProps = {
  video: Video;
};

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000/api/v1";
const apiOrigin = (() => {
  try {
    return new URL(apiBase).origin;
  } catch {
    return "http://localhost:4000";
  }
})();

const resolveVideoUrl = (raw: string): string => {
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${apiOrigin}${raw.startsWith("/") ? raw : `/${raw}`}`;
};

const getYouTubeId = (url: string): string | null => {
  const match =
    url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^?&/]+)/i) ||
    null;
  return match?.[1] ?? null;
};

const getVimeoId = (url: string): string | null => {
  const match = url.match(/vimeo\.com\/(\d+)/i) || null;
  return match?.[1] ?? null;
};

const getDriveId = (url: string): string | null => {
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (fileMatch?.[1]) return fileMatch[1];

  const openMatch = url.match(/[?&]id=([^&]+)/i);
  return openMatch?.[1] ?? null;
};

const isDirectVideoFile = (url: string): boolean => {
  return /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(url);
};

const formatDuration = (duration?: number): string => {
  if (!duration || duration <= 0) return "--:--";
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export default function VideoCard({ video }: VideoCardProps) {
  const rawUrl = video.url || "";
  const resolvedUrl = resolveVideoUrl(rawUrl);

  const youtubeId = getYouTubeId(rawUrl);
  const vimeoId = getVimeoId(rawUrl);
  const driveId = getDriveId(rawUrl);

  const embedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : vimeoId
      ? `https://player.vimeo.com/video/${vimeoId}`
      : driveId
        ? `https://drive.google.com/file/d/${driveId}/preview`
        : null;

  const canUseNativePlayer =
    video.sourceType === "file" || isDirectVideoFile(resolvedUrl);

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10]">
      <div className="aspect-video w-full bg-black">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : canUseNativePlayer ? (
          <video
            className="h-full w-full"
            controls
            preload="metadata"
            src={resolvedUrl}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center">
            <div>
              <p className="text-sm text-zinc-200">Preview unavailable for this URL.</p>
              <a
                href={resolvedUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex rounded-md bg-indigo-500/20 px-3 py-1.5 text-xs font-medium text-indigo-300 hover:bg-indigo-500/30"
              >
                Open Video Link
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-base font-medium text-zinc-100">{video.title}</h3>

        {video.description && (
          <p className="line-clamp-2 text-sm text-zinc-400">{video.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">
            Duration: {formatDuration(video.duration)}
          </span>

          {typeof video.views === "number" && (
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">
              {video.views.toLocaleString()} views
            </span>
          )}

          {video.sourceType && (
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 capitalize">
              Source: {video.sourceType}
            </span>
          )}
        </div>

        <div className="pt-1">
          <a
            href={resolvedUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/10"
          >
            Open Original URL
          </a>
        </div>

        {video.tags && video.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {video.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
