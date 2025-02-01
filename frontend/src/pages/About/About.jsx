import React, { useEffect } from "react";
import styled from "styled-components";

// Styled Components for CSS Animations
const MissionVisionBox = styled.div`
	color: white;
	border-radius: 1rem;
	padding: 2rem;
	opacity: 0;
	transform: translateX(-100%); /* Mission Box starts from the left */
	transition: opacity 1s ease-out, transform 1s ease-out;

	/* Animation when the element comes into view */
	&.in-view {
		opacity: 1;
		transform: translateX(0);
	}

	/* For Vision Box */
	&.vision-box {
		transform: translateX(100%);
	}

	&.in-view.vision-box {
		transform: translateX(0);
	}

	/* Hover effect */
	&:hover {
		transform: scale(1.05);
		transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
	}
`;

const p = styled.p`
	text-align: center;
	color: #e2e8f0;
	max-width: 50%;
	margin: 20px auto;
	opacity: 0;
	transform: translateY(100px);
  font-size: 22px;
	transition: opacity 1s ease-out, transform 1s ease-out;

	&.in-view {
		opacity: 1;
		transform: translateY(0);
	}
`;

const Card = styled.div`
	background: rgb(14, 13, 13);
	border-radius: 1rem;
	padding: 2rem;
	opacity: 0;
	transform: translateY(50px);
	transition: opacity 1s ease-out, transform 1s ease-out;

	&.in-view {
		opacity: 1;
		transform: translateY(0);
	}

	&:hover {
		transform: scale(1.05);
		transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
	}
`;

const CallToAction = styled.div`
	opacity: 0;
	transform: translateY(50px);
	transition: opacity 1s ease-out, transform 1s ease-out;

	&.in-view {
		opacity: 1;
		transform: translateY(0);
	}
`;

const About = () => {
	// Intersection Observer for scroll animations
	useEffect(() => {
		const animateOnScroll = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("in-view");
				}
			});
		};

		const observer = new IntersectionObserver(animateOnScroll, {
			threshold: 0.2, // Trigger when 20% of the element is in view
		});

		const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
		elementsToAnimate.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	return (
		<div className="font-sans bg-black text-gray-900 dark:text-gray-100">
			{/* Story Section */}
			<div className="py-20 text-white">
				<div className="max-w-7xl mx-auto px-6 text-center animate-on-scroll">
					<h2 className="text-3xl text-center font-bold mb-6">Why We Created This Platform</h2>
          <hr />
					<p className="animate-on-scroll text-lg mt-3">
						Like many learners, we began our journey searching for the right resources to enhance our knowledge. We turned to platforms like YouTube, hoping to find courses that would help us master new topics. But more often than not, we found ourselves frustrated—either the courses were incomplete, hard to understand, or simply not available for the topics we wanted to learn.
					</p>
					<p className="animate-on-scroll text-lg mt-3">
						It was then that we realized: what if there was a place where *everyone* could contribute? A place where learners could not only access high-quality, structured content but also share their own insights and expertise with others. And so, we decided to build a platform where anyone could upload their own learning resources—whether videos, tutorials, or written guides—and contribute to the global learning community.
					</p>
					<p className="animate-on-scroll text-lg mt-3">
						Whether you're a beginner exploring new topics or an expert sharing your knowledge, our mission is to make learning accessible to everyone, everywhere. Welcome to Learn & Share—your new hub for collaborative education.
					</p>
          <hr />
				</div>
			</div>

			{/* Mission and Vision */}
			<div className="py-10 text-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<MissionVisionBox className="animate-on-scroll">
							<h2 className="text-3xl font-bold mb-4">Our Mission</h2>
							<p className="text-lg leading-relaxed">
								Our mission is simple: to provide a platform where individuals can learn, grow, and contribute their knowledge to the world. We believe that learning is a continuous journey, and every person has something valuable to offer.
							</p>
						</MissionVisionBox>
						<MissionVisionBox className="animate-on-scroll vision-box">
							<h2 className="text-3xl font-bold mb-4">Our Vision</h2>
							<p className="text-lg leading-relaxed">
								We envision a world where education is a universal resource, freely available to anyone, anytime, anywhere. Our vision is to create a collaborative environment where knowledge is shared, and anyone can be both a student and a teacher.
							</p>
						</MissionVisionBox>
					</div>
				</div>
			</div>

			{/* How We Work Section */}
			<div className="py-20 text-white">
				<div className="max-w-7xl mx-auto px-6 text-center animate-on-scroll">
        <hr />
					<h2 className="text-4xl font-bold mb-12">How We Work</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
						<Card className="animate-on-scroll">
							<h3 className="text-xl font-bold mb-2 text-teal-400">Explore</h3>
							<p className="text-lg text-gray-300">
								Browse through a wide variety of topics, from technology and business to arts and sciences. Expand your horizons by discovering new subjects that align with your interests.
							</p>
						</Card>
						<Card className="animate-on-scroll">
							<h3 className="text-xl font-bold mb-2 text-teal-400">Learn</h3>
							<p className="text-lg text-gray-300">
								Dive deep into engaging, high-quality content created by experts. Whether you're a beginner or looking to master a topic, we offer learning paths designed for all levels.
							</p>
						</Card>
						<Card className="animate-on-scroll">
							<h3 className="text-xl font-bold mb-2 text-teal-400">Contribute</h3>
							<p className="text-lg text-gray-300">
								Have expertise in a field? Share your knowledge by contributing educational resources, tutorials, or courses. Help others grow by making learning accessible to all.
							</p>
						</Card>
					</div>
          <hr />
				</div>
			</div>

			{/* Call-to-Action Section */}
			<div className="py-20 text-white">
				<div className="max-w-7xl mx-auto px-6 text-center">
					<CallToAction className="animate-on-scroll">
						<h2 className="text-4xl font-extrabold mb-6">Join Our Community</h2>
						<p className="text-lg mb-8 max-w-3xl mx-auto">
							Ready to start learning or share your knowledge? Join us today and be part of a global community that’s passionate about learning, growing, and contributing.
						</p>
						<button className="bg-white text-teal-600 px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-teal-600 hover:text-white transition duration-300 transform hover:scale-105">
							Get Started
						</button>
					</CallToAction>
				</div>
			</div>
		</div>
	);
};

export default About;