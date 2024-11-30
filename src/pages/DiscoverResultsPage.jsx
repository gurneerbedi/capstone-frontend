import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./DiscoverResultsPage.scss";
import { useState } from "react";
import axios from "axios";
import BookCover from "../assets/Images/BookPlaceholder.jpg";
import BookCard from "../components/BookCard/BookCard";

function DiscoverResultsPage() {
    const location = useLocation();
    const books = location.state?.books || [];

    console.log("Books:", books);

    return (
        <div className="discover-results-container">
            <h2>Read Between the Moods</h2>
            <div className="books-list">
                {books.length === 0 ? (
                    <p>No books found matching the selected moods.</p>
                ) : (
                    <ul>
                        {books.map((book, index) => (
                            <li key={index} className="book-item">
                                <BookCard book={book} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
export default DiscoverResultsPage;
