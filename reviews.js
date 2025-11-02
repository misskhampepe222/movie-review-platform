const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// GET all reviews
router.get('/', async (req, res) => {
  try {
    console.log('📖 Fetching all reviews from Firestore...');
    
    const reviewsSnapshot = await db.collection('reviews')
      .orderBy('createdAt', 'desc')
      .get();
    
    const reviews = [];
    reviewsSnapshot.forEach(doc => {
      reviews.push({ 
        id: doc.id, 
        ...doc.data() 
      });
    });
    
    console.log(`✅ Found ${reviews.length} reviews`);
    res.json(reviews);
  } catch (error) {
    console.error('❌ Error fetching reviews:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reviews',
      details: error.message 
    });
  }
});

// GET reviews by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`📖 Fetching reviews for user: ${userId}`);
    
    const reviewsSnapshot = await db.collection('reviews')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    
    const reviews = [];
    reviewsSnapshot.forEach(doc => {
      reviews.push({ 
        id: doc.id, 
        ...doc.data() 
      });
    });
    
    console.log(`✅ Found ${reviews.length} reviews for user ${userId}`);
    res.json(reviews);
  } catch (error) {
    console.error('❌ Error fetching user reviews:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user reviews',
      details: error.message 
    });
  }
});

// GET reviews by movie ID
router.get('/movie/:movieId', async (req, res) => {
  try {
    const movieId = req.params.movieId;
    console.log(`📖 Fetching reviews for movie: ${movieId}`);
    
    const reviewsSnapshot = await db.collection('reviews')
      .where('movieId', '==', movieId)
      .orderBy('createdAt', 'desc')
      .get();
    
    const reviews = [];
    reviewsSnapshot.forEach(doc => {
      reviews.push({ 
        id: doc.id, 
        ...doc.data() 
      });
    });
    
    console.log(`✅ Found ${reviews.length} reviews for movie ${movieId}`);
    res.json(reviews);
  } catch (error) {
    console.error('❌ Error fetching movie reviews:', error);
    res.status(500).json({ 
      error: 'Failed to fetch movie reviews',
      details: error.message 
    });
  }
});

// POST create new review
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creating new review...', req.body);
    
    const { movieId, title, content, rating, userId, userName } = req.body;
    
    // Validation
    if (!title || !content || !rating) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, content, and rating are required' 
      });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        error: 'Rating must be between 1 and 5' 
      });
    }
    
    const reviewData = {
      movieId: movieId || 'default-movie-id',
      title: title.trim(),
      content: content.trim(),
      rating: parseInt(rating),
      userId: userId || 'demo-user',
      userName: userName || 'Demo User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await db.collection('reviews').add(reviewData);
    
    console.log('✅ Review created with ID:', docRef.id);
    res.status(201).json({ 
      id: docRef.id, 
      ...reviewData,
      message: 'Review created successfully!' 
    });
  } catch (error) {
    console.error('❌ Error creating review:', error);
    res.status(500).json({ 
      error: 'Failed to create review',
      details: error.message 
    });
  }
});

// PUT update review
router.put('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { title, content, rating } = req.body;
    
    console.log(`✏️ Updating review ${reviewId}...`);
    
    // Validation
    if (!title || !content || !rating) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, content, and rating are required' 
      });
    }
    
    const reviewRef = db.collection('reviews').doc(reviewId);
    
    // Check if review exists
    const reviewDoc = await reviewRef.get();
    if (!reviewDoc.exists) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    await reviewRef.update({
      title: title.trim(),
      content: content.trim(),
      rating: parseInt(rating),
      updatedAt: new Date().toISOString()
    });
    
    console.log(`✅ Review ${reviewId} updated successfully`);
    res.json({ 
      message: 'Review updated successfully!',
      id: reviewId 
    });
  } catch (error) {
    console.error('❌ Error updating review:', error);
    res.status(500).json({ 
      error: 'Failed to update review',
      details: error.message 
    });
  }
});

// DELETE review
router.delete('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    
    console.log(`🗑️ Deleting review ${reviewId}...`);
    
    const reviewRef = db.collection('reviews').doc(reviewId);
    
    // Check if review exists
    const reviewDoc = await reviewRef.get();
    if (!reviewDoc.exists) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    await reviewRef.delete();
    
    console.log(`✅ Review ${reviewId} deleted successfully`);
    res.json({ 
      message: 'Review deleted successfully!',
      id: reviewId 
    });
  } catch (error) {
    console.error('❌ Error deleting review:', error);
    res.status(500).json({ 
      error: 'Failed to delete review',
      details: error.message 
    });
  }
});

module.exports = router;