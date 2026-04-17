import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./layouts/AppLayout";
import { useAuthStore } from "./store/auth.store";

import Home from "./pages/home/Home";
import About from "./pages/about/About";

import ContributeNew from "./pages/contribute/ContributeNew";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CommunityPage from "./pages/community/Community";

import StartPrep from "./pages/interviewPrep/InterviewPrep";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import ProtectedRoute from "./routes/Protected";

import CoursesPage from "./pages/courses/CoursesPage";
import CourseOverviewPage from "./pages/courses/CourseOverviewPage";

// Admin — completely separate UI, outside AppLayout
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
	const initFromStorage = useAuthStore((s) => s.initFromStorage);
	const logout = useAuthStore((s) => s.logout);

	useEffect(() => {
		initFromStorage();
	}, [initFromStorage]);

	useEffect(() => {
		const onUnauthorized = () => logout();
		window.addEventListener("auth:unauthorized", onUnauthorized);
		return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
	}, [logout]);

	return (
		<>
			<ToastContainer
				position="bottom-right"
				theme="dark"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				pauseOnFocusLoss={false}
				pauseOnHover
			/>
			<Routes>
			{/* ── Admin (outside AppLayout — no normal header/nav) */}
			<Route path="/admin/login"     element={<AdminLogin />} />
			<Route path="/admin/dashboard" element={<AdminDashboard />} />

			{/* ── Normal app shell */}
			<Route element={<AppLayout />}>
				<Route path="/"       element={<Home />} />
				<Route path="/about"  element={<About />} />

				<Route element={<ProtectedRoute />}>
					<Route path="/contribute"     element={<ContributeNew />} />
					<Route path="/contribute/new" element={<ContributeNew />} />
				</Route>

				<Route path="/courses"              element={<CoursesPage />} />
				<Route path="/courses/:courseSlug"  element={<CourseOverviewPage />} />

				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/community" element={<CommunityPage />} />
				<Route path="/prep"      element={<StartPrep />} />
			</Route>

			<Route path="/register" element={<Register />} />
			<Route path="/login"    element={<Login />} />
		</Routes>
		</>
	);
}


export default App;
