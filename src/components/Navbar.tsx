import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

export default function Navbar() {
    return (
        <div className="sticky top-0 w-screen z-10">
            <nav className="bg-white w-screen shadow">
                <div className="flex justify-between items-center text-gray-700">
                    <p className="pl-4 py-4 text-xl font-bold">Thomas Schwabauer</p>
                    <ul className="hidden md:flex center pr-10 text-base font-semibold cursor-pointer">
                        <li className="hover:bg-gray-200 py-4 px-6">
                            <NavHashLink to="/#landing" smooth={true}>Home</NavHashLink>
                        </li>
                        {/*<li className="hover:bg-gray-200 py-4 px-6">*/}
                        {/*    <NavHashLink to="/#services" smooth={true}>Services</NavHashLink>*/}
                        {/*</li>*/}
                        {/* Add a link to the Projects section */}
                        <li className="hover:bg-gray-200 py-4 px-6">
                            <NavHashLink to="/#projects" smooth={true}>Projects</NavHashLink>
                        </li>
                        <li className="hover:bg-gray-200 py-4 px-6">
                            <NavHashLink to="/#about" smooth={true}>About me</NavHashLink>
                        </li>
                        <div className="w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100" />
                        <li className="hover:bg-gray-200 py-4 px-6">
                            <Link to="/blog">Blog</Link>
                        </li>
                    </ul>
                    <button
                        className="block md:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-gray-200 group"
                    >
                        <div className="w-5 h-1 bg-gray-600 mb-1"></div>
                        <div className="w-5 h-1 bg-gray-600 mb-1"></div>
                        <div className="w-5 h-1 bg-gray-600"></div>
                        <div
                            className="absolute top-0 -right-full h-screen w-8/12 bg-white border opacity-0 group-focus:right-0 group-focus:opacity-100 transition-all duration-300"
                        >
                            <ul
                                className="flex flex-col items-center w-full text-base cursor-pointer pt-10 z-0"
                            >
                                <li className="hover:bg-gray-200 py-4 px-6 w-full"><Link to="/#home">Home</Link></li>
                                <li className="hover:bg-gray-200 py-4 px-6 w-full"><Link to="/#services">Services</Link></li>
                                <li className="hover:bg-gray-200 py-4 px-6 w-full"><Link to="/#projects">Projects</Link></li>
                                <li className="hover:bg-gray-200 py-4 px-6 w-full"><Link to="/#about">About me</Link></li>
                                <li className="hover:bg-gray-200 py-4 px-6 w-full"><Link to="/blog">Blog</Link></li>
                            </ul>
                        </div>
                    </button>
                </div>
            </nav>
        </div>
    );
}
