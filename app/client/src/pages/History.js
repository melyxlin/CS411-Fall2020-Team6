import React, {useEffect, useState} from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Head } from "../components";
import { ThemeProvider } from "@material-ui/styles";
import MaterialUI from "../components/layout/Material";
import {
  createMuiTheme,
  responsiveFontSizes,
  withStyles,
} from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { getTweets } from "../utils/apiRoutes";

export default function History() {
  const [tweets, setTweets] = useState([]);
  const theme = responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: "dark",
        primary: blue,
        secondary: {
          main: "#ce93d8",
        },
      },
    })
  );

  const userTweets = async () => {
    const tweetsArray = await getTweets();
    setTweets(tweetsArray.data);
    
  }

  useEffect(() => {
    userTweets();
  });



  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  return (
    <ThemeProvider theme={theme}>
      <Head auth={true} />
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={12}>
          <MaterialUI paperClass="paper-top">
            <Typography variant="h3" style={{ marginBottom: "1rem" }}>
              Tweet History
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Text</StyledTableCell>
                    <StyledTableCell align="right">Gif</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tweets.map((tweet) => (
                    <TableRow key={tweet.text}>
                      <TableCell component="th" scope="row">
                        {tweet.text}
                      </TableCell>
                      <TableCell align="right"><img src={tweet.gifURI}/></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MaterialUI>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}