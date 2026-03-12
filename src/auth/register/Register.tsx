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
    <section className="min-h-screen bg-neutral-950 flex items-center py-12">
      <Container className="max-w-xl">
        <GlowCard accent="indigo">
          <div className="space-y-6">
            {/* Header */}
            <header className="space-y-2">
              <h1 className="text-3xl font-semibold text-white">
                Become a Contributor
              </h1>
              <p className="text-neutral-400 text-sm">
                Help keep courses up-to-date. Create an account to start
                contributing videos and interview questions.
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
      className="flex items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-200 hover:border-neutral-700"
    >
      {icon}
      {label}
    </motion.button>
  );
}

function Input({ icon, ...props }: any) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
        {icon}
      </span>
      <input
        {...props}
        className="w-full rounded-lg bg-neutral-900 border border-neutral-800 pl-10 pr-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />
    </div>
  );
}
