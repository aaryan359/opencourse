"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail, ArrowRight, Loader2 } from "lucide-react";
import GlowCard from "../../components/ui/GlowCard";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";


export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    alert("Logged in successfully ✨");
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
                questions. Watching courses doesn’t require login.
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
                value={email}
                onChange={(e:any) => setEmail(e.target.value)}
              />

              <Button className="w-full" onClick={login} disabled={!email}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Continue 
                  </>
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
              <a
                href="/register"
                className="text-emerald-400 hover:underline"
              >
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
