import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './books.css'; // Import the CSS file

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch('https://softwium.com/api/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not okay');
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data); // Initialize filtered books
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Filter the books based on the search term
    const filtered = books.filter(
      (book) => book.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading books: {error}</p>;
  }

  return (
    
    <div className="books-container">
     
      <div className="books-list"> {/* Main section for the list of books */}
        <h1>Books</h1>
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="books-sidebar"> {/* Sidebar section */}
        <h1>Search</h1>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Additional content or filters can be added here */}
      </div>
    </div>
  );
};

export default Books;
