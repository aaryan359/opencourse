import { motion } from "framer-motion"
import { motionTokens } from "../../lib/motion"


export default function FadeUp({ children, delay = 0 }:any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: motionTokens.medium,
        ease: motionTokens.ease as [],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
