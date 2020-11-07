import React, { useState } from "react";
import axios from "axios";

function App() {
  const [gifVisable, setGifResponseVisable] = useState(false);
  const [gif, setGif] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const baseURL =
      "http://api.giphy.com/v1/gifs/translate?s=" +
      message.replace(/\s/g, "+") +
      "&api_key=go8FOfcD0xY7if8tcWD8Yu9MnO40ylFW&limit=1";

    axios({ url: baseURL }).then(function (response) {
      setGif(response.data.data.images.downsized.url);
    });
    setGifResponseVisable(true);
  };

  return (
    <div>
      <h1>Translator</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <input type="text" onChange={(e) => setMessage(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {gifVisable && (
        <div>
          <img src={gif} alt="gif" />
        </div>
      )}
    </div>
  );
}

export default App;
