import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Abstractbackground from "../assets/images/abstract2.jpg";
import axios from "axios";
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
        color: "#CB3F3F",
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
        color: "#BF7487",
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
    {
        name: "Funny",
        icon: <FaLeaf />,
        description: "Relax with peaceful, serene stories.",
        color: "#2E8B57",
    },
    {
        name: "Magical",
        icon: <FaLeaf />,
        description: "Relax with peaceful, serene stories.",
        color: "#2E8B57",
    },
];

const DiscoverPage = () => {
    const [selectedMoods, setSelectedMoods] = useState([]);
    const navigate = useNavigate();

    const handleMood = (mood) => {
        setSelectedMoods((prev) =>
            prev.includes(mood)
                ? prev.filter((m) => m !== mood)
                : [...prev, mood]
        );
    };

    const handleSubmit = async () => {
        if (selectedMoods.length === 0) return;
        const moodQuery = selectedMoods.join("-");
        try {
            const response = await axios.post(
                "http://localhost:3001/api/discover",
                {
                    moods: selectedMoods,
                }
            );
            const books = response.data;
            navigate(`/discover/${moodQuery}`, { state: { books } });
        } catch (error) {
            console.error("Error fetching books: ", error);
        }
    };

    return (
        <div className="discover-container">
            {/* <img className = "discover-container__background" src={Abstractbackground} alt="abstract-background" /> */}
            <div className="discover-container-heading">
                <h2>Discover Books by Mood</h2>
            </div>
            <div className="mood-cards">
                {moods.map((mood, index) => (
                    <div
                        key={index}
                        className={`mood-card" ${
                            selectedMoods.includes(mood.name) ? "selected" : ""
                        }`}
                        onClick={() => handleMood(mood.name)}
                        style={{
                            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4)), ${mood.color}`,
                            cursor: "pointer",
                        }}
                    >
                        <div className="mood-icon">{mood.icon}</div>
                        <h3>{mood.name}</h3>
                        <p>{mood.description}</p>
                    </div>
                ))}
            </div>
            <button
                className="find-books-button"
                onClick={handleSubmit}
                disabled={selectedMoods.length === 0}
            >
                Find Books
            </button>
        </div>
    );
};

export default DiscoverPage;
