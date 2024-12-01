// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

// Initialize dotenv for environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Create a PostgreSQL pool using environment variables
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'portfolio', // Make sure this matches the name of the database
  password: 'mohan', // your PostgreSQL password
  port: 5432,
});

// Test connection
pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err));

// Endpoint to fetch projects
app.get('/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.projects');
    res.json(result.rows); // Send the results as JSON response
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// Endpoint to fetch skills
app.get('/skills', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.skills');
    res.json(result.rows); // Send the results as JSON response
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;  // Change port if necessary
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
