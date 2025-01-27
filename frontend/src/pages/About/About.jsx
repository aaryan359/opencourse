import React from 'react';

const About = () => {
  return (
    <div className="bg-bg-dark text-gray-50 font-sans">
      {/* Header Section */}
      <div className=" text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-6">About Us</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Empowering learners with free, high-quality courses designed to help them achieve their dreams and unlock their full potential.
          </p>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 ">Our Mission</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              To make education accessible to everyone by providing free, open, and high-quality courses that cater to diverse learning needs and empower individuals globally.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 ">Our Vision</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              A world where knowledge is not a privilege but a right. We aim to create an environment that enables everyone to achieve their fullest potential through equal access to education.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className=" py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">Meet the Team</h2>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Jane Doe", role: "CEO & Founder" },
              { name: "John Smith", role: "Lead Developer" },
              { name: "Emily Johnson", role: "Content Strategist" },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mb-6"></div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className=" py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Join Us on Our Journey</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Whether you're a learner or an educator, become a part of our mission to make education free and accessible to all.
          </p>
          <button className="px-8 py-3 rounded-full font-bold shadow-md  transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
