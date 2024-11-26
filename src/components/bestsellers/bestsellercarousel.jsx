import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { FaChevronLeft, FaChevronRight} from "react-icons/fa";
import "./bestsellercarousel.scss";

const BestsellerCarousel = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchTrendingBooks = async () => {
            try {
                const response = await axios.get("/api/bestsellers");
                console.log(response.data);
                if (response.data && Array.isArray(response.data)) {
                    setBooks(response.data);
                } else {
                    console.error(
                        "Invalid data format for books",
                        response.data
                    );
                }
            } catch (error) {
                setError(error.message);
                console.error("Error fetching trending books", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrendingBooks();
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <FaChevronRight className = "next-arrow"/>,
        prevArrow: <FaChevronLeft className = "prev-arrow"/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <div className="carousel-container">
            <h2>Trending Books</h2>
            {loading ? (
                <p>Loading books...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : books.length > 0 ? (
                <Slider {...settings}>
                    {books.map((book) => (
                        <div key={book.book_uri} className="book-card">
                            {/* Book Cover */}
                            <img
                                src={book.book_image}
                                alt={`${book.title} cover`}
                                width={book.book_image_width}
                                height={book.book_image_height}
                                className="book-image"
                            />
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">by {book.author}</p>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p>No books available</p>
            )}
        </div>
    );
};

export default BestsellerCarousel;
