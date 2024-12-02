import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ReadingTracker.scss";
import NavBar from "../navbar/NavBar"

const ReadingTracker = ({ user }) => {
    const [trackerBooks, setTrackerBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTracker = async () => {
            try {
                const response = await fetch("/api/reading-tracker", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("API error:", errorText);
                    setError(errorText || "Failed to fetch books");
                    return;
                }

                const data = await response.json();
                console.log(data);
                setTrackerBooks(data);
            } catch (err) {
                console.error("Error fetching books:", err);
                setError("Error fetching books");
            }
        };

        if (user.token) {
            fetchTracker();
        }
    }, [user.token]);

    const handleMarkAsCompleted = async (bookId) => {
        try {
            const response = await fetch(
                `/api/reading-tracker/complete`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        bookId,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Failed to mark as completed");
                return;
            }

            setTrackerBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === bookId ? { ...book, status: "completed" } : book
                )
            );
        } catch (err) {
            setError("Error marking book as completed");
        }
    };

    const handleRemoveBook = async (bookId) => {
        try {
            const response = await fetch(`/api/reading-tracker/remove`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    bookId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Failed to remove book");
                return;
            }

            setTrackerBooks((prevBooks) =>
                prevBooks.filter((book) => book.id !== bookId)
            );
        } catch (err) {
            setError("Error removing book from tracker");
        }
    };

    return (
        <div className="reading-list-page">
            <NavBar/>
            <div className="reading-tracker">
                <h1 className="reading-tracker__title">Your Reading Tracker</h1>
                {error && <p className="reading-tracker__error">{error}</p>}
                <ul className="reading-tracker__list">
                    {trackerBooks.map((book) => (
                        <li key={book.id} className="reading-tracker__item">
                            <div className="reading-tracker__details">
                                <img
                                    className="reading-tracker__thumbnail"
                                    src={book.thumbnail}
                                    alt={`Thumbnail for ${book.title}`}
                                ></img>
                                <h3 className="reading-tracker__book-title">
                                    {book.title}
                                </h3>
                                <p className="reading-tracker__book-author">
                                    {book.author}
                                </p>
                                {/* <p className="reading-tracker__status">
                                Status: {book.status}
                            </p> */}
                            </div>
                            <div className="reading-tracker__actions">
                                <button
                                    onClick={() =>
                                        handleMarkAsCompleted(book.id)
                                    }
                                    className="reading-tracker__btn"
                                >
                                    Mark as Completed
                                </button>
                                <button
                                    onClick={() => handleRemoveBook(book.id)}
                                    className="reading-tracker__btn"
                                >
                                    Remove from Tracker
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReadingTracker;
