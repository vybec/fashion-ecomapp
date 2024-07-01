// db.js

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const db= async()=>{
  mongoose.connect();
}

// Retrieve the MongoDB URI from the environment variables
const uri = process.env.MONGODB_URI;



// Check if the URI is defined
if (!uri) {
  console.error('Error: MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});


module.exports= db;
