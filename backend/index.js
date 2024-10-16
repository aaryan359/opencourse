// server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const field = require('./routes/fieldsRoutes')

const authMiddleware = require('./middlewares/authMiddlewares');

require('./config/passport-setup'); // Import passport setup

const app = express();


// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Change to your frontend URL
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connectDB();


// Express session
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
// }));



// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());





// Routes

app.use('/auth', userRoutes);

app.use('/user',field);



// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
