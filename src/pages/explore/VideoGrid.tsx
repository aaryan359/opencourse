import VideoCard from "../../components/video/VideoCard";

export default function VideoGrid({ videos }: any) {
  if (!videos.length) {
    return (
      <div className="h-full flex items-center justify-center text-neutral-500 text-sm">
        Select a topic to start learning 
      </div>
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