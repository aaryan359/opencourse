import type { ReactNode } from "react";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="
      min-h-screen
      max-w-7xl mx-auto
      bg-[#050506]
      text-[#EDEDEF]
      relative overflow-hidden
    ">
      {/* Ambient blob */}
      <div className="
        pointer-events-none absolute top-[-20%] left-1/2 -translate-x-1/2
        h-[900px] w-[900px]
        rounded-full
        bg-indigo-500/20 blur-[160px]
      " />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
