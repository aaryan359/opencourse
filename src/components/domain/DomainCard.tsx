import { useNavigate } from "react-router-dom";

export default function DomainCard({ domain }: any) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(domain.href)}
      className="cursor-pointer group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 bg-neutral-900/20 hover:bg-neutral-900/40 backdrop-blur-xl p-6 transition-all duration-200"
    >
      <div className="relative z-10 flex flex-col h-full">
        <span className="inline-flex w-fit rounded-md bg-purple-700/20 px-3 py-1 text-sm text-purple-200">
          {domain.name}
        </span>

        <p className="mt-4 text-sm text-neutral-300">
          Curated learning paths with hands-on depth and real-world focus.
        </p>

        <div className="mt-auto flex justify-between text-xs text-neutral-400 group-hover:text-indigo-400 transition-colors">
          <span>{domain.contributors}+ contributors</span>
          <span className="text-indigo-400">Explore →</span>
        </div>
      </div>
    </div>
  );
}
