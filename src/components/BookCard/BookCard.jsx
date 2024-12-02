import React from "react";
import "./BookCard.scss";
import BookCover from "../../assets/Images/BookPlaceholder.jpg";
import { Link } from "react-router-dom";
import AddToTrackerButton from "../AddToTrackerButton/AddToTrackerButton";

const BookCard = ({ book, user }) => {
    const { Thumbnail, Title, Author } = book;

    const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

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
            <AddToTrackerButton book={book} user={user} />
        </div>
    );
};

export default BookCard;
