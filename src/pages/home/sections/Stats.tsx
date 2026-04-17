import { motion } from "framer-motion"
import Container from "../../../components/ui/Container"
import { stats } from "../../../utils/data"
import { Sparkles, TrendingUp, Users, BookOpen, GitBranch, Clock } from "lucide-react"

// Icons for each stat
const statIcons = [
  <Users key="users" className="w-5 h-5" />,
  <GitBranch key="contributors" className="w-5 h-5" />,
  <BookOpen key="courses" className="w-5 h-5" />,
  <Clock key="updated" className="w-5 h-5" />,
]

// Gradient colors for each stat
const statGradients = [
  "from-[#5E6AD2]/20 to-purple-500/10",
  "from-cyan-500/20 to-blue-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-amber-500/20 to-orange-500/10",
]

export default function Stats() {
  return (
    <section className="relative py-18 bg-[#050506] border-y border-white/[0.06] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5E6AD2]/[0.02] to-transparent" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1px] h-[1px] bg-white/20 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
              }}
              animate={{
                y: [null, '-20px', '-40px'],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <Container>
        {/* Header with enhanced typography */}
        <div className="relative mb-16 max-w-2xl">
          {/* Decorative badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#5E6AD2]" />
            <span className="text-xs font-mono tracking-widest text-[#8A8F98] uppercase">
              Platform Metrics
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
              Community-Powered
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#5E6AD2] via-indigo-400 to-[#5E6AD2] bg-[length:200%] bg-clip-text text-transparent">
              Growth Engine
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-[#8A8F98] leading-relaxed"
          >
            OpenCourse thrives through continuous contributions from our global community. 
            Every number represents a learning journey transformed.
          </motion.p>

          {/* Animated line under header */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gradient-to-r from-[#5E6AD2] via-indigo-400 to-transparent mt-6"
          />
        </div>

        {/* Stats grid with enhanced cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              {/* Main card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.06] p-8 transition-all duration-300 group-hover:border-white/[0.12] overflow-hidden"
                style={{
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.06),
                    0 2px 20px rgba(0,0,0,0.4),
                    0 0 40px rgba(0,0,0,0.2)
                  `,
                }}
              >
                {/* Mouse-tracking gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(94,106,210,0.1) 0%, transparent 70%)`,
                  }}
                />
                
                {/* Icon container */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${statGradients[i]} border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {statIcons[i]}
                </div>

                {/* Number with counter animation */}
                <div className="text-4xl font-semibold text-white mb-2">
                  <AnimatedCounter value={s.value} />
                </div>

                {/* Label */}
                <div className="text-sm text-[#8A8F98] group-hover:text-white/80 transition-colors duration-300 uppercase tracking-wider">
                  {s.label}
                </div>

                {/* Progress indicator (visual enhancement) */}
                <div className="mt-6 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${70 + i * 10}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      i === 0 ? "from-[#5E6AD2] to-purple-500" :
                      i === 1 ? "from-cyan-500 to-blue-500" :
                      i === 2 ? "from-emerald-500 to-teal-500" :
                      "from-amber-500 to-orange-500"
                    }`}
                  />
                </div>

                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-2 h-2">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 pt-12 border-t border-white/[0.06]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-[#5E6AD2]" />
                <h3 className="text-xl font-semibold text-white">Real-time Growth</h3>
              </div>
              <p className="text-[#8A8F98] leading-relaxed">
                These numbers update in real-time as our community grows. 
                Join thousands of learners and contributors shaping the future of education.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-br from-[#5E6AD2] to-[#6872D9] font-medium text-white hover:shadow-[0_0_0_1px_rgba(94,106,210,0.8),0_8px_24px_rgba(94,106,210,0.4)] transition-all duration-300 hover:-translate-y-1">
                Join Community
              </button>
              <button className="px-6 py-3 rounded-lg border border-white/[0.12] bg-white/[0.05] font-medium text-white hover:bg-white/[0.08] transition-all duration-300">
                View Live Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Background accent elements */}
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gradient-to-r from-[#5E6AD2]/10 to-purple-500/5 blur-[100px] translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/5 blur-[100px] -translate-y-1/2 translate-x-1/4" />
    </section>
  )
}

// Animated counter component
function AnimatedCounter({ value }: { value: string }) {
  // Extract numeric part and symbol
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const symbol = value.replace(/[0-9.]/g, '');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {numericValue.toLocaleString()}
        {symbol}
      </motion.span>
    </motion.div>
  )
}

// If you want to use mouse tracking in the cards, add this hook and update the card:
// const cardRef = useRef(null);
// const mousePosition = useMouseTracker(cardRef);
// Then update the gradient overlay style to:
// style={{
//   background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(94,106,210,0.1) 0%, transparent 70%)`,
// }}