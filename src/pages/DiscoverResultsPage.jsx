import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./DiscoverResultsPage.scss";
import { useState } from "react";
import axios from "axios";

const DiscoverResultsPage = () => {
    const location = useLocation();
    const books = location.state?.books || [];
    const [updatedBooks, setUpdatedBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log("Books:", books);

    useEffect(() => {
        const fetchDescriptions = async () => {
            if (books.length === 0) return;
            setLoading(true);
            setError(null);

            try {
                const response = await axios.post(
                    "http://localhost:3001/api/booksdescription",
                    {
                        books,
                    }
                );
                console.log("Books with description:", response.data);
                setUpdatedBooks(response.data);
            } catch (error) {
                console.error("Error fetching book descriptions:", error);
                setError("Failed to fetch book descriptions");
            } finally {
                setLoading(false);
            }
        };
        fetchDescriptions();
    }, [books]);

    return (
        <div className="discover-results-container">
            <h2>Books Matching Your Mood</h2>
            <div className="books-list">
                {updatedBooks.length === 0 ? (
                    <p>No books found matching the selected moods.</p>
                ) : (
                    <ul>
                        {updatedBooks.map((book, index) => (
                            <li key={index} className="book-item">
                                <img
                                    src={
                                        book.imageUrl ||
                                        "bookimageplaceholder.jpg"
                                    }
                                    alt={book.Title}
                                    className="book-cover"
                                />
                                <h3>{book.Title}</h3>
                                <p>{book.Author}</p>
                                {/* <p>{book.description}</p> */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
export default DiscoverResultsPage;
