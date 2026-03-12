"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, User, Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GlowCard from "../../components/ui/GlowCard";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import { useAuthStore } from "../../store/auth.store";

export default function Register() {
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const update = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      toast.error("Username, email, and password are required.");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    try {
      await register({
        username: form.username,
        email: form.email,
        password: form.password,
        profile: {
          firstName: form.firstName || undefined,
          lastName: form.lastName || undefined,
        },
      });
      toast.success("Account created! Welcome to OpenCourse.");
      navigate("/");
    } catch {
      toast.error(error || "Registration failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-[#050506] flex items-center py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />
      <motion.div
        className="fixed -top-[30%] right-[20%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#5E6AD2]/15 to-transparent blur-[100px]"
        animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <Container className="max-w-xl relative z-10">
        <GlowCard accent="indigo">
          <div className="space-y-6">
            {/* Header */}
            <header className="space-y-2">
              <h1 className="text-3xl font-semibold text-white">
                Join OpenCourse
              </h1>
              <p className="text-[#8A8F98] text-sm">
                Create an account to contribute videos, interview questions, and help learners worldwide.
              </p>
            </header>

            {/* OAuth */}
            <div className="grid grid-cols-2 gap-3">
              <OAuthButton icon={<Mail />} label="Google" />
              <OAuthButton icon={<Github />} label="GitHub" />
            </div>

            <div className="flex items-center gap-3 text-neutral-500 text-xs">
              <div className="h-px flex-1 bg-neutral-800" />
              or continue with details
              <div className="h-px flex-1 bg-neutral-800" />
            </div>

            {/* Form */}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    icon={<User className="w-4 h-4" />}
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e: any) => update("firstName", e.target.value)}
                  />
                  <Input
                    icon={<User className="w-4 h-4" />}
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(e: any) => update("lastName", e.target.value)}
                  />
                </div>

                <Input
                  icon={<User className="w-4 h-4" />}
                  placeholder="Username (required)"
                  value={form.username}
                  onChange={(e: any) => update("username", e.target.value)}
                />

                <Input
                  icon={<Mail className="w-4 h-4" />}
                  placeholder="Email address (required)"
                  type="email"
                  value={form.email}
                  onChange={(e: any) => update("email", e.target.value)}
                />

                <div className="relative">
                  <Input
                    icon={<User className="w-4 h-4" />}
                    placeholder="Password (min 6 chars, required)"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e: any) => update("password", e.target.value)}
                    onKeyDown={(e: any) => e.key === "Enter" && submit()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <div className="rounded-lg bg-neutral-900 border border-neutral-800 p-3 text-xs text-neutral-400">
                  <CheckCircle2 className="inline w-4 h-4 text-emerald-400 mr-1" />
                  Your account will be available immediately. Most contributors
                  are approved instantly.
                </div>

                <Button
                  loading={loading}
                  className="w-full"
                  onClick={submit}
                  disabled={!form.username || !form.email || !form.password || loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <p className="text-xs text-neutral-500 text-center">
                  Already have an account?{" "}
                  <a href="/login" className="text-indigo-400 hover:underline">
                    Sign In
                  </a>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </GlowCard>
      </Container>
    </section>
  );
}

function OAuthButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-[#EDEDEF] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all"
    >
      {icon}
      {label}
    </motion.button>
  );
}

function Input({ icon, ...props }: any) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F98]">
        {icon}
      </span>
      <input
        {...props}
        className="w-full rounded-xl bg-[#0f0f12] border border-white/[0.08] pl-10 pr-3 py-3 text-sm text-white placeholder-[#8A8F98] focus:outline-none focus:border-[#5E6AD2]/50 focus:ring-2 focus:ring-[#5E6AD2]/20 transition-all"
      />
    </div>
  );
}
