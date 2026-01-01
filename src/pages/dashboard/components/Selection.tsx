type SectionProps = {
	title: string;
	children: React.ReactNode;
	contentClassName?: string;
};

export default function Section({ title, children, contentClassName = "" }: SectionProps) {
	return (
		<section className='flex flex-col gap-4'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<h2 className='text-lg font-semibold text-white'>{title}</h2>
				<button className='text-sm text-indigo-400 hover:text-indigo-300 transition'>View all →</button>
			</div>

			{/* Horizontal Scroll Container */}
			<div
				className={`
          overflow-x-auto
          no-scrollbar
          -mx-1
          px-1
          ${contentClassName}
        `}>
				{children}
			</div>
		</section>
	);
}
