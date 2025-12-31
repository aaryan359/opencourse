import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import Home from "./pages/home/Home";
import Contribute from "./pages/contribute/Contribute";
import ContributeNew from "./pages/contribute/ContributeNew";
import ExplorePage from "./pages/explore/ExplorePage";

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
			</Route>

			{/* 🚪 Auth pages (no header if needed later) */}
			{/* <Route path="/login" element={<Login />} /> */}
		</Routes>
	);
}

export default App;
