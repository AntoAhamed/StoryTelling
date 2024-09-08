const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');  // Import the connectDB function

dotenv.config();

connectDB();  // Connect to MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/userRoutes');
app.use('/api/userRoutes', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
