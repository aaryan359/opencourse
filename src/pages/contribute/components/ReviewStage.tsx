import ExistingVideos from "../components/ExistingVideos"
import GlowCard from "../../../components/ui/GlowCard"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle, Lightbulb } from "lucide-react"

export default function ReviewStage({ miniTopic }: any) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">
          Review Existing Content
        </h2>
        <p className="text-neutral-400 text-lg">
          Make sure your contribution adds new value. Check what's already available.
        </p>
      </div>

      {/* Alert Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/5 p-6 flex gap-4"
      >
        <AlertCircle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-amber-400 mb-1">
            Best Practices
          </h3>
          <p className="text-sm text-neutral-300">
            While reviewing, note the styles, techniques, and topics covered. Your content should either be 
            <span className="font-medium"> more comprehensive</span>, 
            <span className="font-medium"> unique in approach</span>, or 
            <span className="font-medium"> fill a knowledge gap</span>.
          </p>
        </div>
      </motion.div>

      {/* Existing Videos */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ExistingVideos videos={miniTopic.videos} />
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlowCard className="border-emerald-500/20 bg-emerald-500/5">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold text-emerald-400">
                How to Make Your Content Stand Out
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-medium text-white text-sm">Unique Angle</span>
                </div>
                <p className="text-xs text-neutral-400 ml-4">
                  Offer a different perspective or approach than existing videos
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-medium text-white text-sm">Advanced Topics</span>
                </div>
                <p className="text-xs text-neutral-400 ml-4">
                  Go deeper or cover advanced aspects not yet available
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="font-medium text-white text-sm">Better Quality</span>
                </div>
                <p className="text-xs text-neutral-400 ml-4">
                  High production value and clear explanation
                </p>
              </div>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Content Analysis */}
      {miniTopic.videos && miniTopic.videos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            Content Insights
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                Total Videos
              </p>
              <p className="text-2xl font-bold text-white">
                {miniTopic.videos.length}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                Avg Duration
              </p>
              <p className="text-2xl font-bold text-emerald-400">
                {(
                  miniTopic.videos.reduce((sum: number, v: any) => {
                    const parts = v.duration.split(":")
                    return sum + (parseInt(parts[0]) * 60 + parseInt(parts[1]))
                  }, 0) / miniTopic.videos.length / 60
                ).toFixed(0)} min
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                Avg Rating
              </p>
              <p className="text-2xl font-bold text-amber-400">
                {(
                  miniTopic.videos.reduce((sum: number, v: any) => sum + v.rating, 0) /
                  miniTopic.videos.length
                ).toFixed(1)} ★
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Submission Requirement Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-4 rounded-lg bg-white/[0.02] border border-white/10 text-sm text-neutral-400"
      >
        <p>
          Ready to upload? Your video will undergo quality review before being published. 
          High-quality submissions get featured and earn rewards!
        </p>
      </motion.div>
    </div>
  )
}
