import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "./ui/Container";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { logoutUser } from "../redux/slice/authSlice";
import { User, LogOut, ChevronDown, Menu, X } from "lucide-react";

const NAV_ITEMS = [
	
	{ label: "Courses", href: "/courses" },
	{ label: "Contribute", href: "/contribute" },
	{ label: "Interview Prep", href: "/prep" },
	{ label: "About", href: "/about" },
	{ label: "Docs", href: "/docs" },
];

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [avatarLoadError, setAvatarLoadError] = useState(false);
	const location = useLocation();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const avatarUrl = user?.profile?.avatar?.trim() ?? "";
	const hasAvatar = Boolean(avatarUrl) && !avatarLoadError;

	const logout = () => {
		void dispatch(logoutUser());
	};

	// Close mobile menu on route change
	useEffect(() => {
		setMenuOpen(false);
		setUserMenuOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		setAvatarLoadError(false);
	}, [avatarUrl]);

	return (
		<header
			className={`
				sticky top-0 z-50
				transition-all duration-300
				bg-transparent backdrop-blur-sm border-b border-transparent
			`}>
			<Container>
				<div className='flex h-16 items-center justify-between'>
					{/* Logo */}
					<Link to='/' className='flex items-center gap-2 group'>
						<img
							src={`${import.meta.env.BASE_URL}logo.png`}
							alt='OpenCourse'
							width={100}
							height={110}
							className="transition-transform duration-200 group-hover:scale-105"
						/>
					</Link>

					{/* Desktop Nav */}
					<nav className='hidden md:flex items-center gap-1'>
						{NAV_ITEMS.map((item) => (
							<NavItem
								key={item.href}
								{...item}
								active={location.pathname === item.href || location.pathname.startsWith(item.href + "/")}
							/>
						))}
					</nav>

					{/* Right Actions */}
					<div className='hidden md:flex items-center gap-3'>
						{user ? (
							<div className="relative">
								<button
									onClick={() => setUserMenuOpen(!userMenuOpen)}
									className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/3 hover:bg-white/6 border border-white/6 transition-all duration-200"
								>
									<div className="w-7 h-7 overflow-hidden rounded-lg bg-linear-to-br from-[#5E6AD2] to-purple-500 flex items-center justify-center">
										{hasAvatar ? (
											<img
												src={avatarUrl}
												alt={user.username}
												className="h-full w-full object-cover"
												onError={() => setAvatarLoadError(true)}
											/>
										) : (
											<span className="text-xs font-semibold text-white">
												{user.username?.charAt(0).toUpperCase() || "U"}
											</span>
										)}
									</div>
									<span className="text-sm text-[#EDEDEF] font-medium max-w-25 truncate">
										{user.username}
									</span>
									<ChevronDown className={`w-4 h-4 text-[#8A8F98] transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
								</button>

								{userMenuOpen && (
									<div
										className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0a0a0c] border border-white/8 shadow-xl shadow-black/30 overflow-hidden"
									>
										<Link
											to="/dashboard"
											className="flex items-center gap-3 px-4 py-3 text-sm text-[#EDEDEF] hover:bg-white/5 transition-colors"
										>
											<User className="w-4 h-4 text-[#8A8F98]" />
											Dashboard
										</Link>
										{(user.role === "admin" || user.role === "super_admin") && (
											<Link
												to="/admin/contributions"
												className="flex items-center gap-3 px-4 py-3 text-sm text-[#EDEDEF] hover:bg-white/5 transition-colors border-t border-white/6"
											>
												<User className="w-4 h-4 text-[#8A8F98]" />
												Admin Panel
											</Link>
										)}
										<button
											onClick={() => {
												logout();
												setUserMenuOpen(false);
											}}
											className="flex items-center gap-3 w-full px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-white/6"
										>
											<LogOut className="w-4 h-4" />
											Sign Out
										</button>
									</div>
								)}
							</div>
						) : (
							<>
								<Link
									to="/login"
									className="px-4 py-2 text-sm font-medium text-[#EDEDEF] hover:text-white transition-colors"
								>
									Sign In
								</Link>
								<Link
									to="/register"
									className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-[#5E6AD2] hover:bg-[#6872D9] transition-all shadow-md shadow-[#5E6AD2]/20"
								>
									Get Started
								</Link>
							</>
						)}
					</div>

					{/* Mobile Toggle */}
					<button
						onClick={() => setMenuOpen((v) => !v)}
						className='md:hidden p-2 rounded-lg text-white hover:bg-white/5 transition-colors'
						aria-label='Toggle menu'>
						{menuOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</button>
				</div>
			</Container>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className='md:hidden bg-[#050506]/95 backdrop-blur-xl border-t border-white/6 overflow-hidden'>
					<Container>
						<div className='py-4 space-y-2'>
							{NAV_ITEMS.map((item) => (
								<MobileNavItem
									key={item.href}
									{...item}
									active={location.pathname.startsWith(item.href)}
								/>
							))}

							<div className="pt-4 mt-4 border-t border-white/6 space-y-2">
								{user ? (
									<>
										<div className="mb-2 flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-3 py-2.5">
											<div className="h-9 w-9 overflow-hidden rounded-full bg-linear-to-br from-[#5E6AD2] to-purple-500 flex items-center justify-center">
												{hasAvatar ? (
													<img
														src={avatarUrl}
														alt={user.username}
														className="h-full w-full object-cover"
														onError={() => setAvatarLoadError(true)}
													/>
												) : (
													<span className="text-xs font-semibold text-white">
														{user.username?.charAt(0).toUpperCase() || "U"}
													</span>
												)}
											</div>
											<div className="min-w-0">
												<p className="truncate text-sm font-medium text-[#EDEDEF]">{user.username}</p>
												<p className="truncate text-xs text-[#8A8F98]">{user.email}</p>
											</div>
										</div>
										<Link
											to="/dashboard"
											className="block rounded-xl px-4 py-3 text-sm font-medium text-[#EDEDEF] bg-white/3 hover:bg-white/6 transition-colors"
										>
											Dashboard
										</Link>
										{(user.role === "admin" || user.role === "super_admin") && (
											<Link
												to="/admin/contributions"
												className="block rounded-xl px-4 py-3 text-sm font-medium text-[#EDEDEF] bg-white/3 hover:bg-white/6 transition-colors"
											>
												Admin Panel
											</Link>
										)}
										<button
											onClick={logout}
											className="w-full rounded-xl px-4 py-3 text-sm font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/15 transition-colors text-left"
										>
											Sign Out
										</button>
									</>
								) : (
									<>
										<Link
											to="/login"
											className="block rounded-xl px-4 py-3 text-sm font-medium text-[#EDEDEF] bg-white/3 hover:bg-white/6 transition-colors text-center"
										>
											Sign In
										</Link>
										<Link
											to="/register"
											className="block rounded-xl px-4 py-3 text-sm font-medium text-white bg-[#5E6AD2] hover:bg-[#6872D9] transition-colors text-center"
										>
											Get Started
										</Link>
									</>
								)}
							</div>
						</div>
					</Container>
				</div>
			)}
		</header>
	);
}

/* Desktop Nav Item */
function NavItem({ label, href, active }: { label: string; href: string; active?: boolean }) {
	return (
		<Link
			to={href}
			className={`
				relative px-4 py-2 text-sm font-medium rounded-lg
				transition-all duration-200
				${active 
					? "text-white bg-white/6" 
					: "text-[#8A8F98] hover:text-white hover:bg-white/3"
				}
			`}>
			{label}
			{active && (
				<div
					className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#5E6AD2]"
				/>
			)}
		</Link>
	);
}

/* Mobile Nav Item */
function MobileNavItem({ label, href, active }: { label: string; href: string; active?: boolean }) {
	return (
		<Link
			to={href}
			className={`
				block rounded-xl px-4 py-3 text-sm font-medium transition-colors
				${active 
					? "text-white bg-[#5E6AD2]/20 border border-[#5E6AD2]/30" 
					: "text-[#EDEDEF] bg-white/3 hover:bg-white/6"
				}
			`}>
			{label}
		</Link>
	);
}
