import React, { useState, useEffect } from "react";
import axios from "axios";

const ReadingTracker = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/api/reading-tracker",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                setBooks(response.data);
            } catch (err) {
                console.error("Failed to fetch books:", err);
            }
        };
        fetchBooks();
    }, []);

    const handleAddBook = async () => {
        try {
            await axios.post(
                "http://localhost:3001/api/reading-tracker",
                { title, author },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setTitle("");
            setAuthor("");
            setBooks([...books, { title, author }]); // Update state with new book
        } catch (err) {
            console.error("Failed to add book:", err);
        }
    };

    return (
        <div>
            <h2>Your Reading Tracker</h2>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Book Title"
                    required
                />
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    required
                />
                <button onClick={handleAddBook}>Add Book</button>
            </div>

            <div>
                <h3>Your Books:</h3>
                {books.length === 0 ? (
                    <p>No books added yet.</p>
                ) : (
                    <ul>
                        {books.map((book, index) => (
                            <li key={index}>
                                {book.title} by {book.author}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ReadingTracker;
