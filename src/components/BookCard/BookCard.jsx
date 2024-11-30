import React from "react";
import "./BookCard.scss";
import BookCover from "../../assets/Images/BookPlaceholder.jpg";

const BookCard = ({ book }) => {
    const { Thumbnail, Title, Author } = book;

    return (
        <div className="book-card">
            <img
                src={Thumbnail || BookCover}
                alt={`${Title} cover`}
                className="book-card__image"
            />
            <div className="book-card__details">
                <h3 className="book-card__title">{Title}</h3>
                <p className="book-card__author">{Author}</p>
            </div>
        </div>
    );
};

export default BookCard;
