import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bestsellercarousel from "../components/bestsellers/Bestsellercarousel";
import NavBar from "../components/navbar/NavBar";
import "./HomePage.scss";
import heroVideo from "../assets/Images/hero.mp4";
import LogoImage from "../assets/Images/StoryWaveLogo.jpg";

function HomePage() {
    return (
        <div className="homepage">
            <NavBar />
            <div className="homepage__hero">
                <video
                    className="homepage__hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <h1 className="homepage-hero__title"></h1>
            </div>
            <div className="homepage__header">
                {/* <h1 className="homepage__title"><img className = "homepage__logoimg" src={LogoImage} alt="storywavelogo"/></h1> */}
                <p className="homepage__slogan">
                    Because the right story starts with you
                </p>
            </div>
            <section className="homepage__carousel">
                <Bestsellercarousel />
            </section>
            <footer className="homepage__footer">
                <p>© 2024 StoryWave. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
