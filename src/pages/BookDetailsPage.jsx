import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BookDetailsPage.scss";

const BookDetailsPage = () => {
    const { booktitle } = useParams();
    const [bookDetails, setBookDetails] = useState(null);
    const [error, setError] = useState("");
   
    console.log("booktitle", booktitle);
   


    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/api/book/${booktitle}`
                );
                setBookDetails(response.data);
            } catch (err) {
                setError(
                    err.response?.data?.error || "Failed to fetch book details."
                );
            }
        };

        fetchBookDetails();
    }, [booktitle]);

    if (error) {
        return (
            <div className="book-detail-page">
                <p>{error}</p>
            </div>
        );
    }

    if (!bookDetails) {
        return (
            <div className="book-detail-page">
                <p>Loading...</p>
            </div>
        );
    }

    const { Title, Author, Description, Thumbnail } = bookDetails;

    return (
        <div className="book-detail-page">
            <div className="book-detail">
                <img
                    src={Thumbnail}
                    alt={Title}
                    className="book-detail__image"
                />
                <div className="book-detail__info">
                    <h1 className="book-detail__title">{Title}</h1>
                    <h2 className="book-detail__author">By {Author}</h2>
                    <p className="book-detail__description">{Description}</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;
