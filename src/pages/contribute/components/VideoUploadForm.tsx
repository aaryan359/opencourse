import { motion } from "framer-motion"
import ExistingVideos from "./ExistingVideos"

export default function VideoUploadForm({ miniTopic }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 22 }}
      className="
        rounded-2xl border border-indigo-500/30
        bg-gradient-to-br from-white/[0.05] to-white/[0.02]
        p-6 space-y-6
      "
    >
      <header>
        <h3 className="text-xl font-semibold text-white">
          Upload for {miniTopic.title}
        </h3>
        <p className="text-sm text-neutral-400">
          Check existing videos before submitting.
        </p>
      </header>

      <ExistingVideos videos={miniTopic.videos} />

      <div className="space-y-4">
        <input
          placeholder="Video title"
          className="
            w-full rounded-xl bg-neutral-950 p-4 text-white
            ring-1 ring-white/10 focus:ring-indigo-500/40
          "
        />

        {/* Upload Area */}
        <label className="
          flex flex-col items-center justify-center
          rounded-xl border border-dashed border-white/20
          p-6 text-sm text-neutral-400
          hover:border-indigo-500/40
          cursor-pointer
        ">
          <span>Click to upload video</span>
          <input type="file" accept="video/*" className="hidden" />
        </label>

        <button className="
          w-full rounded-xl
          bg-indigo-500 py-3
          text-white font-medium
          hover:bg-indigo-400
          transition
        ">
          Submit for Review
        </button>
      </div>
    </motion.div>
  )
}
