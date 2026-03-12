import { motion } from "framer-motion"

const steps = ["Choose Topic", "Upload Video", "Review", "Finish"]

export default function FlowHeader({ stage }: any) {
  const activeIndex =
    stage === "select" ? 0 : stage === "upload" ? 1 : stage === "review" ? 2 : 3

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Contribute a Video
        </h1>
        <p className="text-neutral-400 text-lg">
          Share your knowledge with thousands of learners
        </p>
      </motion.div>

      <div className="flex gap-4 items-center">
        {steps.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 flex-1"
          >
            <motion.div
              animate={{
                backgroundColor:
                  i <= activeIndex
                    ? "rgba(99,102,241,.9)"
                    : "rgba(255,255,255,.1)",
              }}
              className="h-1.5 flex-1 rounded-full"
            />
            {i < steps.length - 1 && (
              <motion.div
                animate={{
                  backgroundColor:
                    i < activeIndex
                      ? "rgba(99,102,241,.9)"
                      : "rgba(255,255,255,.1)",
                }}
                className="h-1 w-8 rounded-full"
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex gap-6 overflow-x-auto pb-2">
        {steps.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              i <= activeIndex
                ? "bg-indigo-500/20 text-indigo-300"
                : "bg-white/5 text-neutral-500"
            }`}
          >
            <span className="text-xs font-semibold">{i + 1}</span>
            <span className="text-sm">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
