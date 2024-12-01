import { useState } from "react";

const AddToTrackerButton = ({ book, user }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAddToTracker = async () => {
        if (!user) {
            setError("Please log in to add books to your tracker.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/reading-tracker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    title: book.title,
                    author: book.author,
                }),
            });

            if (response.ok) {
                alert("Book added to tracker!");
            } else {
                const errorData = await response.json();
                setError(`Failed to add book: ${errorData.error}`);
            }
        } catch (err) {
            console.error("Error adding book to tracker:", err);
            setError("An error occurred while adding the book.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleAddToTracker} disabled={loading}>
                {loading ? "Adding..." : "Add to Tracker"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default AddToTrackerButton;
