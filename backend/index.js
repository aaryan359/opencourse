// server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const field = require('./routes/Techroutes/fieldsRoutes');
const nontechfieldroutes   = require('./routes/NontechRouting/nontechRoutes')
const Interviewroutes   = require('./routes/InterviewSectionRouting/InterviewRouting')

const authMiddleware = require('./middlewares/authMiddlewares');

const interviewRoutes = require('./routes/InterviewSectionRouting/interviewRoutes')

 // Import passport setup

const app = express();

app.use(cookieParser());

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true // Allow cookies to be sent
}));




app.use(express.json());



app.use(express.urlencoded({ extended: true }));


// MongoDB connection
connectDB();


// Express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));





// Passport middleware
app.use(passport.initialize());
app.use(passport.session());







// Routes

app.use('/auth', userRoutes);

app.use('/user',field);
app.use('/nontech',nontechfieldroutes );
app.use('/Interview',Interviewroutes );


app.use('/interview',interviewRoutes)
















// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
