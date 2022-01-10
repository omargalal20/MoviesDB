const router = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

router.route('/search').post(async(req,res) => {
    let date = new Date()
    let searchString = ''
    for(let i = 0; i < req.body.string.split(" ").length; i++){
        searchString += req.body.string.split(" ")[i]
        if(req.body.string.split(" ").length > 1 && 
        i !== (req.body.string.split(" ").length-1))
            searchString += '+'
    }
    await axios.get(`https://api-gate2.movieglu.com/filmLiveSearch/?query=${searchString}&n=5`,{
        method: "GET",
        headers: {
            "api-version": process.env.api-version,
            "Authorization": process.env.Authorization,
            "client": process.env.client,
            "x-api-key": process.env.x-api-key,
            "device-datetime": `${date.toISOString()}`,
            "territory": process.env.territory,
            "geolocation": process.env.geolocation
        }
    }).then((movies) => {
        res.send(movies.data);
    })
});

router.route('/nowShowing').get(async(req,res) => {
    let date = new Date();
    await axios.get('https://api-gate2.movieglu.com/filmsNowShowing/?n=10',{
        method: "GET",
        headers: {
            "api-version": process.env.api-version,
            "Authorization": process.env.Authorization,
            "client": process.env.client,
            "x-api-key": process.env.x-api-key,
            "device-datetime": `${date.toISOString()}`,
            "territory": process.env.territory,
            "geolocation": process.env.geolocation
        }
    }).then((movies) => {
        res.send(movies.data);
    })
});

module.exports = router;