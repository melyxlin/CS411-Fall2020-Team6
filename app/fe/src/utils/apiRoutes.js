import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const getGif = (msg) => {
    const requestString = `${BASE_URL}`;
    const getGifFail = "GET_GIF_FAIL";
    return axios.get(requestString+"/getGif/"+msg).catch((error) => ({
      type: getGifFail,
      error,
    }));
  };

  export const getTranslation = (msg, lang) => {
    const requestString = `${BASE_URL}`;
    const getTranslateFail = "GET_TRANSLATE_FAIL";
    return axios.get(requestString+"/translate/"+msg+"/"+lang).catch((error) => ({
      type: getTranslateFail,
      error,
    }));
  };