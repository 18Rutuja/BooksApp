import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Include useNavigate for the back button
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to navigate back to books page
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://softwium.com/api/books/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading book details: {error}</p>;
  }

  if (!book) {
    return <p>No book found.</p>;
  }

  return (
    <div className="book-details-wrapper"> {/* Wrapper for entire content */}
      <nav className="navbar"> {/* Navigation bar with back button */}
        <button onClick={() => navigate(-1)}>Back to Books</button>
      </nav>

      <div className="book-details-container">
        <h1>{book.title}</h1>
        <p>ISBN: {book.isbn}</p>
        <p>Page Count: {book.pageCount}</p>
        <p>Authors: {book.authors ? book.authors.join(', ') : 'Unknown'}</p>
      </div>

      <footer className="footer"> {/* Footer with additional information */}
        <p>About Books Inc.</p>
        <p>123 Library St., Booktown, BK 12345</p>
        <p>Contact: info@booksinc.com</p>
        <div className="social-links"> {/* Social media links */}
          <a href="https://github.com/18Rutuja" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/rutuja-rathod-015206231/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default BookDetails;
