import GlowCard from "../../../components/ui/GlowCard";

export default function StatCard({ label, value }: any) {
  return (
    <GlowCard>
      <div className="text-sm text-neutral-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">
        {value}
      </div>
    </GlowCard>
  )
}