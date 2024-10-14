import React, { useState } from 'react';
import Timeline1 from '../Components/Timeline';

// Sample data for course roadmap and videos
const courseData = {
    webDevelopment: {
        roadmap: [
            'HTML & CSS Basics',
            'JavaScript Fundamentals',
            'Responsive Design',
            'Frontend Frameworks (e.g., React)',
            'Backend Development (e.g., Node.js)',
            'Deployment and Hosting',
        ],
        videos: [
            { id: 1, title: 'HTML Basics', videoUrl: 'https://www.youtube.com/embed/XXXXX' },
            { id: 2, title: 'CSS Fundamentals', videoUrl: 'https://www.youtube.com/embed/YYYYY' },
            { id: 3, title: 'JavaScript Introduction', videoUrl: 'https://www.youtube.com/embed/ZZZZZ' },
        ],
    },
    dataScience: {
        roadmap: [
            'Introduction to Python',
            'Data Analysis with Pandas',
            'Data Visualization',
            'Machine Learning Basics',
            'Deep Learning Concepts',
            'Project Development',
        ],
        videos: [
            { id: 1, title: 'Python Basics', videoUrl: 'https://www.youtube.com/embed/AAAAA' },
            { id: 2, title: 'Data Analysis with Pandas', videoUrl: 'https://www.youtube.com/embed/BBBBB' },
        ],
    },
};

const UserPanel = () => {
    const [selectedCategory, setSelectedCategory] = useState('webDevelopment');
    
    // Extract the roadmap and videos for the selected category
    const selectedRoadmap = courseData[selectedCategory].roadmap;

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Explore Tech Courses</h1>

            <div className="mb-6 text-center">
                <button
                    onClick={() => handleCategoryChange('webDevelopment')}
                    className={`mr-4 px-6 py-3 rounded-lg transition-colors duration-300 ${selectedCategory === 'webDevelopment' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
                >
                    Web Development
                </button>
                <button
                    onClick={() => handleCategoryChange('dataScience')}
                    className={`px-6 py-3 rounded-lg transition-colors duration-300 ${selectedCategory === 'dataScience' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
                >
                    Data Science
                </button>
            </div>

            {/* Course Roadmap Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Course Roadmap</h2>
                {/* Dynamically rendering the Timeline1 component based on selected category */}
                <Timeline1 data={selectedRoadmap} />
            </div>

            {/* Video Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courseData[selectedCategory].videos.map((video) => (
                    <div key={video.id} className="bg-white shadow-xl rounded-lg p-6 flex flex-col">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{video.title}</h3>
                        <iframe
                            width="100%"
                            height="215"
                            src={video.videoUrl}
                            title={video.title}
                            frameBorder="0"
                            allowFullScreen
                            className="rounded-lg"
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPanel;
