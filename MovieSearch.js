import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // Changed to 5001

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setMovies([]);

    try {
      console.log('Searching for:', query);
      const response = await axios.get(`${API_URL}/movies/search?query=${encodeURIComponent(query)}`);
      console.log('Search response:', response.data);
      
      setMovies(response.data.movies || []);
      
      if (!response.data.movies || response.data.movies.length === 0) {
        setError('No movies found. Try a different search term.');
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      if (error.response) {
        setError(`API Error: ${error.response.data.error || 'Failed to search movies'}`);
      } else if (error.request) {
        setError('Cannot connect to backend. Make sure it\'s running on port 5001.');
      } else {
        setError('Search failed: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Test the API connection
  const testAPI = async () => {
    try {
      const response = await axios.get(`${API_URL}/movies/search?query=avengers`);
      console.log('API test successful:', response.data);
      alert('API connection is working! Found ' + (response.data.movies?.length || 0) + ' movies.');
    } catch (error) {
      console.error('API test failed:', error);
      alert('API test failed: ' + error.message);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Search Movies</h2>
          <p className="text-muted">Find movies from external database</p>
          
          {/* Test API Button */}
          <div className="mb-3">
            <Button variant="outline-info" size="sm" onClick={testAPI}>
              Test API Connection
            </Button>
          </div>

          {/* Search Form */}
          <Form onSubmit={searchMovies}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter movie title (e.g., Avengers, Star Wars, Titanic)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading || !query.trim()}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Searching...
                </>
              ) : (
                'Search Movies'
              )}
            </Button>
          </Form>

          {/* Error Display */}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          {/* Results */}
          {movies.length > 0 && (
            <div className="mt-4">
              <h4>Search Results ({movies.length} movies found)</h4>
              <Row>
                {movies.map(movie => (
                  <Col md={6} lg={4} key={movie.imdbID} className="mb-3">
                    <Card className="h-100">
                      <Card.Img 
                        variant="top" 
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image'}
                        style={{ height: '400px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
                        }}
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="fs-6">{movie.Title}</Card.Title>
                        <Card.Text className="text-muted">
                          <strong>Year:</strong> {movie.Year}
                          <br />
                          <strong>Type:</strong> {movie.Type}
                          <br />
                          <strong>ID:</strong> {movie.imdbID}
                        </Card.Text>
                        <div className="mt-auto">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => {
                              // Pre-fill the review form
                              window.location.href = `/create-review?movieId=${movie.imdbID}&title=${encodeURIComponent(movie.Title)}`;
                            }}
                          >
                            Write Review
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* No results message */}
          {!loading && movies.length === 0 && query && !error && (
            <Alert variant="info" className="mt-3">
              No movies found for "{query}". Try a different search term.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MovieSearch;