const mongoose = require('mongoose');
const User = require('./Models/User');

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

const user = new User({name: "Omar"});
user.save();

// User.findOne({name: 'Omar'}).exec().then(user => {
//     console.log(user)
//     console.log('Watch List')
//     for(let i = 0; i < user.watchlist.length; i++){
//         console.log(user.watchlist[i])
//     }
//     console.log('Likes')
//     for(let i = 0; i < user.likes.length; i++){
//         console.log(user.likes[i])
//     }
// })
