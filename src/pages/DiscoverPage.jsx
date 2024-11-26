import React from "react";
import { Link } from "react-router-dom"; 
import {
    FaHeart,
    FaSmile,
    FaSadTear,
    FaMapMarkedAlt,
    FaLightbulb,
    FaLeaf,
} from "react-icons/fa";
import "./discoverpage.scss";

const moods = [
    {
        name: "Romantic",
        icon: <FaHeart />,
        description: "Fall in love with these stories.",
        color: "#FF6F61",
    },
    {
        name: "Happy",
        icon: <FaSmile />,
        description: "Books that lift your spirits.",
        color: "#FFD700",
    },
    {
        name: "Sad",
        icon: <FaSadTear />,
        description: "Heart-wrenching tales that tug at your emotions.",
        color: "#6A5ACD",
    },
    {
        name: "Adventurous",
        icon: <FaMapMarkedAlt />,
        description: "For the explorers at heart.",
        color: "#FF6347",
    },
    {
        name: "Inspired",
        icon: <FaLightbulb />,
        description: "Books that spark creativity and new ideas.",
        color: "#00CED1",
    },
    {
        name: "Calm",
        icon: <FaLeaf />,
        description: "Relax with peaceful, serene stories.",
        color: "#2E8B57",
    },
];

const DiscoverPage = () => {
    return (
        <div className="discover-container">
            <h2>Discover Books by Mood</h2>
            <div className="mood-cards">
                {moods.map((mood, index) => (
                    <Link
                        to={`/discover/${mood.name.toLowerCase()}`}
                        key={index}
                        className="mood-card"
                        style={{
                            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4)), ${mood.color}`,
                        }}
                    >
                        <div className="mood-icon">{mood.icon}</div>
                        <h3>{mood.name}</h3>
                        <p>{mood.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DiscoverPage;
