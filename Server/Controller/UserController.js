const router = require('express').Router();
const User = require('../Models/User');
const passport = require('passport');

router.route('/getWatchList').post(async (req,res) => {
    const user = await User.findById(req.body.id).exec();
    res.send(user.watchlist);
})

router.route('/getLikes').post(async (req,res) => {
    const user = await User.findById(req.body.id).exec();
    res.send(user.likes);
})

router.route('/signup').post(async (req, res, next) => {
    const user = new User(req.body);
    try{
      await User.register(user, req.body.password);
      res.send("Registered Successfully");
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send(err)
    }
})

router.route('/login').post(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) {
        console.log("Unsuccessfully Authenticated");
        res.send({})
      }
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          console.log("Successfully Authenticated");
          res.send(req.user);
        })
      }
    })(req, res, next);
})

router.route('/addToWatchList').post(async (req,res) => {
    const user = await User.findById(req.body.id).exec();
    let flag = true;
    for(let i = 0; i < user.watchlist.length; i++){
        if(user.watchlist[i].film_id ==  req.body.movie.film_id){
            flag = false;
            break;
        }
    }
    if(flag){
        User.findByIdAndUpdate(user._id, { watchlist:  [...user.watchlist, req.body.movie] })
        .then(() => {
            res.send('Added To Watch List')
        });
    }
    else{
        res.send('Already Added')
    }
})

router.route('/addToLike').post(async (req,res) => {
    const user = await User.findById(req.body.id).exec();
    let flag = true;
    for(let i = 0; i < user.likes.length; i++){
        if(user.likes[i].film_id ==  req.body.movie.film_id){
            flag = false;
            break;
        }
    }
    if(flag){
        User.findByIdAndUpdate(user._id, { likes:  [...user.likes, req.body.movie] })
        .then(() => {
            res.send('Added To Likes')
        });
    }
    else{
        res.send('Already Added')
    }
})

module.exports = router;