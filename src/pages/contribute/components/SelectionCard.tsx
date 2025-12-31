import GlowCard from "../../../components/ui/GlowCard";

type SelectionCardProps = {
	title: string;
	description: string;
	accent?: "indigo" | "emerald";
	onClick?: () => void;
};

export default function ContributeSelectionCard({ title, description, accent = "indigo", onClick }: SelectionCardProps) {
	return (
		<GlowCard accent={accent}>
			<h3 className='text-lg font-semibold text-white mb-2'>{title}</h3>

			<p className='text-sm text-neutral-400 leading-relaxed'>{description}</p>

			<div
				onClick={onClick}
				className={`
                        cursor-pointer
                    mt-5 inline-flex items-center gap-2
                    text-sm font-medium
                    text-${accent}-400
                    `}>
				Contribute
				<span className='transition-transform group-hover:translate-x-1'>→</span>
			</div>
		</GlowCard>
	);
}
