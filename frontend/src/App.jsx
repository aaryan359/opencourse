import { BrowserRouter as Router, Link } from "react-router-dom";
import Roadmap from "./Components/Roadmap.jsx";
import { FaArrowRight } from "react-icons/fa";
import { AnimatedTooltip } from "../src/Components/components/ui/animated-tooltip.jsx";
import { TextGenerateEffect } from "../src/Components/components/ui/text-generate-effect.jsx";
import GlowCursor from "../src/Components/GlowCursor.jsx";
import "./App.css";
import "./index.css";
import "./card.css";

import "./GradientBubbles.css";
import React, { useEffect, useState } from "react";

import SplashScreen from "../src/Components/SplashScreen.jsx";
import Footer from "./Components/Footer.jsx";




function App() {
	
	const [isSplashVisible, setSplashVisible] = useState(false);

	const handleSplashComplete = () => {
		setSplashVisible(false);
	};

	useEffect(() => {
		const interBubble = document.querySelector(".interactive");
		let curX = 0;
		let curY = 0;
		let tgX = 0;
		let tgY = 0;

		function move() {
			curX += (tgX - curX) / 20;
			curY += (tgY - curY) / 20;
			if (interBubble) {
				interBubble.style.transform = `translate(${Math.round(
					curX
				)}px, ${Math.round(curY)}px)`;
			}
			requestAnimationFrame(move);
		}

		window.addEventListener("mousemove", (event) => {
			tgX = event.clientX;
			tgY = event.clientY;
		});

		move();
		return () => {
			window.removeEventListener("mousemove", () => {});
		};
	}, []);

	const people = [
		{
			id: 1,
			name: "Aryan Meena",
			designation: "CEO",
			image: "../public/h1.jpeg",
		},
		{
			id: 2,
			name: "Vikas Pal",
			designation: "CTO",
			image: "../public/h2.jpeg",
		},
		{
			id: 3,
			name: "Anurag Sing",
			designation: "CMO",
			image: "../public/h3.jpeg",
		},
		{
			id: 4,
			name: "Manroop Sing",
			designation: "DESIGNING HEAD",
			image: "../public/h4.jpeg",
		},
		{
			id: 5,
			name: "Ayush Nagar",
			designation: "Black V Man",
			image: "../public/h5.jpeg",
		},
		{
			id: 6,
			name: "Dora",
			designation: "The Explorer",
			image: "../public/h6.jpeg",
		},
	];

	const items = [
		"Free Web Dev",
		"Android",
		"Tutorials",
		"Operating System",
		"Dev Ops",
		"Interview Experiences",
		"DSA",
		"Core CS Subjects",
	];
	return isSplashVisible ? (
		<SplashScreen onLoadComplete={handleSplashComplete} />
	) : (
		<>
			{/* Roadmap Section */}
			{/* <div className="container mx-auto py-12">
             <Roadmap />
            </div>*/}

			<div className="min-h-screen bg-bg-dark ">
				<div className="flex flex-row bg-custom-gradient justify-around  ">
					<div className=" text-white ml-20">
						<h1 className=" font-bold mb-4 text-start ">
							<br />
							<br />
							<span className="font-Montserrat font-extrabold text-6xl ">
								Learn
							</span>{" "}
							and
							<span className="font-extrabold  text-6xl ">
								{" "}
								Contribute
							</span>
							
						</h1>

						<h1 className="text-7xl font-extrabold mb-4 mt-2 text-start">
							<span className=" text-transparent bg-gradient-to-r from-green-400 via-green-400 to-blue-500 bg-clip-text">
								Together
							</span>
						</h1>

						
						<p className="text-lg font-semibold font-sans ">
							<TextGenerateEffect
								words={
									"Describe what you want from a course, and if you have knowledge then contribute "
								}
							/>

							{/* contribute with your own
							topics. */}

							<span className="text-transparent bg-gradient-to-r from-green-400 via-green-400 to-blue-500 bg-clip-text">
								Grow Together!
							</span>
						</p>

						<div className="flex justify-start items-start p-5">
							<Link
								to="/userpanel"

								className="bg-c_tech_color hover:bg-pink-300 text-center text-black font-extrabold py-3  px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-gray-700 focus:outline-none active:bg-c_tech_color">
								 tech Courses

							</Link>

							<Link
								to="/seenontechcourse"
								className="bg-blue-400 hover:bg-blue-300 text-black font-extrabold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-gray-700 focus:outline-none active:bg-blue-300">

									Non tech Courses

							</Link>
						</div>
					</div>

					<div className="flex justify-end items-end mr-10">
						<img
							className="  mb-14 "
							src="../public/hero_section_img.png"
							alt=""
						/>
					</div>
				</div>

				{/* Contribution section */}

				<div className=" bg-transparent flex-col justify-start items-start ml-20 p-6 ">
					<h2 className="text-5xl text-start font-bold mb-6 text-white ">
						Contribute
					</h2>

					<p className="font-semibold text-white ml-1">
						Have and create valuable content
						to easily address the
						challenges, learn, and
						<span className="text-transparent bg-gradient-to-r from-green-400 via-green-400 to-blue-500 bg-clip-text">
							{" "}
							Grow Together!{" "}
						</span>
					</p>

					{/* link for tech contribution */}

					<div className="flex justify-start p-4">
						<Link
							to="/admin"
							className="bg-c_tech_color hover:bg-pink-300 text-black font-extrabold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-gray-700 focus:outline-none active:bg-c_tech_color">
							Tech
						</Link>

						{/* link for non tech contribution */}
						<Link
							to="/dummynontechcourse"
							className="bg-blue-400 hover:bg-blue-300 text-black font-extrabold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-gray-700 focus:outline-none active:bg-blue-300">
							Non Tech 
						</Link>
					</div>
				</div>




				<div className="overflow-x-auto scrollbar-hide">
					<div className="flex justify-start items-start space-x-4 p-6 ml-16 w-max  ">
						{/* Card 1 */}
						<div className="p-5 m-2 rounded-md w-56 bg-gray-900 shadow-lg cursor-pointer ">
							<img
								className="rounded-lg hover:scale-105 duration-300"
								src="../public/contribute_im1.jpeg"
								alt="Web Development"
							/>
							<h3 className="text-xl font-bold text-white p-1">
								Web Development
							</h3>
							<p className="text-md text-gray-300 p-1">
								What is
								JavaScript?
							</p>

							<div className="flex flex-row justify-start items-center text-white bg-pink-600 p-1 m-1 rounded-lg hover:scale-105 cursor-pointer duration-200"
							style={{ textDecoration: 'none' }}>
							   
								<span className=" font-semibold text-white  text-lg no-underline p-1"
								style={{ textDecoration: 'none' }}
								>
								<Link to='/admin'
								className="no-underline"
								style={{ textDecoration: 'none' }} >
									Contribute
							    </Link>
									
								</span>
								

								<span className=" font-semibold ">
									<FaArrowRight />
								</span>
							</div>
						</div>

						{/* Card 2 */}
						<div className="p-5 m-2 rounded-md w-56 bg-gray-900 shadow-lg ">
							<img
								className="rounded-lg hover:scale-105 duration-300 cursor-pointer"
								src="../public/contribute_img2.jpeg"
								alt="AI/ML"
							/>

							<h3 className="text-xl font-bold text-white p-1">
								AI/ML
							</h3>
							<p className="text-md text-gray-300 p-1">
								What is Python?
							</p>

							<div className="flex flex-row justify-start items-center text-white bg-pink-600 p-1 m-1 rounded-lg hover:scale-105 cursor-pointer hover:text-gray-200 duration-200 no-underline">
								<span className="  font-semibold text-white  text-lg no-underline p-1">
								<Link to='/admin'
								className="no-underline text-gray-200 hover:text-light-200">
									Contribute
							    </Link>
								</span>

								<span className=" font-semibold ">
									<FaArrowRight />
								</span>
							</div>
						</div>

						{/* Card 3 */}

						<div className="p-5 m-2 rounded-md w-56 bg-gray-900 shadow-lg">
							<img
								className="rounded-lg hover:scale-105 duration-300 cursor-pointer"
								src="../public/contribution_img3.jpeg"
								alt="Android Development"
							/>

							<h3 className="text-xl font-bold text-white p-1">
								Android
							</h3>

							<p className="text-md text-gray-300 p-1">
								What is Kotlin?
							</p>

							<div className="flex flex-row justify-start items-center text-white bg-pink-600 p-1 m-1 rounded-lg hover:scale-105 cursor-pointer duration-200">
								<span className="  font-semibold text-white  text-lg no-underline p-1">
								<Link to='/admin'
								className="no-underline">
									Contribute
							    </Link>
								</span>

								<span className=" font-semibold ">
									<FaArrowRight />
								</span>
							</div>
						</div>

						<div className="p-5 m-2 rounded-md w-56 bg-gray-900 shadow-lg">
							<img
								className="rounded-lg hover:scale-105 duration-300 cursor-pointer"
								src="../public/contribute_im1.jpeg"
								alt="Web Development"
							/>
							<h3 className="text-xl font-bold text-white p-1">
								Web Development
							</h3>
							<p className="text-md text-gray-300 p-1">
								What is
								JavaScript?
							</p>

							<div className="flex flex-row justify-start items-center text-white bg-pink-600 p-1 m-1 rounded-lg hover:scale-105 cursor-pointer duration-200">
								<span className="  font-semibold text-white  text-lg no-underline p-1">
								<Link to='/admin'
								className="no-underline">
									Contribute
							    </Link>
								</span>

								<span className=" font-semibold ">
									<FaArrowRight />
								</span>
							</div>
						</div>

						<div className="p-5 m-2 rounded-md w-56 bg-gray-900 shadow-lg">
							<img
								className="rounded-lg hover:scale-105 duration-300 cursor-pointer"
								src="../public/contribute_img2.jpeg"
								alt="AI/ML"
							/>
							<h3 className="text-xl font text-white p-1">
								AI/ML
							</h3>
							<p className="text-md text-gray-300 p-1">
								What is Python?
							</p>
							<div className="flex flex-row justify-start items-center text-white bg-pink-600 p-1 m-1 rounded-lg hover:scale-105 cursor-pointer duration-200">
								<span className="  font-semibold text-white  text-lg no-underline p-1">
								<Link to='/admin'
								className="no-underline"
								style={{ textDecoration: 'none' }} >
									Contribute
							    </Link>
								</span>

								<span className=" font-semibold ">
									<FaArrowRight />
								</span>
							</div>
						</div>

						<div className="p-5 m-2 rounded-md w-56 bg-gray-900 shadow-lg">
							<img
								className="rounded-lg hover:scale-105 duration-300 cursor-pointer"
								src="../public/contribution_img3.jpeg"
								alt="Android Development"
							/>
							<h3 className="text-2xl text-white p-1">
								Android
							</h3>
							<p className="text-md text-gray-300 p-1">
								What is Kotlin?
							</p>

							<div className="flex flex-row justify-start items-center text-white bg-pink-600 p-1 m-1 rounded-lg hover:scale-105 cursor-pointer duration-200">
								<span className="  font-semibold text-white  text-lg no-underline p-1">
								<Link to='/admin'
								className="no-underline"
								style={{ textDecoration: 'none' }} >
									Contribute
							    </Link>
								</span>

								<span className=" font-semibold ">
									<FaArrowRight />
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className=" relative flex justify-center items-center w-11/12  ml-20 p-2 h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black ">
					<div className="absolute bg-transparent top-0 left-0 flex items-center justify-center w-full h-full z-30">
						<div className="bg-transparent flex  justify-between">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-20 mt-11">
								{items.map(
									(
										item,
										index
									) => (
										<Link key={
											index
										} className="no-underline">
											<div
												
												className=" cursor-pointer bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-4 rounded-xl text-center text-lg font-bold shadow-lg transform transition-transform duration-300 hover:scale-105">
												{
													item
												}
											</div>
										</Link>
									)
								)}
							</div>

							<div className="bg-transparent flex flex-col justify-end items-end m-6 mr-20 p-6">
								<h2 className="text-4xl text-end font-bold mb-3 text-gray-50">
									Escape
									the
									matrix
									with
									OpenCourse
								</h2>

								<p className="font-semibold text-gray-100 dark:text-light-50 text-end mr-1">
									<TextGenerateEffect
										words={
											"Master the art of coding, tackle real-world problems, and transform ideas into innovative solutions."
										}
										className={
											"font-semibold text-gray-100 text-end mr-1"
										}
									/>
									<span className="text-transparent bg-gradient-to-r from-green-400 via-green-400 to-blue-500 bg-clip-text">
										<br />
										Grow
										Together!
									</span>
								</p>

								<div className="flex flex-col sm:flex-row justify-end gap-4 p-4">
									<Link
										Course
										to="/userpanel"
										className="bg-c_tech_color hover:bg-pink-300 text-black font-extrabold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-gray-700 focus:outline-none active:bg-c_tech_color">
										Tech
									</Link>

									{/* link for non tech contribution */}
									<Link
										to="/dummynontechcourse"
										className="bg-blue-400 hover:bg-blue-300 text-black font-extrabold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-gray-700 focus:outline-none active:bg-blue-300">
										NonTech
									</Link>
								</div>

								<div className="flex cursor-pointer mr-6">
									<AnimatedTooltip
										items={
											people
										}
									/>
								</div>
								<h6 className="text-gray-50">
									7000+
									Happy
									Students
								</h6>
							</div>
						</div>
					</div>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="hidden">
						<defs>
							<filter id="goo">
								<feGaussianBlur
									in="SourceGraphic"
									stdDeviation="10"
									result="blur"
								/>
								<feColorMatrix
									in="blur"
									mode="matrix"
									values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
									result="goo"
								/>
								<feBlend
									in="SourceGraphic"
									in2="goo"
								/>
							</filter>
						</defs>
					</svg>

					<div
						className="w-full h-full relative"
						style={{ filter: "url(#goo)" }}>
						<div className="absolute g1"></div>
						<div className="absolute g2"></div>
						<div className="absolute g3"></div>
						<div className="absolute g4"></div>
						<div className="absolute g5 rounded-[50%]"></div>
						<div className="absolute interactive"></div>
					</div>
				</div>

				<div className="flex  flex-row   mt-24 justify-center items-center  p-8  ">
					<div className=" w-[60%]  flex flex-row justify-center items-center gap-6">
						{/* link for the interview contribute section  */}
						<div className="group cursor-pointer bg-[#fa6b6b33] hover:bg-[#f38383cc]  w-[45%] mb-12 flex flex-col justify-evenly items-start opacity-80 text-white py-6 px-6 gap-4 rounded-xl  hover:scale-105 duration-300 hover:no-underline focus:outline-none">
							<span className=" flex justify-start items-start relative ">
								<svg
									width="54"
									height="54"
									viewBox="0 0 64 64"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M59.4953 32.0006C72.1292 7.29788 56.6698 -8.11304 31.9995 4.5047C7.29678 -8.12918 -8.11414 7.33017 4.5036 32.0006C-8.13028 56.7032 7.33714 72.1141 31.9995 59.4964C56.7021 72.1303 72.113 56.6629 59.4953 32.0006Z"
										fill="#f98080"
									/>
								</svg>

								<svg
									className=" absolute top-0 bottom-0 left-0 right-0 m-auto"
									xmlns="http://www.w3.org/2000/svg"
									width="36"
									height="36"
									viewBox="0 0 36 36"
									fill="none">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M25.93 5.6047C25.5536 5.77453 25.0509 6.04767 24.3049 6.45434C22.0055 7.70783 18.9051 9.11729 16.125 9.34365V20.6564C18.9051 20.8828 22.0055 22.2922 24.3049 23.5457C25.0509 23.9524 25.5536 24.2255 25.93 24.3954C26.1895 24.5125 26.3055 24.5393 26.332 24.5459C26.4266 24.53 26.4762 24.4999 26.5357 24.4231C26.5429 24.3976 26.573 24.2916 26.5935 24.0327C26.6241 23.6474 26.625 23.1136 26.625 22.3106V7.68947C26.625 6.88651 26.6241 6.35266 26.5935 5.96741C26.573 5.70847 26.5429 5.60252 26.5357 5.57698C26.4762 5.50017 26.4266 5.47009 26.332 5.45413C26.3056 5.4608 26.1895 5.48763 25.93 5.6047ZM28.875 8.72399V7.64165C28.875 6.89921 28.875 6.27464 28.8365 5.7892C28.7995 5.32386 28.7169 4.75789 28.385 4.29383C27.942 3.67465 27.3248 3.30813 26.5691 3.21558C25.9941 3.14515 25.4397 3.35751 25.0046 3.5538C24.5413 3.76286 23.9635 4.07784 23.269 4.45645L23.228 4.47881C20.7355 5.83755 17.7149 7.12504 15.375 7.12504H9.75C5.40076 7.12504 1.875 10.6508 1.875 15C1.875 17.5166 3.05539 19.7574 4.8927 21.199C4.89715 21.2237 4.90244 21.2483 4.90859 21.2729L7.28079 30.7617C7.33718 30.9874 7.38098 31.1628 7.43537 31.3234C7.96316 32.8816 9.36638 33.9772 11.0061 34.1113C11.175 34.1251 11.3558 34.1251 11.5885 34.125L11.6307 34.125C11.649 34.125 11.667 34.125 11.6848 34.1251C11.9748 34.1251 12.1982 34.1252 12.3982 34.1058C14.3615 33.9154 15.9153 32.3616 16.1057 30.3983C16.1251 30.1982 16.1251 29.9748 16.125 29.6848L16.125 22.9154C18.3369 23.1433 20.9944 24.3037 23.228 25.5213L23.2689 25.5436C23.9635 25.9222 24.5413 26.2372 25.0046 26.4463C25.4397 26.6426 25.9941 26.8549 26.5691 26.7845C27.3248 26.692 27.942 26.3254 28.385 25.7063C28.7169 25.2422 28.7995 24.6762 28.8365 24.2109C28.875 23.7254 28.875 23.1009 28.875 22.3584V21.2761C31.8593 20.7447 34.125 18.137 34.125 15C34.125 11.8631 31.8593 9.25534 28.875 8.72399ZM28.875 11.0303V18.9698C30.6064 18.4801 31.875 16.8882 31.875 15C31.875 13.1119 30.6064 11.52 28.875 11.0303ZM13.875 20.625V9.37504H9.75C6.6434 9.37504 4.125 11.8934 4.125 15C4.125 18.1066 6.6434 20.625 9.75 20.625H13.875ZM13.875 22.875V29.6307C13.875 30.0001 13.8737 30.1044 13.8662 30.181C13.7797 31.0735 13.0734 31.7797 12.181 31.8663C12.1044 31.8737 12 31.875 11.6307 31.875C11.3362 31.875 11.2546 31.8741 11.1895 31.8688C10.4442 31.8078 9.80634 31.3098 9.56644 30.6016C9.54548 30.5397 9.5248 30.4608 9.45338 30.1751L7.55057 22.5638C8.2486 22.7664 8.98661 22.875 9.75 22.875H13.875Z"
										fill="white"></path>
								</svg>
							</span>

							<Link
								to="/interview"
								className="text-lg flex items-center hover:no-underline no-underline  space-x-2 bg-[#f98080] px-4 py-2 rounded-lg group-hover:text-white font-semibold text-black">
								<span>
									Contribute
								</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-black group-hover:text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</Link>

							<span className="highlight w-[] text-sm font-light group-hover:text-white    text-gray-600 ">
								Share your
								knowledge and
								help others
								prepare for
								their interviews
							</span>
						</div>

						{/* link for the interview practice section  */}
						<div className=" group bg-[#54d38e33] cursor-pointer   w-[50%] mb-12 flex flex-col justify-evenly items-start  opacity-90 text-gray-50 py-6 px-6 gap-4 rounded-xl hover:bg-[#4b8a67] hover:scale-105 duration-300 hover:no-underline focus:outline-none">
							<span className=" flex justify-start items-start relative ">
								<svg
									width="54"
									height="54"
									viewBox="0 0 64 64"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M59.4953 32.0006C72.1292 7.29788 56.6698 -8.11304 31.9995 4.5047C7.29678 -8.12918 -8.11414 7.33017 4.5036 32.0006C-8.13028 56.7032 7.33714 72.1141 31.9995 59.4964C56.7021 72.1303 72.113 56.6629 59.4953 32.0006Z"
										fill="#46fc98"
									/>
								</svg>

								<svg
									className=" absolute top-0 bottom-0 left-0 right-0 m-auto"
									xmlns="http://www.w3.org/2000/svg"
									width="36"
									height="36"
									viewBox="0 0 36 36"
									fill="none">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M2.20453 2.20453C2.48165 1.9274 2.88302 1.81447 3.26399 1.90643L23.5243 6.79685C23.56 6.80546 23.596 6.81405 23.6321 6.82268C24.0597 6.92474 24.5159 7.03363 24.9008 7.28455C25.2354 7.50277 25.5158 7.79449 25.7207 8.13749C25.9562 8.53191 26.0471 8.99208 26.1322 9.42334C26.1394 9.45983 26.1465 9.49611 26.1537 9.53213L27.7674 17.6006C28.2722 17.4539 28.8101 17.462 29.3112 17.6248C29.6799 17.7446 29.9695 17.9497 30.2141 18.1573C30.4409 18.3498 30.6917 18.6006 30.9647 18.8737L32.1262 20.0352C32.3994 20.3083 32.6502 20.5592 32.8428 20.786C33.0504 21.0305 33.2554 21.3201 33.3752 21.6889C33.5465 22.2161 33.5465 22.784 33.3752 23.3112C33.2554 23.6799 33.0504 23.9695 32.8428 24.2141C32.6503 24.4408 32.3994 24.6916 32.1264 24.9647L24.9648 32.1262C24.6917 32.3994 24.4409 32.6502 24.2141 32.8428C23.9695 33.0504 23.6799 33.2554 23.3112 33.3752C22.784 33.5465 22.2161 33.5465 21.6889 33.3752C21.3201 33.2554 21.0305 33.0504 20.786 32.8428C20.5592 32.6503 20.3084 32.3994 20.0354 32.1264L18.8737 30.9647C18.6006 30.6917 18.3498 30.4409 18.1573 30.2141C17.9497 29.9695 17.7446 29.6799 17.6248 29.3112C17.462 28.8101 17.4539 28.2722 17.6006 27.7674L9.53213 26.1537C9.49611 26.1465 9.45983 26.1394 9.42334 26.1322C8.99208 26.0471 8.53191 25.9562 8.13749 25.7207C7.79449 25.5158 7.50277 25.2354 7.28455 24.9008C7.03363 24.5159 6.92474 24.0597 6.82268 23.6321C6.81405 23.596 6.80546 23.56 6.79685 23.5243L1.90643 3.26399C1.81447 2.88302 1.9274 2.48165 2.20453 2.20453ZM19.1303 25.7788L25.7788 19.1303L23.9474 9.97338C23.8902 9.68745 23.857 9.52411 23.8246 9.40288C23.8047 9.32832 23.7921 9.29811 23.7884 9.29022C23.7594 9.24192 23.7198 9.20079 23.6727 9.16988C23.665 9.16587 23.6353 9.15208 23.5616 9.12922C23.4417 9.09207 23.2798 9.05245 22.9963 8.98403L6.62278 5.03179L14.4887 12.8977C15.0837 12.5648 15.7697 12.375 16.5 12.375C18.7782 12.375 20.625 14.2218 20.625 16.5C20.625 18.7782 18.7782 20.625 16.5 20.625C14.2218 20.625 12.375 18.7782 12.375 16.5C12.375 15.7697 12.5648 15.0837 12.8977 14.4887L5.03179 6.62278L8.98403 22.9963C9.05245 23.2798 9.09207 23.4417 9.12922 23.5616C9.15208 23.6353 9.16587 23.665 9.16988 23.6727C9.20079 23.7198 9.24191 23.7594 9.29021 23.7884C9.29809 23.7921 9.32829 23.8047 9.40288 23.8246C9.52411 23.857 9.68745 23.8902 9.97338 23.9474L19.1303 25.7788ZM9.28799 23.7873C9.28811 23.7873 9.28895 23.7877 9.29021 23.7884L9.28799 23.7873ZM9.1711 23.6749C9.17108 23.6749 9.17063 23.6742 9.16988 23.6727L9.1711 23.6749ZM15.1563 15.1923C14.8275 15.5301 14.625 15.9914 14.625 16.5C14.625 17.5356 15.4645 18.375 16.5 18.375C17.5356 18.375 18.375 17.5356 18.375 16.5C18.375 15.4645 17.5356 14.625 16.5 14.625C16.0442 14.625 15.5994 14.7816 15.1563 15.1923Z"
										fill="white"
									/>
								</svg>
							</span>
							<Link
								to="/interviewprep"
								className="text-lg flex items-center  hover:no-underline no-underline space-x-2 bg-[#50c685] px-4 py-2 rounded-lg group-hover:text-white font-semibold text-black">
								<span>
									Interview
									Practice
								</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-black group-hover:text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</Link>
							<span className="highlight w-[] text-sm font-light group-hover:text-white   text-gray-600 ">
								Practice with
								real-world
								interview
								questions and
								scenarios
							</span>
						</div>
					</div>
				</div>
{/* 

				<div className="bg-bg-dark mt-10  w-[88%] h-[300px] ml-20 text-gray-100  flex justify-center items-center  rounded-3xl z-50  ">
					<GlowCursor>
						<div className="flex flex-row  justify-evenly space-x-4 mt-24 ">
							<div className=" bg-dark-500  ">


								<div class="outer-a">
									<div className="dot-a"></div>
									<div className="card-a">
										<div className="ray-a"></div>
										<div className="text-a text-4xl">
											750k
										</div>
										<div className="text-2xl">
											Views
										</div>
										<div className="line-a topl-a"></div>
										<div className="line-a leftl-a"></div>
										<div className="line-a bottoml-a"></div>
										<div className="line-a rightl-a"></div>
									</div>

								</div>


							</div>

							<div>
							<div class="outer-a">
									<div className="dot-a"></div>
									<div className="card-a">
										<div className="ray-a"></div>
										<div className="text-a text-4xl">
											200+
										</div>
										<div className="text-2xl">
											courses
										</div>
										<div className="line-a topl-a"></div>
										<div className="line-a leftl-a"></div>
										<div className="line-a bottoml-a"></div>
										<div className="line-a rightl-a"></div>
									</div>

								</div>
							</div>

							<div>
							<div class="outer-a">
									<div className="dot-a"></div>
									<div className="card-a">
										<div className="ray-a"></div>
										<div className="text-a text-4xl">
											30K
										</div>
										<div className="text-">
											learners
										</div>
										<div className="line-a topl-a"></div>
										<div className="line-a leftl-a"></div>
										<div className="line-a bottoml-a"></div>
										<div className="line-a rightl-a"></div>
									</div>

								</div>
							</div>
						</div>
					</GlowCursor>
				</div>
 */}


				<div className="  flex  justify-center items-center p-6 mt-14 ">
					<div class="cards">
						<div className="card red">
							<p className="tip">
								Web Roadmap
							</p>
							{/* <p className="second-text">
							             Best Courses of Every contributer
							            </p> */}
						</div>
						<div className="card blue">
							<p class="tip">
								Blockchain
							</p>
							{/* <p className="second-text">
							Best Courses of Every contributer
							</p> */}
						</div>
						<div className="card green">
							<p class="tip">
								Android Roadmap
							</p>
							{/* <p className="second-text">
							Best Courses of Every contributer
							</p> */}
						</div>

						<div className="card blue">
							<p class="tip">
								Blockchain
							</p>
							{/* <p className="second-text">
							Best Courses of Every contributer
							</p> */}
						</div>
					</div>
				</div>

				<div className="bg-bg-dark mt-16">
					<Footer />
				</div>
			</div>
		</>
	);
}

export default App;
