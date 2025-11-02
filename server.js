const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Movie Review API is running!',
    endpoints: {
      test: '/api/test',
      reviews: '/api/reviews',
      movies: '/api/movies/search?query=matrix'
    }
  });
});

// Firebase connection test
app.get('/api/test', async (req, res) => {
  try {
    const testRef = db.collection('test');
    await testRef.add({
      message: 'Firebase connection test successful',
      timestamp: new Date().toISOString()
    });
    
    // Read it back to confirm
    const snapshot = await testRef.orderBy('timestamp', 'desc').limit(1).get();
    const testData = [];
    snapshot.forEach(doc => {
      testData.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({ 
      success: true, 
      message: 'Firebase is connected properly!',
      testData: testData
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Firebase connection failed: ' + error.message 
    });
  }
});

// Routes
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/movies', require('./routes/movies'));

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🔍 Test Firebase: http://localhost:${PORT}/api/test`);
});