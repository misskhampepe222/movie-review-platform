import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import axios from 'axios';

// Use this line - remove the commented one above
const API_URL = 'http://localhost:5001/api';

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = 'demo-user'; // Changed to match what we use in CreateReview

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/reviews`);
      const myReviews = response.data.filter(review => review.userId === userId);
      setReviews(myReviews);
      setError('');
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load your reviews. Make sure your backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`${API_URL}/reviews/${reviewId}`);
        fetchMyReviews(); // Refresh the list
        alert('Review deleted successfully!');
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review. Make sure backend is running.');
      }
    }
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <h2>My Reviews</h2>
          <p>Loading your reviews...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <h2>My Reviews</h2>
        <Alert variant="danger">
          <strong>Connection Error:</strong> {error}
          <br />
          <br />
          <strong>To fix this:</strong>
          <ol>
            <li>Open a new terminal window</li>
            <li>Run: <code>cd backend</code></li>
            <li>Run: <code>npm start</code></li>
            <li>Wait for "Server running on port 5000" message</li>
            <li>Refresh this page</li>
          </ol>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>My Reviews</h2>
          <p className="text-muted">Manage your movie reviews here</p>

          {reviews.length === 0 ? (
            <Alert variant="info">
              <h4>No reviews yet!</h4>
              <p>You haven't written any reviews yet. Start by writing your first review!</p>
              <Button variant="primary" href="/create-review">
                Write Your First Review
              </Button>
            </Alert>
          ) : (
            <div>
              <Alert variant="success" className="mb-4">
                You have written <strong>{reviews.length}</strong> review{reviews.length !== 1 ? 's' : ''}
              </Alert>

              {reviews.map(review => (
                <Card key={review.id} className="mb-3">
                  <Card.Body>
                    <Card.Title>
                      {review.title}
                      <Badge bg="primary" className="ms-2">
                        {review.rating}/5 Stars
                      </Badge>
                    </Card.Title>
                    <Card.Text>{review.content}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        Created: {new Date(review.createdAt).toLocaleDateString()}
                      </small>
                      <div>
                        <Button variant="outline-primary" size="sm" className="me-2">
                          Edit
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => deleteReview(review.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MyReviews;