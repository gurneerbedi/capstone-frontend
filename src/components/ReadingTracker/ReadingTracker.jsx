import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReadingTracker = ({ user }) => {
    const [trackerBooks, setTrackerBooks] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrackerBooks = async () => {
            try {
                const response = await fetch("/api/reading-tracker", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTrackerBooks(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error);
                }
            } catch (err) {
                console.error("Error fetching tracker books:", err);
                setError(
                    "An error occurred while fetching your tracker books."
                );
            }
        };

        if (user) {
            fetchTrackerBooks();
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) {
        return <p>Please log in to view your reading tracker.</p>;
    }

    return (
        <div>
            <h2>Your Reading Tracker</h2>
            <button onClick={handleLogout}>Log Out</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {trackerBooks.length === 0 ? (
                <p>No books in your tracker yet!</p>
            ) : (
                <ul>
                    {trackerBooks.map((book) => (
                        <li key={book.id}>
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReadingTracker;
