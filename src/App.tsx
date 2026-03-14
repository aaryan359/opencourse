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


import CoursesPage from "./pages/courses/CoursesPage";
import FieldCoursesPage from "./pages/courses/DomainPage";
import CourseOverviewPage from "./pages/courses/CourseOverviewPage";
import CourseLearnPage from "./pages/courses/CourseLearnPage";
import ExploreCoursesPage from "./pages/explore/Explore";
import ContributePage from "./pages/contribute/Contribute";



function App() {
	const initFromStorage = useAuthStore((s) => s.initFromStorage);

	useEffect(() => {
		initFromStorage();
	}, [initFromStorage]);

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
			{/* 🌐 App Shell */}
			<Route element={<AppLayout />}>
				<Route
					path='/'
					element={<Home />}
				/>

				<Route
					path='/about'
					element={<About />}
				/>

				<Route
					path='/contribute/new'
					element={<ContributeNew />}
				/>
				<Route
					path='/courses'
					element={<CoursesPage />}
				/>
				<Route
					path='/courses/:fieldSlug'
					element={<FieldCoursesPage />}
				/>
				<Route
					path='/courses/:fieldSlug/:courseSlug'
					element={<CourseOverviewPage />}
				/>
				<Route
					path='/courses/:fieldSlug/:courseSlug/learn'
					element={<CourseLearnPage />}
				/>


				<Route
					path='/explore'
					element={<ExploreCoursesPage />}
				/>

				<Route
					path='/contribute'
					element={<ContributePage />}
				/>

				<Route
					path='/dashboard'
					element={<DashboardPage />}
				/>
				<Route
					path='/community'
					element={<CommunityPage />}
				/>
				<Route
					path='/prep'
					element={<StartPrep />}
				/>
			</Route>

			<Route
				path='/register'
				element={<Register />}
			/>
			<Route
				path='/login'
				element={<Login />}
			/>
		</Routes>
		</>
	);
}

export default App;
