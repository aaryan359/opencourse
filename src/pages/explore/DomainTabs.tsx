import clsx from "clsx";

export default function DomainTabs({
  value,
  onChange,
}: {
  value: "tech" | "nonTech";
  onChange: (v: "tech" | "nonTech") => void;
}) {
  return (
    <div className="inline-flex rounded-xl z-50 bg-neutral-900 p-1">
      {["tech", "nonTech"].map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab as any)}
          className={clsx(
            "px-5 py-2 text-sm  z-50 font-medium rounded-lg transition",
            value === tab
              ? "bg-white text-black"
              : "text-neutral-400 hover:text-white"
          )}
        >
          {tab === "tech" ? "Tech" : "Non-Tech"}
        </button>
      ))}
    </div>
  );
}
