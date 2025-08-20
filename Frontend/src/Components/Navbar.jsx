import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // 👈 REQUIRED to ensure user is logged out
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setToken(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);

    if (!currentToken) {
      navigate("/login");
    } else {
      setDropdownOpen((prev) => !prev);
    }
  };

  // ✅ Update token on route change
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]);

  // Keep your storage listener for multi-tab login/logout sync
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <nav className="w-full bg-black text-white px-6 py-4 flex items-center justify-between z-50 relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Cars Buddy"
            style={{ height: "80px" }}
            className=" w-auto"
          />
          <div>
            <h1 className="text-4xl font-bold">
              <span className="text-yellow-400">Cars</span>Buddy
            </h1>
            <p className="text-sm text-center">
              <span className="text-yellow-400">personalized Car Care</span>
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex flex-row space-x-6 font-medium text-base">
          {/* <li className="text-yellow-400 font-bold cursor-pointer">Homepage</li> */}
          <Link to="/" className="hover:text-yellow-400 cursor-pointer">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-400 cursor-pointer">
            About Us
          </Link>
          <Link
            to="/servicespage"
            className="hover:text-yellow-400 cursor-pointer"
          >
            Services
          </Link>

          <Link to="/contact" className="hover:text-yellow-400 cursor-pointer">
            Contact Us
          </Link>
          {/* <li className="hover:text-yellow-400 cursor-pointer" onClick={handleLogout}>logout</li> */}
        </ul>

        {/* Right side profile icon */}

        <div className="hidden md:flex items-center space-x-2 relative">
          <div
            className="flex items-center space-x-1 cursor-pointer hover:text-yellow-400"
            onClick={handleProfileClick}
          >
            <FaUserCircle size={28} />
            {token && <FaChevronDown size={14} />}
          </div>

          {!token && (
            <Link to="/Login">
              <button className="cursor-pointer hover:text-yellow-400">
                Login
              </button>
            </Link>
          )}

          {dropdownOpen && token && (
            <div className="absolute top-1 mt-12 w-40 bg-white text-black rounded shadow-lg">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profilepage");
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Make Appointment Button - Desktop */}
        <Link to="/Contact">
          <button className="hidden md:block border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold">
            Make Appointment
          </button>{" "}
        </Link>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X className="text-yellow-400 h-7 w-7" />
            ) : (
              <Menu className="text-yellow-400 h-7 w-7" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-black text-white z-50 shadow-md"
          >
            {/* Header in mobile menu */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="Cars Buddy" className="h-8 w-auto" />
                <span className="text-xl font-bold">
                  <span className="text-yellow-400">Cars</span>Buddy
                </span>
              </div>
              <button onClick={toggleMenu}>
                <X className="text-yellow-400 h-7 w-7" />
              </button>
            </div>

            {/* Menu links */}
            <ul className="flex flex-col px-6 py-6 space-y-6 text-lg">
              <Link to="/" className="hover:text-yellow-400 cursor-pointer">
                Homepage
              </Link>
              <Link
                to="/about"
                className="hover:text-yellow-400 cursor-pointer"
              >
                About Us
              </Link>
              <Link
                to="/servicespage"
                className="hover:text-yellow-400 cursor-pointer"
              >
                Services
              </Link>
              <li className="hover:text-yellow-400 cursor-pointer">Gallery</li>
              <Link
                to="/contact"
                className="hover:text-yellow-400 cursor-pointer"
              >
                Contact Us
              </Link>

              <li
                className="hover:text-yellow-400 cursor-pointer flex items-center justify-between"
                onClick={handleProfileClick}
              >
                <div className="flex items-center space-x-2">
                  <FaUserCircle size={22} />
                  <span>{token ? "Profile" : "Login"}</span>
                </div>
                {token && (
                  <FaChevronDown
                    className={`transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </li>

              {/* Dropdown items */}
              {dropdownOpen && (
                <ul className="ml-8 mt-2 text-sm text-gray-300 space-y-2">
                  {token ? (
                    <>
                      <li>
                        <Link
                          to="/profilepage"
                          className="hover:text-yellow-400"
                          onClick={() => setDropdownOpen(false)}
                        >
                          My Profile
                        </Link>
                      </li>
                      <li
                        className="hover:text-yellow-400 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link
                        to="/login"
                        className="hover:text-yellow-400"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </ul>

            {/* Make Appointment Button */}
            <div className="px-6">
              <button className="w-full border border-white px-5 py-3 rounded-full hover:bg-white hover:text-black transition font-semibold">
                Make Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
