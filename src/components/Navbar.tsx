import { useEffect, useRef, useState } from "react";
import { HashLink as NavHashLink } from "react-router-hash-link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-white shadow">
      <nav className="w-full">
        <div className="flex justify-between items-center text-gray-700 px-4 py-3">
          <p className="text-xl font-bold">Thomas Schwabauer</p>

          <ul className="hidden md:flex space-x-4 text-base font-semibold cursor-pointer">
            <li className="hover:bg-gray-200 py-2 px-4">
              <NavHashLink smooth to="/#landing">
                Home
              </NavHashLink>
            </li>
            <li className="hover:bg-gray-200 py-2 px-4">
              <NavHashLink smooth to="/#about">
                About
              </NavHashLink>
            </li>
            <li className="hover:bg-gray-200 py-2 px-4">
              <NavHashLink smooth to="/#work">
                Work
              </NavHashLink>
            </li>
            <li className="hover:bg-gray-200 py-2 px-4">
              <NavHashLink smooth to="/#projects">
                Projects
              </NavHashLink>
            </li>
            <li className="hover:bg-gray-200 py-2 px-4">
              <NavHashLink smooth to="/#documents">
                Documents
              </NavHashLink>
            </li>
            <li className="hover:bg-gray-200 py-2 px-4">
              <NavHashLink smooth to="/#contact">
                Contact
              </NavHashLink>
            </li>
          </ul>

          <button
            className="block md:hidden py-3 px-4 rounded focus:outline-none hover:bg-gray-200"
            onClick={toggleMenu}
          >
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600"></div>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 h-screen w-8/12 bg-white border transition-all duration-300 ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex flex-col w-full text-base cursor-pointer pt-10 text-left">
            <ul className="list-none p-0 m-0">
              <li className="hover:bg-gray-200 py-4 px-6 w-full">
                <NavHashLink smooth to="/#home" onClick={toggleMenu}>
                  Home
                </NavHashLink>
              </li>
              <li className="hover:bg-gray-200 py-4 px-6 w-full">
                <NavHashLink smooth to="/#about" onClick={toggleMenu}>
                  About me
                </NavHashLink>
              </li>
              <li className="hover:bg-gray-200 py-4 px-6 w-full">
                <NavHashLink smooth to="/#work" onClick={toggleMenu}>
                  Work
                </NavHashLink>
              </li>
              <li className="hover:bg-gray-200 py-4 px-6 w-full">
                <NavHashLink smooth to="/#projects" onClick={toggleMenu}>
                  Projects
                </NavHashLink>
              </li>
              <li className="hover:bg-gray-200 py-4 px-6 w-full">
                <NavHashLink smooth to="/#documents" onClick={toggleMenu}>
                  Documents
                </NavHashLink>
              </li>
              <li className="hover:bg-gray-200 py-4 px-6 w-full">
                <NavHashLink smooth to="/#contact" onClick={toggleMenu}>
                  Contact
                </NavHashLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
