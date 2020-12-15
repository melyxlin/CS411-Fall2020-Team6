import React, { useEffect, useState } from "react";
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
import { getGif, getTranslation, getLanguages } from "../../utils/apiRoutes";

export default function TranslateForm(props) {
   // maximum number of characters that can be tweeted (shorted to make room for gif)
  const MAX_CHARACTER = 250; 

  const [languages, setLanguages] = useState([]);

  //function to populate list of languages translate to
  const getLanguagesList = async () => {
    const languagesList = await getLanguages();
    setLanguages(languagesList.data);
  };

  useEffect(() => {
    getLanguagesList();
  }, []);

  //function to translation and gif from
  const submitForm = async (values) => {
    const transResponse = await getTranslation(
      values.message.replace(/\s/g, "%20"),
      values.lang
    );
    const gifResponse = await getGif(values.message.replace(/\s/g, "%20"));
    const respArray = [transResponse.data, gifResponse.data.downsized, gifResponse.data.bitly];
    sendResponse(respArray);
  };

  // function to display translation and gif
  const sendResponse = (response) => {
    props.parentCallback(response);
  };

  return (
    <Formik
      initialValues={{ message: "", lang: "" }}
      onSubmit={(values) => submitForm(values)}
      // Schema that prevents user from submitting if message and languages is not inputted.
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
                <InputLabel>Language</InputLabel>
                <Field
                  name="lang"
                  input={<OutlinedInput label="Language"></OutlinedInput>}
                  display="flex"
                  autoWidth={true}
                  as={Select}
                >
                  {languages.map((lang, index) => (
                    <MenuItem value={lang.code} key={index}>{lang.name}</MenuItem>
                  ))}
                </Field>
                {errors.lang && touched.lang && (
                  <FormHelperText>Language Required.</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <div>
              <Form>
                <Box className="form-box">
                  <TextField
                    multiline
                    fullWidth
                    variant="outlined"
                    label="Message"
                    name="message"
                    rows={10}
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