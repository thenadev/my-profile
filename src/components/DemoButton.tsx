import React from "react";

export interface DemoButtonProps {
    livePreviewLink: string;
    className?: string;
}

const DemoButton: React.FC<DemoButtonProps> = ({ livePreviewLink, className }) => {
    return (
        <div className={className}>
            <a href={livePreviewLink} target="_blank" rel="noreferrer">
                <button
                    type="button"
                    className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                    style={{ backgroundColor: "#007bff" }} // Customize the button color
                >
                    Demo
                </button>
            </a>
        </div>
    );
};

export default DemoButton;
