import { Link } from "react-router-dom";

import { useState } from "react";

import { toast } from "react-toastify";

import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	// =============================
	// Token validation
	// =============================

	const handleLogout = () => {
		toast.success("Logged out successfully");
	};

	const isAuthed = true;

	return (
		<div className="top-1 sticky z-10" >
			<div className=' px-6'>
				<div className='flex h-10 items-center justify-between'>
					{/* Logo */}
					<Link
						to='/'
						className='flex items-center gap-2'>
						<img
							src='/open-course-logo-3.png'
							alt='Open Course'
							className='h-8 w-auto'
						/>
					</Link>

					{/* Desktop Nav */}
					<nav className='hidden md:flex items-center gap-8 text-sm font-medium'>
						<NavLink to='/Userpanel'>Courses</NavLink>
						<NavLink to='/Admin'>Contribute</NavLink>
						<NavLink to='/interviewprep/Startprep'>Interview</NavLink>
						<NavLink to='/community'>Community</NavLink>
						<NavLink to='/about'>About</NavLink>
					</nav>

					{/* Auth Actions */}
					<div className='hidden md:flex items-center gap-3'>
						{!isAuthed ? (
							<>
								<Link
									to='/login'
									className='text-sm text-neutral-300 hover:text-white transition'>
									Login
								</Link>
								<Link
									to='/signup'
									className='
                    rounded-xl bg-white px-4 py-2
                    text-sm font-semibold text-black
                    hover:bg-neutral-200 transition
                  '>
									Sign Up
								</Link>
							</>
						) : (
							<button
								onClick={handleLogout}
								className='
                  rounded-xl bg-red-600/90
                  px-4 py-2 text-sm font-medium text-white
                  hover:bg-red-700 transition
                '>
								Logout
							</button>
						)}
					</div>

					{/* Mobile Toggle */}
					<button
						onClick={() => setMenuOpen((v) => !v)}
						className='
              md:hidden rounded-lg border border-white/10
              p-2 text-neutral-300 hover:text-white
              hover:bg-white/5 transition
            '
						aria-label='Open menu'>
						☰
					</button>
				</div>
			</div>

			{/* ================= Mobile Menu ================= */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2 }}
						className='
              md:hidden
              border-t border-white/10
              bg-neutral-950/95 backdrop-blur
            '>
						<div className='px-6 py-6 space-y-4'>
							<MobileLink
								to='/Userpanel'
								onClick={setMenuOpen}>
								Courses
							</MobileLink>
							<MobileLink
								to='/Admin'
								onClick={setMenuOpen}>
								Contribute
							</MobileLink>
							<MobileLink
								to='/interviewprep/Startprep'
								onClick={setMenuOpen}>
								Interview
							</MobileLink>
							<MobileLink
								to='/community'
								onClick={setMenuOpen}>
								Community
							</MobileLink>
							<MobileLink
								to='/about'
								onClick={setMenuOpen}>
								About
							</MobileLink>

							<div className='pt-4 border-t border-white/10 space-y-3'>
								{!isAuthed ? (
									<>
										<Link
											to='/login'
											className='block text-neutral-300 hover:text-white'>
											Login
										</Link>
										<Link
											to='/signup'
											className='
                        block rounded-xl bg-white
                        px-4 py-2 text-center
                        font-semibold text-black
                      '>
											Sign Up
										</Link>
									</>
								) : (
									<button
										onClick={handleLogout}
										className='
                      w-full rounded-xl bg-red-600
                      px-4 py-2 text-white
                    '>
										Logout
									</button>
								)}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

/* =====================================
   Small Reusable Primitives
===================================== */

function NavLink({ to, children }: any) {
	return (
		<Link
			to={to}
			className='
        text-neutral-300 hover:text-white
        transition relative
        after:absolute after:-bottom-1 after:left-0
        after:h-[2px] after:w-0 after:bg-white
        after:transition-all hover:after:w-full
      '>
			{children}
		</Link>
	);
}

function MobileLink({ to, children, onClick }: any) {
	return (
		<Link
			to={to}
			onClick={() => onClick(false)}
			className='
        block text-lg font-medium
        text-neutral-200 hover:text-white
      '>
			{children}
		</Link>
	);
}
