import React from "react";
import { Form, Formik, Field } from "formik";
import {
  Box,
  TextField,
  Grid,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import { object, string } from "yup";
import PropTypes from "prop-types";

/**
 * @return {Formik} containing form fields for addding/validating token.
 */
export default function TranslateForm(props) {
  const MAX_CHARACTER = 280;

  const submitForm = async (values) => {
    console.log(values.message);
    console.log(values.lang);
    sendResponse(values.message);
  };

  const sendResponse = (response) => {
    props.parentCallback(response);
  };

  return (
    <Formik
      initialValues={{ message: "", lang: "" }}
      onSubmit={(values) => submitForm(values)}
      // Schema that prevents user from submitting if a token is not inputted.
      validationSchema={object({
        message: string().required("Must have a message"),
        lang: string().required("Must select language"),
      })}
    >
      {({
        handleChange,
        errors,
        touched,
        isSubmitting,
        values,
        setFieldValue,
      }) => (
        <div>
          <div>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <FormControl
                variant="outlined"
                fullWidth
                error={errors.lang && touched.lang}
                style={{ marginBottom: "1rem" }}
              >
                <InputLabel id="http">Language</InputLabel>
                <Field
                  // props to identify component in test suite.
                  inputProps={{ "data-testid": "language-field" }}
                  name="lang"
                  input={<OutlinedInput label="Language"></OutlinedInput>}
                  display="flex"
                  autoWidth={true}
                  as={Select}
                >
                  <MenuItem value="en-en">Spanish</MenuItem>
                  <MenuItem value="en-fr">French</MenuItem>
                  <MenuItem value="en-it">Italian</MenuItem>
                  <MenuItem value="en-cn">Chinese</MenuItem>
                  <MenuItem value="en-ru">Russian</MenuItem>
                </Field>
                {errors.lang && touched.lang && (
                  <FormHelperText>Language Required.</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <div>
              {/* Input box where users will input the token to be used. */}
              <Form>
                <Box className="form-box">
                  <TextField
                    // props to identify component in test suite.
                    // inputProps={{ "data-testid": "token-field" }}
                    multiline
                    fullWidth
                    variant="outlined"
                    label="Message"
                    name="message"
                    rows={10}
                    inputProps={{
                      maxLength: 280,
                      "data-testid": "message-field",
                    }}
                    onChange={handleChange}
                    error={errors.message && touched.message}
                    helperText={
                      errors.message && touched.message
                        ? "Message Required."
                        : values.message.length <= MAX_CHARACTER
                        ? `${values.message.length}/${MAX_CHARACTER}`
                        : `${MAX_CHARACTER}/${MAX_CHARACTER}`
                    }
                  />
                </Box>
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Button
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    disabled={isSubmitting}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    {isSubmitting ? "Translating" : "Translate"}
                  </Button>
                </Grid>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
TranslateForm.propTypes = {
  parentCallback: PropTypes.func,
};
