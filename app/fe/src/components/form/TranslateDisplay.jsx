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

export default function TranslateDisplay(props) {
  const response = props.response;
  const responseVisable = props.responseVisable;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box className="form-box">
        <TextField
          // props to identify component in test suite.
          // inputProps={{ "data-testid": "token-field" }}
          multiline
          fullWidth
          variant="outlined"
          value={responseVisable ? response[0] : ""}
          rows={10}
          InputProps={{
            readOnly: true,
            "data-testid": "display-field",
          }}
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
            onClick={handleClickOpen}
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
