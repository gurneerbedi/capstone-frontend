import React, { useState } from "react";
import "./AddToTrackerButton.scss";

const AddToTrackerButton = ({ book, user }) => {
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddToTracker = async () => {
        if (!user) {
            setMessage("Please log in to add books to your tracker.");
            setMessageType("error");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch("/api/reading-tracker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    title: book.Title,
                    author: book.Author,
                    description: book.Description,
                }),
            });

            if (response.ok) {
                setMessage("Book successfully added to your tracker!");
                setMessageType("success");
            } else {
                const errorData = await response.json();
                setMessage(`Failed to add book: ${errorData.error}`);
                setMessageType("error");
            }
        } catch (err) {
            console.error("Error adding book to tracker:", err);
            setMessage("An error occurred while adding the book.");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tracker-button-container">
            <button
                onClick={handleAddToTracker}
                disabled={loading}
                className={`tracker-button ${loading ? "disabled" : ""}`}
            >
                {loading ? "Adding..." : "Want to Read"}
            </button>
            {message && (
                <div className={`tracker-message ${messageType}`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default AddToTrackerButton;
