import { motion } from "framer-motion";
import { Rocket, MessageSquare, Shield, Globe, Headphones, TrendingUp, Heart, Zap, Users, BookOpen, Code, Target } from "lucide-react";
import Container from "../../components/ui/Container";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <div className={`group relative overflow-hidden rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-2 cursor-pointer ${gradient} border border-white/[0.08] hover:border-white/[0.12] bg-white/[0.02] backdrop-blur-sm`}>
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
          background: "radial-gradient(circle at top right, rgba(94,106,210,0.1), transparent 70%)",
        }} />

        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10 space-y-4">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:scale-110 group-hover:bg-white/[0.08] transition-all duration-300">
            <div className="text-[#5E6AD2] group-hover:text-white transition-colors">
              {icon}
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text transition-all">
              {title}
            </h3>
            <p className="text-[#8A8F98] text-sm leading-relaxed group-hover:text-white/80 transition-colors">
              {description}
            </p>
          </div>

          {/* Arrow indicator */}
          <div className="flex items-center gap-2 text-[#5E6AD2] text-sm font-medium pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
            Learn more
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ComponentType<any>; label: string; value: string }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-[#5E6AD2]" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-white">{value}</div>
          <div className="text-sm text-[#8A8F98]">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-[#050506] text-[#EDEDEF] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />
        
        {/* Animated gradient blobs */}
        <motion.div
          className="absolute -top-[40%] -left-[20%] w-[800px] h-[600px] rounded-full bg-gradient-to-br from-[#5E6AD2]/15 via-indigo-400/10 to-transparent blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[30%] -right-[10%] w-[600px] h-[400px] rounded-full bg-gradient-to-tl from-purple-500/15 via-pink-500/10 to-transparent blur-[100px]"
          animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-8 max-w-4xl mx-auto"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm group hover:border-white/[0.12] hover:bg-white/[0.05] transition-all"
              >
                <Heart className="w-4 h-4 text-[#5E6AD2]" />
                <span className="text-xs font-medium text-[#8A8F98] group-hover:text-white transition-colors">
                  About Open Course
                </span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                  Education Reimagined
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-[#8A8F98] leading-relaxed max-w-2xl mx-auto">
                Open Course is an open-source learning platform where knowledge is collaborative, living, and constantly evolving. Learn from the community, contribute your expertise, and grow together.
              </p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button className="px-8 py-4 rounded-xl bg-[#5E6AD2] text-white font-semibold hover:bg-[#6872D9] transition-all shadow-lg shadow-[#5E6AD2]/25 hover:shadow-xl hover:shadow-[#5E6AD2]/35 hover:-translate-y-1">
                  Start Learning Today
                </button>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Mission Section */}
        <section className="py-24 border-y border-white/[0.06]">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Left - Content */}
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <span className="text-sm font-medium text-[#5E6AD2] tracking-wide">OUR MISSION</span>
                  <h2 className="text-4xl md:text-5xl font-semibold mt-4">
                    <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                      Making Quality Education Accessible to Everyone
                    </span>
                  </h2>
                </motion.div>

                <motion.p variants={itemVariants} className="text-lg text-[#8A8F98] leading-relaxed">
                  We believe education should be:
                </motion.p>

                <motion.div variants={containerVariants} className="space-y-4">
                  {[
                    { icon: Globe, text: "Global - accessible from anywhere in the world" },
                    { icon: Users, text: "Collaborative - built and improved by the community" },
                    { icon: Zap, text: "Up-to-date - continuously evolving with industry changes" },
                    { icon: Target, text: "Practical - focusing on real-world, job-ready skills" },
                  ].map((item, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 flex items-center justify-center flex-shrink-0 mt-1">
                        <item.icon className="w-4 h-4 text-[#5E6AD2]" />
                      </div>
                      <p className="text-[#EDEDEF]">{item.text}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right - Visual */}
              <motion.div
                variants={itemVariants}
                className="relative h-[500px] rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#5E6AD2]/10 via-purple-500/5 to-transparent overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-center"
                  >
                    <BookOpen className="w-24 h-24 text-[#5E6AD2]/40 mx-auto mb-4" />
                    <p className="text-[#8A8F98] text-lg font-medium">Learning Without Limits</p>
                  </motion.div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-transparent to-transparent" />
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-16"
            >
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto">
                <motion.div variants={itemVariants}>
                  <span className="text-sm font-medium text-[#5E6AD2] tracking-wide">WHY CHOOSE US</span>
                  <h2 className="text-4xl md:text-5xl font-semibold mt-4">
                    <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                      Learn the Right Way
                    </span>
                  </h2>
                </motion.div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<Rocket className="w-6 h-6" />}
                  title="Project-Based Learning"
                  description="Build real-world projects from day one with our comprehensive project library."
                  gradient="bg-gradient-to-br from-[#5E6AD2]/20 to-purple-500/10"
                />
                <FeatureCard
                  icon={<MessageSquare className="w-6 h-6" />}
                  title="Community-Driven"
                  description="Learn from and contribute to a global community of passionate learners."
                  gradient="bg-gradient-to-br from-emerald-500/20 to-teal-500/10"
                />
                <FeatureCard
                  icon={<Shield className="w-6 h-6" />}
                  title="Job-Ready Curriculum"
                  description="Courses designed to ensure you're ready for real-world challenges."
                  gradient="bg-gradient-to-br from-cyan-500/20 to-blue-500/10"
                />
                <FeatureCard
                  icon={<Globe className="w-6 h-6" />}
                  title="Global Community"
                  description="Connect with peers worldwide, collaborate on projects, and grow your network."
                  gradient="bg-gradient-to-br from-amber-500/20 to-orange-500/10"
                />
                <FeatureCard
                  icon={<Headphones className="w-6 h-6" />}
                  title="Flexible Learning"
                  description="Learn at your own pace with lifetime access to all course materials."
                  gradient="bg-gradient-to-br from-pink-500/20 to-rose-500/10"
                />
                <FeatureCard
                  icon={<TrendingUp className="w-6 h-6" />}
                  title="Track Your Progress"
                  description="Monitor your growth and stay motivated with detailed progress tracking."
                  gradient="bg-gradient-to-br from-violet-500/20 to-purple-500/10"
                />
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-24 border-y border-white/[0.06]">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Header */}
              <div className="text-center">
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl md:text-4xl font-semibold">
                    <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                      Growing Every Day
                    </span>
                  </h2>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} label="Active Learners" value="50K+" />
                <StatCard icon={Code} label="Courses Available" value="500+" />
                <StatCard icon={BookOpen} label="Video Hours" value="5000+" />
                <StatCard icon={Users} label="Contributors" value="200+" />
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Community Section */}
        <section className="py-24">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <motion.div variants={itemVariants}>
                  <span className="text-sm font-medium text-[#5E6AD2] tracking-wide">THE COMMUNITY</span>
                  <h2 className="text-4xl md:text-5xl font-semibold mt-4">
                    <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                      Built by Learners, for Learners
                    </span>
                  </h2>
                </motion.div>
                <motion.p variants={itemVariants} className="text-lg text-[#8A8F98]">
                  Every course is created and maintained by passionate community members who are experts in their fields.
                </motion.p>
              </div>

              {/* Community highlights */}
              <motion.div
                variants={containerVariants}
                className="grid md:grid-cols-3 gap-6"
              >
                {[
                  {
                    number: "1K+",
                    title: "Active Contributors",
                    description: "Experts and educators sharing their knowledge",
                  },
                  {
                    number: "100K+",
                    title: "Lines of Content",
                    description: "Carefully curated and peer-reviewed materials",
                  },
                  {
                    number: "50+",
                    title: "Countries",
                    description: "Learners from around the world",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
                  >
                    <div className="text-4xl font-bold text-[#5E6AD2] mb-3">{item.number}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-[#8A8F98]">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-white/[0.06]">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center space-y-8 max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-semibold">
                <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
                  Ready to Start Learning?
                </span>
              </h2>
              <p className="text-lg text-[#8A8F98]">
                Join thousands of learners on a journey to master new skills and advance your career.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-[#5E6AD2] text-white font-semibold hover:bg-[#6872D9] transition-all shadow-lg shadow-[#5E6AD2]/25"
                >
                  Explore Courses
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl border border-white/[0.1] text-white font-semibold hover:bg-white/[0.05] transition-all"
                >
                  Join Community
                </motion.button>
              </div>
            </motion.div>
          </Container>
        </section>
      </div>
    </div>
  );
}
