import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import Home from "./pages/home/Home";
import Contribute from "./pages/contribute/Contribute";
import ContributeNew from "./pages/contribute/ContributeNew";
import ExplorePage from "./pages/explore/ExplorePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CommunityPage from "./pages/community/Community";

import StartPrep from "./pages/interviewPrep/InterviewPrep";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";

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
					path='/explore'
					element={<ExplorePage />}
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

			
			 <Route path="/register" element={<Register />} /> 
			 <Route path="/login" element={<Login />} /> 
		</Routes>
	);
}

export default App;
