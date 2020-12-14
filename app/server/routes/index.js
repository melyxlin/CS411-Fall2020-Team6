var express = require('express');
var router = express.Router();
var request = require('request');
const {MongoClient} = require('mongodb');
const {Translate} = require('@google-cloud/translate').v2;
var Twitter = require("node-twitter-api");
require('dotenv').config();

const twitter = new Twitter({
  consumerKey: "FquLfyd4pjxX2AORdCIgtQ39j",
  consumerSecret: "g81pBhp5aX9jBjxl2EROGScjFwQUsKDGjhSjozXkjzTeVebDMO",
  callback: "http://localhost:3000",
});


//Setup Google Translate Client
const CREDENTIALS = JSON.parse(process.env.GOOGLE_TRANSLATE_CREDENTIALS);

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

//Helpers
async function listLanguages() {
  const [languages] = await translate.getLanguages();
  return languages
}

async function translateText(text, targetLanguage){
    let [response] = await translate.translate(text, targetLanguage);
    return response;
}

var _requestSecret;

MongoClient.connect(process.env.MONGO_CONNECTION_URI, { useUnifiedTopology: true })
.then(client => {
  var db = client.db('user-tweets').collection("tweets")
  console.log("connected")

  //Read DB
  router.get('/getTweets/:userId', (req, res) => {
    db.find().toArray().then(results => {
      res.send(results)
    }) .catch (error => console.log(error))
  })

  //Post to DB & Twitter
  router.post('/writeTweet/:txt', (req, res) => {
    //Tweet code
    db.insertOne(newItem).then(results => {
      console.log(results)
      res.send(200)
    }) .catch (error => console.log(error))
  })
  
  //Fetch languages and codes supported by Google Translate
  router.get('/getLanguages', (req, res) => {
    listLanguages()
    .then((response)=> {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    })
  })
  
  //Translate text to target lang
  router.get('/translate/:txt/:lang', (req, res) => {
    translateText(req.params.txt.replace("%20", " "), req.params.lang)
    .then((response)=> {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    })
  })
  
  //Fetch gif from GIPHY
  router.get('/getGif/:search_term', (req, res) => {
    request("http://api.giphy.com/v1/gifs/translate?s=" + req.params.search_term.replace("%20","+") +"&api_key="+process.env.GIPHY_API_KEY+ "&limit=1", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(body).data.images.downsized.url);
      }
    })
  })

  router.get("/logout", (req, res) => {
    req.logout();
    res.cookie('loggedin', 'false')
    res.redirect("http://localhost:3000/");
  });

  router.get("/login", function(req, res) {
    twitter.getRequestToken(function(err, requestToken, requestSecret) {
        if (err)
            res.status(500).send(err);
        else {
            _requestSecret = requestSecret;
            res.cookie('loggedin', 'true')
            res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
        }
    });
});

// router.get("/access-token/:oauth_token/:oauth_verifier", function(req, res) {
//   var requestToken = req.params.oauth_token,
//   verifier = req.params.oauth_verifier;

//   twitter.getAccessToken("eRl-QAAAAAABKAWKAAABdmBCiZ", _requestSecret, "unXidHAavXBz5CMKRZXC4WCoCghGvc1S", function(err, accessToken, accessSecret) {
//       if (err)
//           res.status(500).send(err);
//       else
//           twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
//               if (err)
//                   res.status(500).send(err);
//               else
//               console.log(user);
//                   res.send(user);
//           });
//   });
// });
  
})
.catch(error => console.error(error))

module.exports = router;
