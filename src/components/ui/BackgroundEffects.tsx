// 1. Background Effects Component 
export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />
      
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Animated Gradient Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-350 h-350 rounded-full bg-linear-to-br from-[#5E6AD2]/20 via-transparent to-purple-500/15 blur-[150px] animate-blob-float-1" />
      <div className="absolute top-[30%] right-[-5%] w-200 h-150 rounded-full bg-linear-to-tr from-pink-500/10 via-transparent to-indigo-500/8 blur-[120px] animate-blob-float-2" />
      <div className="absolute bottom-[10%] left-[20%] w-175 h-125 rounded-full bg-linear-to-tl from-blue-500/8 via-transparent to-cyan-500/5 blur-[100px] animate-blob-float-3" />
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
}