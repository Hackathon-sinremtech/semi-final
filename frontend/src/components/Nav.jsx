import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import UserCardImage from "../pages/UserPages/UserCardImage";

const Nav = () => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Optional: Show a loading state if authentication is being determined
  if (loading) {
    return null; // or a loading spinner
  }

  const handleButtonClick = () => {
    if (isLoggedIn) {
      setShowPopup((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 backdrop-blur-lg bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">DocSphere</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600 transition-colors"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/Doctors"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600 transition-colors"
              }
            >
              Doctors
            </NavLink>
            <NavLink
              to="/Appointments"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600 transition-colors"
              }
            >
              Appointments
            </NavLink>
          </div>

          {/* Auth Button and Popup */}
          <div className="flex items-center gap-4 relative">
            <button
              onClick={handleButtonClick}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              {isLoggedIn ? "Profile" : "Get Started"}
            </button>

            {isLoggedIn && showPopup && (
              <div className="absolute right-0 top-full mt-2 z-50">
                <UserCardImage />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;