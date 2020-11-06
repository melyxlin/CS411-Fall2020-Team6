import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Select } from "../src/Component";
import Iframe from 'react-iframe'


function App() {
  const [gifVisable, setGifResponseVisable] = useState(false);
  const [gif, setGif] = useState(""); 
  const onSubmit = data => {
    const baseURL = "https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/search?q="+data.message+"&api_key=go8FOfcD0xY7if8tcWD8Yu9MnO40ylFW&limit=1";

    axios({url: baseURL})
    .then(function (response) {
      console.log(response.data)
      setGif("https://cors-anywhere.herokuapp.com/"+response.data.data[0]["url"]);
    })
    setGifResponseVisable(true);

};

  return (
<div>
      <h1>Translator</h1>
      <Form onSubmit={onSubmit}>
        <Input name="message" />

        <Input type="submit" value="Submit" />
      </Form>

      {gifVisable && (<img src = {gif} alt="gif" />)}
      </div>

  );
}

export default App;
