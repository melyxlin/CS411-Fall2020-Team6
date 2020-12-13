var express = require('express');
var router = express.Router();
var request = require('request');
const {MongoClient} = require('mongodb');
// const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

//Setup Google Translate Client
// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// const translate = new Translate({
//     credentials: CREDENTIALS,
//     projectId: CREDENTIALS.project_id
// });

//Helpers
async function listLanguages() {
  const [languages] = await translate.getLanguages();
  return languages
}

async function translateText(text, targetLanguage){
    let [response] = await translate.translate(text, targetLanguage);
    return response;
}

MongoClient.connect("mongodb+srv://terrylin:CS411-Fall2020-Team6@cs411-fall2020-team6.5vp1g.mongodb.net/CS411-Fall2020-Team6?retryWrites=true&w=majority", { useUnifiedTopology: true })
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
    translateText(req.params.txt, req.params.lang)
    .then((response)=> {
      res.send(JSON.parse(response));
    })
    .catch((err) => {
      res.send(err);
    })
  })
  
  //Fetch gif from GIPHY
  router.get('/getGif/:search_term', (req, res) => {
    request("http://api.giphy.com/v1/gifs/translate?s=" + req.params.search_term +"&api_key=go8FOfcD0xY7if8tcWD8Yu9MnO40ylFW"+ "&limit=1", function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.send(JSON.parse(body).data.images.original.url);
      }
    })
  })
  
})
.catch(error => console.error(error))

module.exports = router;
