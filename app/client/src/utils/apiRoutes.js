import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const getGif = (msg) => {
    const getGifFail = "GET_GIF_FAIL";
    return axios.get(BASE_URL+"/getGif/"+msg).catch((error) => ({
      type: getGifFail,
      error,
    }));
  };

  export const getTranslation = (msg, lang) => {
    const getTranslateFail = "GET_TRANSLATE_FAIL";
    return axios.get(BASE_URL+"/translate/"+msg+"/"+lang).catch((error) => ({
      type: getTranslateFail,
      error,
    }));
  };


  export const getLanguages = () => {
    const getTranslateFail = "GET_LANGUAGES_FAIL";
    return axios.get(BASE_URL+"/getLanguages").catch((error) => ({
      type: getTranslateFail,
      error,
    }));
  };

  export const getUserData = (oauth_token, oauth_verifier) => {
    const getUserDataFail = "GET_USER_DATA_FAIL";
    return axios.get(BASE_URL+"/access-token" + "/" + oauth_token + "/" + oauth_verifier).catch((error) => ({
      type: getUserDataFail,
      error,
    }));
  };