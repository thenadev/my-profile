import React from 'react';
import moment from "moment";

const getAge = () => {
    return moment().diff('04.06.1997', 'years')
}

const AboutMe: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100" id="about">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
                <div className="text-left max-w-xl mx-auto">
                    <p className="text-lg text-gray-700">
                        I am a passionate software developer with a strong background in computer science. I have a Bachelor's degree in Computer Science from Technische Hochschule Mittelhessen.
                    </p>
                    <p className="text-lg text-gray-700 mt-4">
                        During my career, I have worked on various projects, including web applications, mobile apps, and backend systems. My skills include React, Node.js, TypeScript, and much more.
                    </p>
                    <p className="text-lg text-gray-700 mt-4">
                        I am dedicated to continuously learning and improving my skills to stay up-to-date with the latest technologies in the field of software development.
                    </p>
                    <p className="text-lg text-gray-700 mt-4">
                        Age: {getAge()}
                    </p>
                    {/* Add additional relevant information here */}
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
