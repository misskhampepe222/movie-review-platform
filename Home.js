import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1>Welcome to MovieReview</h1>
          <p>Share your thoughts about movies and discover new favorites!</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Search Movies</Card.Title>
              <Card.Text>Find movies using our external API integration</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Read Reviews</Card.Title>
              <Card.Text>See what others are saying about movies</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Write Reviews</Card.Title>
              <Card.Text>Share your own reviews and ratings</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;