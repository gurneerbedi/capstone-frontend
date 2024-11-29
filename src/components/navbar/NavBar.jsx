import React from "react";
import {Link} from "react-router-dom";
import "./NavBar.scss";
import LogoImg from "../assets/Images/StoryWaveLogo.jpg";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/" className="navbar__link">
                    <img src={LogoImg} alt="LogoImage" />
                </Link>
            </div>
            <ul className="navbar__menu">
                <li className="navbar__item">
                    <Link to="/discover" className="navbar__link">
                        Discover{" "}
                    </Link>
                </li>
                <li className="navbar__item">
                    <Link to="/login" className="navbar__link">
                        Login / Sign Up
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
export default NavBar;
