import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Abstractbackground from "../assets/images/abstract2.jpg";
import axios from "axios";
import NavBar from "../components/navbar/NavBar"
import AddToTrackerButton from "../components/AddToTrackerButton/AddToTrackerButton";
import {
    FaHeart,
    FaSmile,
    FaSadTear,
    FaMapMarkedAlt,
    FaLightbulb,
    FaLeaf,
    FaLaugh,
    FaHatWizard,
} from "react-icons/fa";
import "./discoverpage.scss";

const moods = [
    {
        name: "Romantic",
        icon: <FaHeart />,
        description: "Fall in love with these stories.",
       
    },
    {
        name: "Happy",
        icon: <FaSmile />,
        description: "Books that lift your spirits.",
        
    },
    {
        name: "Sad",
        icon: <FaSadTear />,
        description: "Heart-wrenching tales that tug at your emotions.",
        
    },
    {
        name: "Adventurous",
        icon: <FaMapMarkedAlt />,
        description: "For the explorers at heart.",
        
    },
    {
        name: "Inspired",
        icon: <FaLightbulb />,
        description: "Books that spark creativity and new ideas.",
        
    },
    {
        name: "Calm",
        icon: <FaLeaf />,
        description: "Relax with peaceful, serene stories.",
       
    },
    {
        name: "Funny",
        icon: <FaLaugh />,
        description: "Relax with peaceful, serene stories.",
       
    },
    {
        name: "Magical",
        icon: <FaHatWizard />,
        description: "Relax with peaceful, serene stories.",
        
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
            <NavBar></NavBar>
            {/* <img className = "discover-container__background" src={Abstractbackground} alt="abstract-background" /> */}
            <div className="discover-container-heading">
                <h2>Discover Books by Mood</h2>
            </div>
            <div className="mood-cards">
                {moods.map((mood, index) => (
                    <div
                        key={index}
                        className={`mood-card ${
                            selectedMoods.includes(mood.name) ? "selected" : ""
                        }`}
                        onClick={() => handleMood(mood.name)}
                    >
                        <div className="mood-icon">{mood.icon}</div>
                        <div className="mood-info">
                            <h3>{mood.name}</h3>
                            <p>{mood.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className = "button-container">
            <button
                className="find-books-button"
                onClick={handleSubmit}
                disabled={selectedMoods.length === 0}
            >
                Find Books
            </button>
            </div>
        </div>
    );
};

export default DiscoverPage;
