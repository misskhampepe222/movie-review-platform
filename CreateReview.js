import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5001/api';

function CreateReview() {
  const [formData, setFormData] = useState({
    movieId: '',
    title: '',
    content: '',
    rating: 5,
    userId: 'demo-user',
    userName: 'Current User'
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Add this useEffect to handle URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');
    const title = urlParams.get('title');
    
    if (movieId || title) {
      console.log('Pre-filling form with:', { movieId, title });
      setFormData(prev => ({
        ...prev,
        movieId: movieId || prev.movieId,
        title: title ? decodeURIComponent(title) : prev.title
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('Sending to:', `${API_URL}/reviews`);
      
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      
      setMessage('✅ Review created successfully!');
      
      // Reset form
      setFormData({
        movieId: '',
        title: '',
        content: '',
        rating: 5,
        userId: 'demo-user',
        userName: 'Current User'
      });
      
    } catch (error) {
      console.error('Full error:', error);
      setMessage(`❌ Error: ${error.message}. Make sure backend is running on port 5001.`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <h2>Write a Review</h2>
          <p className="text-muted">Share your thoughts about a movie</p>

          {message && (
            <Alert variant={message.includes('✅') ? 'success' : 'danger'}>
              {message}
              {message.includes('Error') && (
                <div className="mt-2">
                  <strong>Quick Check:</strong>
                  <br />
                  • <a href="http://localhost:5001/api/test" target="_blank" rel="noopener">Test Backend</a> - should show success message
                  <br />
                  • Backend terminal should show "Server running on port 5001"
                </div>
              )}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Movie Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter movie title..."
                required
                disabled={loading}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Movie ID</Form.Label>
              <Form.Control
                type="text"
                name="movieId"
                value={formData.movieId}
                onChange={handleChange}
                placeholder="e.g., tt0133093"
                disabled={loading}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Rating *</Form.Label>
              <Form.Select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Review Content *</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your review here..."
                required
                disabled={loading}
              />
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Submit Review'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateReview;