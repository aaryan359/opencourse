import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		expertise: "",
		experience: "",
		portfolio: "",
	});

	const navigate = useNavigate();

	//taking form data
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// on submit function
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			
			

			const response = await axios.post(
				"https://opencoursebackend.onrender.com/auth/signup",
				formData
			);

			

			if (response.status >= 200 && response.status < 300) {
				navigate("/login");
				toast.success('User Registered', {
					position: "top-right",
					autoClose: 5000, 
					success:true,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "light",
				  });
				
			} else {
				toast.success('Registered failed', {
					position: "top-right",
					autoClose: 5000, 
					success:false,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "light",
				  });
			}
		} catch (err) {
			console.error(err);
		
			toast.success('Error registering user', {
				position: "top-right",
				autoClose: 5000, 
				success:false,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "light",
			  });
		}
	};

	return (
		<div className="bg-bg-dark">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full rounded-lg shadow dark:border sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
							Create an account
						</h1>
						<form
							onSubmit={handleSubmit}
							className="space-y-4 md:space-y-6">
							<div>
								<label
									htmlFor="username"
									className="block mb-2 text-sm font-semibold text-white">
									Username
								</label>
								<input
									type="text"
									name="username"
									value={
										formData.username
									}
									onChange={
										handleChange
									}
									placeholder="Username"
									className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-semibold text-white">
									Email
								</label>
								<input
									type="email"
									name="email"
									value={
										formData.email
									}
									onChange={
										handleChange
									}
									placeholder="Email"
									className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-semibold text-white">
									Password
								</label>
								<input
									type="password"
									name="password"
									value={
										formData.password
									}
									onChange={
										handleChange
									}
									placeholder="Password"
									className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="expertise"
									className="block mb-2 text-sm font-semibold text-white">
									Expertise
								</label>
								<input
									type="text"
									name="expertise"
									value={
										formData.expertise
									}
									onChange={
										handleChange
									}
									placeholder="Expertise"
									className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="experience"
									className="block mb-2 text-sm font-semibold text-white">
									Experience
								</label>
								<input
									type="text"
									name="experience"
									value={
										formData.experience
									}
									onChange={
										handleChange
									}
									placeholder="Experience"
									className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>

							<div>
								<label
									htmlFor="portfolio"
									className="block mb-2 text-sm font-semibold text-white">
									Portfolio
									Link
									(optional)
								</label>
								<input
									type="text"
									name="portfolio"
									value={
										formData.portfolio
									}
									onChange={
										handleChange
									}
									placeholder="Portfolio (optional)"
									className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>

							<div className="flex justify-center">
								<button
									type="submit"
									className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200">
									Sign Up
								</button>
							</div>

							<p className="mt-4 text-center text-gray-600">
								Already have an
								account?{" "}
								<Link
									to="/login"
									className="text-blue-600 hover:underline">
									Log In
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
