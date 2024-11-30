import React from "react";
import "./BookCard.scss";
import BookCover from "../../assets/Images/BookPlaceholder.jpg";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    const { Thumbnail, Title, Author } = book;
    const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

    //started off with bookcard component, however added link so that user can go to book details dynamic url
    //have to use slugify because encodeURIComponent gives %20 in url because of the spacing in title
    return (
        <Link  to={`/discover/${slugify(Title)}`} className = "book-card-link" >
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
        </Link>
    );
};

export default BookCard;
