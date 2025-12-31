import { motion } from "framer-motion"

const steps = ["Choose Topic", "Upload Video", "Review"]

export default function FlowHeader({ stage }: any) {
  const activeIndex =
    stage === "select" ? 0 : stage === "upload" ? 1 : 2

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-semibold text-white">
        Contribute a Video
      </h1>

      <div className="flex gap-6">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <motion.div
              animate={{
                backgroundColor:
                  i <= activeIndex ? "rgba(99,102,241,.9)" : "rgba(255,255,255,.1)",
              }}
              className="h-2 w-10 rounded-full"
            />
            <span
              className={`text-xs ${
                i <= activeIndex ? "text-white" : "text-neutral-500"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
