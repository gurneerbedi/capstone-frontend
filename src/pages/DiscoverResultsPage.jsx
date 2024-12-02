import React from "react";
import { useLocation } from "react-router-dom";
import "./DiscoverResultsPage.scss";
import BookCard from "../components/BookCard/BookCard";
import NavBar from "../components/navbar/NavBar";

function DiscoverResultsPage() {
    const location = useLocation();
    const books = location.state?.books || [];
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Books:", books);

    return (
        <div className="discover-results">
            <NavBar></NavBar>
            <div className="discover-results-container">
                <h2 className="discover-results-container__title">
                    StoryWave Recommends
                </h2>
                <div className="books-list">
                    {books.length === 0 ? (
                        <p>No books found matching the selected moods.</p>
                    ) : (
                        books.map((book, index) => (
                            <BookCard key={index} book={book} user={user} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default DiscoverResultsPage;
