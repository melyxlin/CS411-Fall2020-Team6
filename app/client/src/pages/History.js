import React from "react";
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

  const userTweets = getTweets()

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
                  {top100Films.map((tweet) => (
                    <TableRow key={tweet.text}>
                      <TableCell component="th" scope="row">
                        {tweet.text}
                      </TableCell>
                      <TableCell align="right">{tweet.gifURI}</TableCell>
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

const top100Films = [
  {
    _id: 5fd7cc4d254e694f49c08adb,
    user_id: 1338020900868780000,
    text: 'pizza',
    gifURI: 'https://gph.is/1uJ3RE4'
  },
  {
    _id: 5fd7ccbba3158052ff294974,
    user_id: 1338020900868780000,
    text: 'cake',
    gifURI: 'https://gph.is/2wl7AwY'
  }
];
