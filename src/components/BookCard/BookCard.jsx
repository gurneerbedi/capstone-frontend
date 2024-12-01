import React, { useState } from "react";
import "./BookCard.scss";
import BookCover from "../../assets/Images/BookPlaceholder.jpg";
import { Link } from "react-router-dom";

const BookCard = ({ book, user }) => {
    const { Thumbnail, Title, Author } = book;
    const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

    // State for adding the book and error handling
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);

    const addBookToTracker = async () => {
        if (!user) {
            alert("Please log in to add books to your tracker.");
            return;
        }
        setIsAdding(true);
        setError(null);
        try {
            const response = await fetch("/api/reading-tracker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    title: Title,
                    author: Author,
                }),
            });

            if (response.ok) {
                alert("Book added to tracker!");
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to add book");
            }
        } catch (err) {
            console.error("Error adding book to tracker:", err);
            setError("Failed to add book");
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="book-card">
            <Link to={`/discover/${slugify(Title)}`} className="book-card-link">
                <img
                    src={Thumbnail || BookCover}
                    alt={`${Title} cover`}
                    className="book-card__image"
                />
                <div className="book-card__details">
                    <h3 className="book-card__title">{Title}</h3>
                    <p className="book-card__author">{Author}</p>
                </div>
            </Link>
            <button
                onClick={addBookToTracker}
                className="book-card__add-btn"
                disabled={isAdding}
            >
                {isAdding ? "Adding..." : "Add to Tracker"}
            </button>
            {error && <p className="book-card__error">{error}</p>}
        </div>
    );
};

export default BookCard;
