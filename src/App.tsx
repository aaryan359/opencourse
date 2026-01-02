import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import Home from "./pages/home/Home";
import Contribute from "./pages/contribute/Contribute";
import ContributeNew from "./pages/contribute/ContributeNew";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CommunityPage from "./pages/community/Community";

import StartPrep from "./pages/interviewPrep/InterviewPrep";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";


import CoursesPage from "./pages/courses/CoursesPage";
import TrackPage from "./pages/courses/TrackPage";
import DomainPage from "./pages/courses/DomainPage";
import CourseOverviewPage from "./pages/courses/CourseOverviewPage";
import CourseLearnPage from "./pages/courses/CourseLearnPage";


function App() {
	return (
		<Routes>
			{/* 🌐 App Shell */}
			<Route element={<AppLayout />}>
				<Route
					path='/'
					element={<Home />}
				/>

				<Route
					path='/contribute'
					element={<Contribute />}
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
					path='/courses/:track'
					element={<TrackPage />}
				/>
				<Route
					path='/courses/:track/:domain'
					element={<DomainPage />}
				/>
				<Route
					path='/courses/:track/:domain/:course'
					element={<CourseOverviewPage />}
				/>

				<Route
					path='/courses/:track/:domain/:course/learn'
					element={<CourseLearnPage />}
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
	);
}

export default App;
