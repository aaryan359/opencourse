import { useState } from "react"
import FlowHeader from "../components/FlowHeader"
import TopicFlow from "../components/TopicFlow"
import UploadStage from "../components/UploadStage"
import ReviewStage from "../components/ReviewStage"
import { motion } from "framer-motion"
import { CheckCircle, Home, FileVideo } from "lucide-react"
import { videosApi } from "../../../api/videos.api"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../../store/auth.store"
import { toast } from "react-toastify"

/* ──────────────────────────────────────────────
   Selection shape from TopicFlow
────────────────────────────────────────────── */
interface Selection {
  field: { _id: string; name: string; slug: string }
  course: { _id: string; title: string; slug: string }
  topic: { _id: string; title: string }
}

/* ──────────────────────────────────────────────
   Video form data from UploadStage
────────────────────────────────────────────── */
interface VideoFormData {
  title: string
  description: string
  url: string        // YouTube / external URL
}

export default function UploadVideo() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [selection, setSelection] = useState<Selection | null>(null)
  const [videoData, setVideoData] = useState<VideoFormData | null>(null)
  const [stage, setStage] = useState<"select" | "upload" | "review" | "success">("select")
  const [submitting, setSubmitting] = useState(false)
  const [submittedId, setSubmittedId] = useState<string | null>(null)

  // Require login to contribute
  if (!user) {
    return (
      <section className="min-h-screen bg-[#050506] flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-[#5E6AD2]/10 border border-[#5E6AD2]/30 flex items-center justify-center mx-auto">
            <FileVideo className="h-10 w-10 text-[#5E6AD2]" />
          </div>
          <h2 className="text-2xl font-bold text-[#EDEDEF]">Sign in to Contribute</h2>
          <p className="text-[#8A8F98]">You need an account to upload videos. It's free and takes under a minute.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => navigate("/login")} className="px-6 py-3 rounded-xl bg-[#5E6AD2] text-white font-medium hover:bg-[#5E6AD2]/90 transition-colors">
              Sign In
            </button>
            <button onClick={() => navigate("/register")} className="px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] transition-colors">
              Create Account
            </button>
          </div>
        </div>
      </section>
    )
  }

  const handleSubmit = async () => {
    if (!selection || !videoData) return
    setSubmitting(true)
    try {
      const res = await videosApi.upload(selection.topic._id, {
        title: videoData.title,
        description: videoData.description,
        url: videoData.url,
      })
      setSubmittedId(res.data.data._id)
      setStage("success")
      toast.success("Video submitted for review!")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#050506] py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-14">

        <FlowHeader stage={stage === "success" ? "upload" : stage} />

        {stage === "select" && (
          <TopicFlow
            onConfirm={(data) => {
              setSelection(data as Selection)
              setStage("upload")
            }}
          />
        )}

        {stage === "upload" && selection && (
          <UploadStage
            context={{
              // Shape UploadStage expects
              domain: { title: selection.field.name },
              subtopic: { title: selection.course.title },
              miniTopic: { title: selection.topic.title },
              topicId: selection.topic._id,
            }}
            onNext={(formData: VideoFormData) => {
              setVideoData(formData)
              setStage("review")
            }}
          />
        )}

        {stage === "review" && selection && (
          <ReviewStage
            miniTopic={{ title: selection.topic.title }}
          />
        )}

        {stage === "review" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 justify-center pt-8 border-t border-white/[0.08]"
          >
            <button
              onClick={() => setStage("upload")}
              className="px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-[#EDEDEF] hover:bg-white/[0.08] transition-colors font-medium"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 rounded-xl bg-[#5E6AD2] text-white hover:bg-[#5E6AD2]/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
            >
              {submitting ? (
                <><span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />Submitting...</>
              ) : (
                <><FileVideo className="h-4 w-4" />Submit Video</>
              )}
            </button>
          </motion.div>
        )}

        {stage === "success" && selection && (
          <SuccessStage selection={selection} videoId={submittedId} />
        )}
      </div>
    </section>
  )
}

function SuccessStage({ selection, videoId }: { selection: Selection; videoId: string | null }) {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="py-20"
    >
      <div className="max-w-2xl mx-auto text-center space-y-12">
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

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-3">
          <h2 className="text-4xl font-bold text-white">Upload Successful!</h2>
          <p className="text-lg text-neutral-400">Your video is pending review and will go live once approved.</p>
          {videoId && <p className="text-xs text-neutral-500">Submission ID: <span className="font-mono text-neutral-400">{videoId}</span></p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-md mx-auto space-y-3 p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="space-y-3 text-left">
            <Detail label="Domain" value={selection.field.name} />
            <Detail label="Course" value={selection.course.title} />
            <Detail label="Topic" value={selection.topic.title} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="max-w-md mx-auto space-y-4">
          <p className="text-sm text-neutral-400 font-medium">What happens next?</p>
          <div className="space-y-3">
            {[
              "Our team reviews your video for quality and content",
              "You'll be notified when it's approved",
              "Once live, your video is visible to all learners",
              "High-quality videos get featured"
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/10 text-left"
              >
                <div className="h-6 w-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-semibold flex-shrink-0">{i + 1}</div>
                <p className="text-sm text-neutral-300">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/courses")}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-medium flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" /> Go to Courses
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/contribute")}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <FileVideo className="h-4 w-4" /> Upload Another
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-neutral-400">{label}:</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  )
}
