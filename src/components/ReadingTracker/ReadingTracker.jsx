import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReadingTracker = ({ user }) => {
    const [trackerBooks, setTrackerBooks] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch books in the reading tracker
    useEffect(() => {
        const fetchTracker = async () => {
            try {
                const response = await fetch("/api/reading-tracker", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text(); // Get response as text (not JSON)
                    console.error("API error:", errorText);
                    setError(errorText || "Failed to fetch books");
                    return;
                }

                const data = await response.json();
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

    // Mark book as completed
    const handleMarkAsCompleted = async (bookId) => {
        try {
            const response = await fetch(
                `/api/reading-tracker/${bookId}/complete`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error marking book as completed:", errorData);
                setError(errorData.error || "Failed to mark as completed");
                return;
            }

            const updatedBook = await response.json();
            setTrackerBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === bookId ? { ...book, status: "completed" } : book
                )
            );
        } catch (err) {
            console.error("Error marking book as completed:", err);
            setError("Error marking book as completed");
        }
    };

    // Remove book from tracker
    const handleRemoveBook = async (bookId) => {
        try {
            const response = await fetch(
                `/api/reading-tracker/${bookId}/remove`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error removing book from tracker:", errorData);
                setError(errorData.error || "Failed to remove book");
                return;
            }

            setTrackerBooks((prevBooks) =>
                prevBooks.filter((book) => book.id !== bookId)
            );
        } catch (err) {
            console.error("Error removing book from tracker:", err);
            setError("Error removing book from tracker");
        }
    };

    return (
        <div>
            <h1>Your Reading Tracker</h1>
            {error && <p className="error">{error}</p>}
            <ul>
                {trackerBooks.map((book) => (
                    <li key={book.id}>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <p>Status: {book.status}</p>
                        <button onClick={() => handleMarkAsCompleted(book.id)}>
                            Mark as Completed
                        </button>
                        <button onClick={() => handleRemoveBook(book.id)}>
                            Remove from Tracker
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadingTracker;
