import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Header Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg">
            Empowering learners with free, high-quality courses to achieve their goals.
          </p>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p>
              To make education accessible to everyone by providing free, open, and high-quality
              courses that cater to diverse learning needs.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p>
              A world where knowledge is not a privilege but a right, enabling individuals to
              reach their fullest potential.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="h-24 w-24 mx-auto rounded-full bg-blue-500 mb-4"></div>
              <h3 className="text-xl font-bold">Jane Doe</h3>
              <p className="text-sm text-gray-600">CEO & Founder</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="h-24 w-24 mx-auto rounded-full bg-blue-500 mb-4"></div>
              <h3 className="text-xl font-bold">John Smith</h3>
              <p className="text-sm text-gray-600">Lead Developer</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="h-24 w-24 mx-auto rounded-full bg-blue-500 mb-4"></div>
              <h3 className="text-xl font-bold">Emily Johnson</h3>
              <p className="text-sm text-gray-600">Content Strategist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
          <p className="text-lg mb-8">
            Whether you're a learner or an educator, be part of the movement to make education
            free and accessible to all.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold shadow-md hover:bg-gray-100">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
