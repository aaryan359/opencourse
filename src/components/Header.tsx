import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./ui/Container";

const NAV_ITEMS = [
	{ label: "Explore", href: "/explore" },
	{ label: "Contribute", href: "/contribute" },
	{ label: "Interview Prep", href: "/prep" },
	{ label: "Community", href: "/community" },
];

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();

	return (
		<header
			className='
        sticky top-0 z-100
        backdrop-blur-xl
        bg-neutral-950/60
        border-b border-white/10
      '>
			<Container>
				<div className='flex h-16 items-center justify-between'>
					{/* Logo */}
					<Link
						to='/'
						className='flex items-center gap-2 group'>
							
						<img src="/logo.png" alt="" width={100} height={110}/>
					</Link>

					{/* Desktop Nav */}
					<nav className='hidden md:flex items-center gap-8'>
						{NAV_ITEMS.map((item) => (
							<NavItem
								key={item.href}
								{...item}
								active={location.pathname.startsWith(item.href)}
							/>
						))}
					</nav>

					{/* Right Action */}
					<div className='hidden md:flex items-center gap-4'>
						<Link
							to='/explore'
							className='
                                relative inline-flex items-center
                                rounded-xl px-4 py-2
                                text-sm font-medium text-white
                                bg-white/10 hover:bg-white/15
                                transition
                            '>
							Get Started
						</Link>
					</div>

					{/* Mobile Toggle */}
					<button
						onClick={() => setMenuOpen((v) => !v)}
						className='
              md:hidden rounded-xl
              p-2 text-white
              bg-white/5 hover:bg-white/10
              transition
            '
						aria-label='Open menu'>
						<span className='block h-0.5 w-5 bg-white mb-1' />
						<span className='block h-0.5 w-5 bg-white mb-1' />
						<span className='block h-0.5 w-5 bg-white' />
					</button>
				</div>
			</Container>

			{/* ================= Mobile Menu ================= */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -12 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
						className='
              md:hidden
              bg-neutral-950/95 backdrop-blur-xl
              border-t border-white/10
            '>
						<Container>
							<div className='py-6 space-y-4'>
								{NAV_ITEMS.map((item) => (
									<MobileNavItem
										key={item.href}
										{...item}
										onClick={() => setMenuOpen(false)}
									/>
								))}

								<Link
									to='/explore'
									className='
                    mt-4 block rounded-xl
                    bg-white text-black
                    px-4 py-2 text-center
                    font-semibold
                  '>
									Get Started
								</Link>
							</div>
						</Container>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}

/* =====================================
   Desktop Nav Item (micro-interactions)
===================================== */

function NavItem({ label, href, active }: { label: string; href: string; active?: boolean }) {
	return (
		<Link
			to={href}
			className='
        relative text-sm font-medium
        text-neutral-300 hover:text-white
        transition
      '>
			{label}

			{/* Underline */}
			<span
				className={`
          pointer-events-none
          absolute -bottom-1 left-0 h-[2px]
          bg-white
          transition-all duration-300
          ${active ? "w-full opacity-100" : "w-0 opacity-0"}
          group-hover:w-full group-hover:opacity-100
        `}
			/>
		</Link>
	);
}

/* =====================================
   Mobile Nav Item
===================================== */

function MobileNavItem({ label, href, onClick }: { label: string; href: string; onClick: () => void }) {
	return (
		<Link
			to={href}
			onClick={onClick}
			className='
        block rounded-xl
        px-4 py-3
        text-base font-medium
        text-neutral-200
        bg-white/5 hover:bg-white/10
        transition
      '>
			{label}
		</Link>
	);
}
