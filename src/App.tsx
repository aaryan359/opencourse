import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./layouts/AppLayout";

import Home from "./pages/home/Home";
import About from "./pages/about/About";


import CommunityPage from "./pages/community/Community";
import CoursesPage from "./pages/courses/course";
import CourseTopicsPage from "./pages/courses/courseTopics";


import StartPrep from "./pages/interviewPrep/InterviewPrep";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";



// Admin — completely separate UI, outside AppLayout
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { useAppDispatch } from "./redux/hook";
import { forceLogout, initializeAuth } from "./redux/slice/authSlice";


function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		void dispatch(initializeAuth());
	}, [dispatch]);

	useEffect(() => {
		const onUnauthorized = () => dispatch(forceLogout());
		window.addEventListener("auth:unauthorized", onUnauthorized);
		return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
	}, [dispatch]);

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
			
			<Route path="/admin/login"     element={<AdminLogin />} />
			<Route path="/admin/dashboard" element={<AdminDashboard />} />

			{/* ── Normal app shell */}
			<Route element={<AppLayout />}>
					<Route path="/"       element={<Home />} />
					<Route path="/about"  element={<About />} />
					<Route path="/courses" element={<CoursesPage />} />
					<Route path="/courses/:courseId" element={<CourseTopicsPage />} />


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
