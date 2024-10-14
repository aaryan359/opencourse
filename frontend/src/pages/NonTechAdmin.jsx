import React from 'react';
import { Link } from 'react-router-dom';

const NonTechAdmin = () => {
    const keyMetrics = {
        totalUsers: 150,
        totalPosts: 75,
        totalComments: 200,
        alerts: 5,
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600">{keyMetrics.totalUsers}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-700">Total Posts</h3>
                    <p className="text-3xl font-bold text-blue-600">{keyMetrics.totalPosts}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-700">Total Comments</h3>
                    <p className="text-3xl font-bold text-blue-600">{keyMetrics.totalComments}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-700">Alerts</h3>
                    <p className="text-3xl font-bold text-blue-600">{keyMetrics.alerts}</p>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-5 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
                <ul className="space-y-2">
                    <li>
                        <Link to="/users" className="text-blue-500 hover:underline">Manage Users</Link>
                    </li>
                    <li>
                        <Link to="/content" className="text-blue-500 hover:underline">Manage Content</Link>
                    </li>
                    <li>
                        <Link to="/media" className="text-blue-500 hover:underline">Media Library</Link>
                    </li>
                    <li>
                        <Link to="/comments" className="text-blue-500 hover:underline">Moderate Comments</Link>
                    </li>
                    <li>
                        <Link to="/settings" className="text-blue-500 hover:underline">Settings</Link>
                    </li>
                </ul>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-5">
                <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
                <p className="text-gray-600 mb-4">View detailed reports on user engagement and content performance.</p>
                <Link to="/analytics" className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                    View Analytics
                </Link>
            </div>
        </div>
    );
};

export default NonTechAdmin;
