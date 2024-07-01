require('dotenv').config(); // Load environment variables from .env file
console.log('MONGODB_URI from env:', process.env.MONGODB_URI);
const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/userRouter.js');
require('./config/db.js'); // Ensure this path is correct based on your project structure

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//To control cache
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Set up the view engine
app.set('view engine', 'ejs');

// Set up views directories
app.set('views', [
    path.join(__dirname, 'views/user'),
    path.join(__dirname, 'views/admin')
]);

// Set up static file serving
app.use(express.static('public'));

// Use routers
app.use('/', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
