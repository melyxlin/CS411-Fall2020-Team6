import React from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { postTweet } from "../../utils/apiRoutes";


export default function TranslateDisplay(props) {
  const response = props.response;
  const responseVisable = props.responseVisable;

  const [open, setOpen] = React.useState(false);

  const handlePostTweet = () => {
    setOpen(true);
    postTweet(response[0], {gifUrl:response[2]});
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box className="form-box">
        <TextField
          multiline
          fullWidth
          variant="outlined"
          value={responseVisable ? response[0] : ""}
          rows={10}
          style={{ marginBottom: "1rem" }}
        />
        {responseVisable && (<img src={response[1]} alt="gif" />)}
      </Box>
      {responseVisable && (
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Button
            inputProps={{
              "data-testid": "translate-button",
            }}
            className="button-info"
            variant="contained"
            color="primary"
            onClick={handlePostTweet}
          >
            Tweet
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Tweet Posted"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your Tweet has been posted sucessfully.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                View Tweet
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </div>
  );
}

TranslateDisplay.propTypes = {
  response: PropTypes.array,
  responseVisable: PropTypes.bool,
};
