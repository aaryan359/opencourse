import GlowCard from "../../../components/ui/GlowCard"
import { motion } from "framer-motion"

export default function UploadStage({ context, onNext }: any) {
  return (
    <div className="grid lg:grid-cols-3 gap-10">

      {/* CONTEXT */}
      <GlowCard className="lg:col-span-1">
        <p className="text-xs text-neutral-400">Uploading to</p>
        <h3 className="text-white font-medium mt-1">
          {context.domain.title} → {context.subtopic.title}
        </h3>
        <p className="text-indigo-400 text-sm mt-2">
          {context.miniTopic.title}
        </p>
      </GlowCard>

      {/* DROPZONE */}
      <GlowCard className="lg:col-span-2">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="
            flex h-64 flex-col items-center justify-center
            rounded-xl border border-dashed border-white/20
            text-neutral-400
          "
        >
          <p className="text-sm">Drag & drop your video</p>
          <span className="text-xs mt-1">or click to browse</span>
        </motion.div>

        <button
          onClick={onNext}
          className="
            mt-6 w-full rounded-xl bg-emerald-500
            py-3 text-sm font-medium text-black
          "
        >
          Upload & Continue
        </button>
      </GlowCard>
    </div>
  )
}
