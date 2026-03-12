import { useState } from "react"
import FlowHeader from "../components/FlowHeader"
import TopicFlow from "../components/TopicFlow"
import UploadStage from "../components/UploadStage"
import ReviewStage from "../components/ReviewStage"
import { mockContent } from "../../../utils/mockContent"
import { motion } from "framer-motion"
import { CheckCircle, Home, FileVideo } from "lucide-react"

export default function UploadVideo() {
  const [selection, setSelection] = useState<any>(null)
  const [stage, setStage] = useState<"select" | "upload" | "review" | "success">("select")

  return (
    <section className="min-h-screen bg-neutral-950 py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-14">

        <FlowHeader stage={stage === "success" ? "upload" : stage} />

        {stage === "select" && (
          <TopicFlow
            domains={mockContent.tech}
            onConfirm={(data: any) => {
              setSelection(data)
              setStage("upload")
            }}
          />
        )}

        {stage === "upload" && (
          <UploadStage
            context={selection}
            onNext={() => setStage("review")}
          />
        )}

        {stage === "review" && (
          <ReviewStage
            miniTopic={selection.miniTopic}
          />
        )}

        {stage === "review" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 justify-center pt-8 border-t border-white/10"
          >
            <button
              onClick={() => setStage("upload")}
              className="px-6 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 transition-colors font-medium"
            >
              Back
            </button>
            <button
              onClick={() => setStage("success")}
              className="px-8 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
            >
              <FileVideo className="h-4 w-4" />
              Submit Video
            </button>
          </motion.div>
        )}

        {stage === "success" && (
          <SuccessStage selection={selection} />
        )}
      </div>
    </section>
  )
}

function SuccessStage({ selection }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="py-20"
    >
      <div className="max-w-2xl mx-auto text-center space-y-12">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/10 border-2 border-emerald-500/50 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-emerald-400" />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-4xl font-bold text-white">
            Upload Successful!
          </h2>
          <p className="text-lg text-neutral-400">
            Your video has been submitted for review
          </p>
        </motion.div>

        {/* Submission Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-md mx-auto space-y-3 p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
        >
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Domain:</span>
              <span className="font-semibold text-white">{selection.domain.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Category:</span>
              <span className="font-semibold text-white">{selection.subtopic.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Topic:</span>
              <span className="font-semibold text-white">{selection.miniTopic.title}</span>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto space-y-4"
        >
          <p className="text-sm text-neutral-400 font-medium">What happens next?</p>
          <div className="space-y-3">
            {[
              "Our team reviews your video for quality and content",
              "You'll receive an email notification when it's approved",
              "Once live, your video will be visible to all learners",
              "High-quality videos get featured and earn rewards"
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-left"
              >
                <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm text-neutral-300">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/explore"}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-medium flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Explore Courses
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/contribute"}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <FileVideo className="h-4 w-4" />
            Upload Another
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
