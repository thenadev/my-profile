import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900">404</h1>
                <p className="text-2xl text-gray-700">Page Not Found</p>
                <p className="text-gray-600 mt-2">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Link
                    to="/"
                    className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
