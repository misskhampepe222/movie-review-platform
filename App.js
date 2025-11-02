import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import MovieSearch from './pages/MovieSearch';
import Reviews from './pages/Reviews';
import CreateReview from './pages/CreateReview';
import MyReviews from './pages/MyReviews';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<MovieSearch />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/create-review" element={<CreateReview />} />
          <Route path="/my-reviews" element={<MyReviews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;