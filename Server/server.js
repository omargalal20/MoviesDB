const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const port = process.env.PORT || "8000";
const moviesCont = require('./Controller/MoviesController');
const UserCont = require('./Controller/UserController');
const mongoose = require('mongoose');
const User = require('./Models/User')
const passport = require('passport');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

// Connect To MongoDB
mongoose.connect('mongodb://localhost:27017/moviesDB',
{useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log('Mongo Connection Opened');
        })
        .catch(err =>{
            console.log("Mongo Error happened");
            console.log(err);
        });

dotenv.config();

app.use(session({
    genid: function (req) {
      return uuidv4();
    },
    secret: process.env.Session_Secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000, secure: true }
  }));
  
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/movies', moviesCont);
app.use('/user', UserCont);

app.get('/', async(req, res) => {
    res.send('Welcome');
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});