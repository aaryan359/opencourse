import { motion } from "framer-motion";
export default function Progress({ label, value }: { label: string; value: number }) {
	return (
		<div>
			<div className='flex justify-between text-xs mb-1'>
				<span className='text-neutral-400'>{label}</span>
				<span className='text-neutral-300'>{value}%</span>
			</div>
			<div className='h-2 rounded-full bg-white/10 overflow-hidden'>
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: `${value}%` }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className='h-full bg-gradient-to-r from-indigo-400 to-cyan-400'
				/>
			</div>
		</div>
	);
}
