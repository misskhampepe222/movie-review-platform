import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import axios from 'axios';

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>All Reviews</h2>
          {reviews.map(review => (
            <Card key={review.id} className="mb-3">
              <Card.Body>
                <Card.Title>
                  {review.title}
                  <Badge bg="primary" className="ms-2">
                    {review.rating}/5
                  </Badge>
                </Card.Title>
                <Card.Text>{review.content}</Card.Text>
                <Card.Footer>
                  <small className="text-muted">
                    By {review.userName} • {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Reviews;