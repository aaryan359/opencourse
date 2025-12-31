// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
// import { isAuthenticated } from "../auth";

let isAuthenticated = true;

const ProtectedRoute = () => {
	return isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate
			to='/login'
			replace
		/>
	);
};

export default ProtectedRoute;
