require('dotenv').config(); // Load environment variables from .env file
console.log('MONGODB_URI from env:', process.env.MONGODB_URI);
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport'); // Ensure the typo is fixed in this file
const connectDB = require('./config/db'); // Ensure this path is correct based on your project structure
const userRouter = require('./routes/userRouter');
const adminRouter=require('./routes/adminRouter');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'mySecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 72 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// To control cache
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

//To create admin login
app.use('/admin',adminRouter);







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
