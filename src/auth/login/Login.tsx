"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail, Loader2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GlowCard from "../../components/ui/GlowCard";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import { useAuthStore } from "../../store/auth.store";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    try {
      await login({ email, password });
      toast.success("Welcome back!");
      navigate("/");
    } catch {
      toast.error(error || "Login failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-neutral-950 flex items-center">
      <Container className="max-w-md">
        <GlowCard accent="emerald">
          <div className="space-y-6">
            {/* Header */}
            <header className="space-y-2">
              <h1 className="text-3xl font-semibold text-white">
                Welcome Back
              </h1>
              <p className="text-neutral-400 text-sm">
                Sign in to contribute, manage courses, or upload interview
                questions. Watching courses does not require login.
              </p>
            </header>

            {/* OAuth Login */}
            <div className="grid grid-cols-2 gap-3">
              <OAuthButton icon={<Mail />} label="Google" />
              <OAuthButton icon={<Github />} label="GitHub" />
            </div>

            <div className="flex items-center gap-3 text-neutral-500 text-xs">
              <div className="h-px flex-1 bg-neutral-800" />
              or continue with email
              <div className="h-px flex-1 bg-neutral-800" />
            </div>

            {/* Email Login */}
            <div className="space-y-4">
              <Input
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <div className="relative">
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  onKeyDown={(e: any) => e.key === "Enter" && handleLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button
                className="w-full"
                onClick={handleLogin}
                disabled={!email || !password || loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-neutral-500"
            >
              New here?{" "}
              <a href="/register" className="text-emerald-400 hover:underline">
                Apply as a contributor
              </a>
            </motion.div>
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
      whileTap={{ scale: 0.97 }}
      className="flex items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-200 hover:border-neutral-700"
    >
      {icon}
      {label}
    </motion.button>
  );
}

function Input(props: any) {
  return (
    <input
      {...props}
      className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
    />
  );
}
