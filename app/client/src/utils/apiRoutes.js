import axios from "axios";

const BASE_URL = "http://localhost:4000";

 // function to call endpoint to get gid

export const getGif = (msg) => {
    const getGifFail = "GET_GIF_FAIL";
    return axios.get(BASE_URL+"/getGif/"+msg).catch((error) => ({
      type: getGifFail,
      error,
    }));
  };
  
  // function to call endpoint to get translated message
  export const getTranslation = (msg, lang) => {
    const getTranslateFail = "GET_TRANSLATE_FAIL";
    return axios.get(BASE_URL+"/translate/"+msg+"/"+lang).catch((error) => ({
      type: getTranslateFail,
      error,
    }));
  };


  // function to call endpoint to get all the languages that webapp supports
  export const getLanguages = () => {
    const getTranslateFail = "GET_LANGUAGES_FAIL";
    return axios.get(BASE_URL+"/getLanguages").catch((error) => ({
      type: getTranslateFail,
      error,
    }));
  };


   //Helper for cookies
   function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // function to call endpoint to get tweets
  export const getTweets = (id) => {
    const getTweetsFail = "GET_TWEETS_FAIL";
    return axios.get(BASE_URL+"/getTweets" + "/" + getCookie("reqToken") + "/"
    + getCookie("reqSecret") + "/" + getCookie("oauth_verifier")).catch((error) => ({
      type: getTweetsFail,
      error,
    }));
  };

  //function to call end point to post tweets
  export const postTweet = (text, gifUrl) => {
    const postTweetFail = "POST_TWEET_FAIL";
    return axios.post(BASE_URL+"/writeTweet" + "/" + getCookie("reqToken") + "/"
    + getCookie("reqSecret") + "/" + getCookie("oauth_verifier") + "/" + text, gifUrl).catch((error) => ({
      type: postTweetFail,
      error,
    }));
  };