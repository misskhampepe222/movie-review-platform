const express = require('express');
const axios = require('axios');
const router = express.Router();

const OMDB_API_KEY = '443d0e48';

// Search movies by title
router.get('/search', async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        error: 'Query parameter is required' 
      });
    }
    
    console.log(`🎬 Searching movies: "${query}", page ${page}`);
    
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: OMDB_API_KEY,
        s: query,
        page: page,
        type: 'movie'
      }
    });
    
    if (response.data.Response === 'False') {
      return res.status(404).json({ 
        error: response.data.Error || 'No movies found',
        data: [] 
      });
    }
    
    console.log(`✅ Found ${response.data.Search.length} movies for "${query}"`);
    
    res.json({
      search: query,
      page: parseInt(page),
      totalResults: parseInt(response.data.totalResults),
      movies: response.data.Search
    });
    
  } catch (error) {
    console.error('❌ Error searching movies:', error.message);
    res.status(500).json({ 
      error: 'Failed to search movies',
      details: error.message 
    });
  }
});

// Get movie details by IMDB ID
router.get('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    
    console.log(`🎬 Fetching movie details: ${movieId}`);
    
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: OMDB_API_KEY,
        i: movieId,
        plot: 'full'
      }
    });
    
    if (response.data.Response === 'False') {
      return res.status(404).json({ 
        error: response.data.Error || 'Movie not found' 
      });
    }
    
    console.log(`✅ Found movie: ${response.data.Title}`);
    
    res.json(response.data);
    
  } catch (error) {
    console.error('❌ Error fetching movie details:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch movie details',
      details: error.message 
    });
  }
});

// Get popular movies (default search)
router.get('/', async (req, res) => {
  try {
    console.log('🎬 Fetching popular movies...');
    
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: OMDB_API_KEY,
        s: 'avengers',
        type: 'movie'
      }
    });
    
    if (response.data.Response === 'False') {
      return res.status(404).json({ 
        error: response.data.Error || 'No movies found',
        data: [] 
      });
    }
    
    console.log(`✅ Found ${response.data.Search.length} popular movies`);
    
    res.json({
      popularMovies: response.data.Search
    });
    
  } catch (error) {
    console.error('❌ Error fetching popular movies:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch popular movies',
      details: error.message 
    });
  }
});

module.exports = router;