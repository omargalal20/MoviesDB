const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    Email: {
        type: String
    },
    watchlist: [ 
        { type: Object } 
    ],
    likes: [ 
        { type: Object } 
    ]
});

// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;