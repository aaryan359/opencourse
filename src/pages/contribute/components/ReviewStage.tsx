import ExistingVideos from "../components/ExistingVideos"

export default function ReviewStage({ miniTopic }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">
        Review Existing Content
      </h3>

      <p className="text-sm text-neutral-400 max-w-xl">
        Make sure your contribution adds new value.
        High-quality, non-duplicate content gets promoted faster.
      </p>

      <ExistingVideos videos={miniTopic.videos} />
    </div>
  )
}
