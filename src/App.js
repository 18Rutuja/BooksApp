import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BookDetails from './components/book-details/BookDetails';
import Books from './components/book/Books';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/books" />} />  {/* Redirect root path to /books */}
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetails />} />
    </Routes>
  </Router>
);

export default App;
