import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import LogoImg from "../../assets/Images/StoryWaveLogo.jpg";

const NavBar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Mocked user check - replace with actual authentication logic
    const user = localStorage.getItem("user"); // Assuming you store user data in localStorage

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/" className="navbar__link">
                    <img src={LogoImg} alt="StoryWave Logo" />
                </Link>
            </div>
            <ul className="navbar__menu">
                <li className="navbar__item">
                    <Link to="/discover" className="navbar__link">
                        Discover
                    </Link>
                </li>
                {!user ? (
                    <li className="navbar__item">
                        <Link to="/login" className="navbar__link">
                            Login / Sign Up
                        </Link>
                    </li>
                ) : (
                    <li className="navbar__item navbar__dropdown">
                        <button
                            className="navbar__link"
                            onClick={toggleDropdown}
                        >
                            My Account
                        </button>
                        {isDropdownOpen && (
                            <ul className="navbar__dropdown-menu">
                                <li>
                                    <Link
                                        to="/reading-tracker"
                                        className="navbar__dropdown-link"
                                    >
                                        View Reading Tracker
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="navbar__dropdown-link"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
