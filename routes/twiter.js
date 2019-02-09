'use strict'
var Twitter = require('twit');
var express = require('express');

var apiclient = new Twitter({
    consumer_key: 'xrcjEJAAffVtZRzLyA8YWh2eh',
    consumer_secret: 'sYE5qFDtHHD8MLzCVzg8jXLkfDMBVuD1FQeIvL0QPDshGjwXaZ',
    access_token: '1005106327180513280-0v99YasghntR4oEIAyjLSlbsTkgbIq',
    access_token_secret: 'd0G4kRClwe6WYukBguQykvt7IadJK3eCFTiaBuVrFAQcS'
});
var api = express.Router();

//Listar productos

api.get('/home_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 10 };

    apiclient
        .get('statuses/home_timeline', params)
        .then(timeline => {

            res.send(timeline);
        })
        .catch(error => {
            res.send(error);
        });

});

api.get('/mentions_timeline', (req, res) => {
    const params = { tweet_mode: 'extended', count: 10 };

    apiclient
        .get('statuses/mentions_timeline', params)
        .then(timeline => {

            res.send(timeline);
        })
        .catch(error => {
            res.send(error);
        });

});

api.post('/post_tweet', (req, res) => {

    var tweet = req.body;

    apiclient
        .post('statuses/update', tweet)
        .then(tweeting => {
            // console.log(tweeting);
            res.send(tweeting);
        })

        .catch(error => {
            res.send(error);
        });


});

module.exports = api;
