import React, { useState } from "react";
import MaterialUI from "./components/layout/Material";
import { Grid } from "@material-ui/core";
import { TranslateForm, TranslateDisplay } from "./components";

function App() {
  const [response, setResponse] = useState("");
  const [responseVisable, setResponseVisable] = useState(false);

  const callBackResponse = (childData) => {
    setResponse(childData);
    setResponseVisable(true);
  };

  return (
    <Grid container>
      <Grid item xs>
        <MaterialUI paperClass="paper-top">
          <TranslateForm
            parentCallback={(childData) => callBackResponse(childData)}
          />
        </MaterialUI>
      </Grid>
      <Grid item xs>
        <Grid container direction="column">
          <Grid item xs>
            <MaterialUI paperClass="paper-top">
              <TranslateDisplay
                response={response}
                responseVisable={responseVisable}
              />
            </MaterialUI>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
