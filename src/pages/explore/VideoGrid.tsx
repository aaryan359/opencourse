import VideoCard from "../../components/video/VideoCard";

export default function VideoGrid({ videos }: any) {
  if (!videos.length) {
    return (
      <p className="text-neutral-500 text-sm z-50">
        Select a topic to explore videos.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {videos.map((video: any) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
