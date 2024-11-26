import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bestsellercarousel from "../components/bestsellers/Bestsellercarousel";
import NavBar from "../components/navbar/NavBar";
import "./HomePage.scss";

function HomePage() {
    return (
        <div className="homepage">
            <NavBar />
            <div className="homepage__header">
                <h1 className="homepage__title">StoryWave</h1>
                <p className="homepage__slogan">
                    A good story starts with *you.*
                </p>
            </div>
            <section className="homepage__carousel">
                <h2 className="homepage__carousel-title">
                    add text here later
                </h2>
                <Bestsellercarousel />
            </section>
        </div>
    );
}

export default HomePage;
