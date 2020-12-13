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
import {getGif, getTranslation} from "../../utils/apiRoutes" 

export default function TranslateForm(props) {
  const MAX_CHARACTER = 280;

  const submitForm = async (values) => {
    console.log(values.message);
    console.log(values.lang);
    const transResponse = await getTranslation (values.message.replace(/\s/g, "%20"), values.lang);
    const gifResponse = await getGif(values.message.replace(/\s/g, "%20"));
    console.log(gifResponse.data);
    const respArray = [transResponse, gifResponse.data]
    sendResponse(respArray);
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
                  {languages.map((lang) => (
                    <MenuItem value={lang.name}>{lang.name}</MenuItem>
                  ))}
                
       
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


const languages = [
  {
     "code":"af",
     "name":"Afrikaans"
  },
  {
     "code":"sq",
     "name":"Albanian"
  },
  {
     "code":"am",
     "name":"Amharic"
  },
  {
     "code":"ar",
     "name":"Arabic"
  },
  {
     "code":"hy",
     "name":"Armenian"
  },
  {
     "code":"az",
     "name":"Azerbaijani"
  },
  {
     "code":"eu",
     "name":"Basque"
  },
  {
     "code":"be",
     "name":"Belarusian"
  },
  {
     "code":"bn",
     "name":"Bengali"
  },
  {
     "code":"bs",
     "name":"Bosnian"
  },
  {
     "code":"bg",
     "name":"Bulgarian"
  },
  {
     "code":"ca",
     "name":"Catalan"
  },
  {
     "code":"ceb",
     "name":"Cebuano"
  },
  {
     "code":"ny",
     "name":"Chichewa"
  },
  {
     "code":"zh-CN",
     "name":"Chinese (Simplified)"
  },
  {
     "code":"zh-TW",
     "name":"Chinese (Traditional)"
  },
  {
     "code":"co",
     "name":"Corsican"
  },
  {
     "code":"hr",
     "name":"Croatian"
  },
  {
     "code":"cs",
     "name":"Czech"
  },
  {
     "code":"da",
     "name":"Danish"
  },
  {
     "code":"nl",
     "name":"Dutch"
  },
  {
     "code":"en",
     "name":"English"
  },
  {
     "code":"eo",
     "name":"Esperanto"
  },
  {
     "code":"et",
     "name":"Estonian"
  },
  {
     "code":"tl",
     "name":"Filipino"
  },
  {
     "code":"fi",
     "name":"Finnish"
  },
  {
     "code":"fr",
     "name":"French"
  },
  {
     "code":"fy",
     "name":"Frisian"
  },
  {
     "code":"gl",
     "name":"Galician"
  },
  {
     "code":"ka",
     "name":"Georgian"
  },
  {
     "code":"de",
     "name":"German"
  },
  {
     "code":"el",
     "name":"Greek"
  },
  {
     "code":"gu",
     "name":"Gujarati"
  },
  {
     "code":"ht",
     "name":"Haitian Creole"
  },
  {
     "code":"ha",
     "name":"Hausa"
  },
  {
     "code":"haw",
     "name":"Hawaiian"
  },
  {
     "code":"iw",
     "name":"Hebrew"
  },
  {
     "code":"hi",
     "name":"Hindi"
  },
  {
     "code":"hmn",
     "name":"Hmong"
  },
  {
     "code":"hu",
     "name":"Hungarian"
  },
  {
     "code":"is",
     "name":"Icelandic"
  },
  {
     "code":"ig",
     "name":"Igbo"
  },
  {
     "code":"id",
     "name":"Indonesian"
  },
  {
     "code":"ga",
     "name":"Irish"
  },
  {
     "code":"it",
     "name":"Italian"
  },
  {
     "code":"ja",
     "name":"Japanese"
  },
  {
     "code":"jw",
     "name":"Javanese"
  },
  {
     "code":"kn",
     "name":"Kannada"
  },
  {
     "code":"kk",
     "name":"Kazakh"
  },
  {
     "code":"km",
     "name":"Khmer"
  },
  {
     "code":"rw",
     "name":"Kinyarwanda"
  },
  {
     "code":"ko",
     "name":"Korean"
  },
  {
     "code":"ku",
     "name":"Kurdish (Kurmanji)"
  },
  {
     "code":"ky",
     "name":"Kyrgyz"
  },
  {
     "code":"lo",
     "name":"Lao"
  },
  {
     "code":"la",
     "name":"Latin"
  },
  {
     "code":"lv",
     "name":"Latvian"
  },
  {
     "code":"lt",
     "name":"Lithuanian"
  },
  {
     "code":"lb",
     "name":"Luxembourgish"
  },
  {
     "code":"mk",
     "name":"Macedonian"
  },
  {
     "code":"mg",
     "name":"Malagasy"
  },
  {
     "code":"ms",
     "name":"Malay"
  },
  {
     "code":"ml",
     "name":"Malayalam"
  },
  {
     "code":"mt",
     "name":"Maltese"
  },
  {
     "code":"mi",
     "name":"Maori"
  },
  {
     "code":"mr",
     "name":"Marathi"
  },
  {
     "code":"mn",
     "name":"Mongolian"
  },
  {
     "code":"my",
     "name":"Myanmar (Burmese)"
  },
  {
     "code":"ne",
     "name":"Nepali"
  },
  {
     "code":"no",
     "name":"Norwegian"
  },
  {
     "code":"or",
     "name":"Odia (Oriya)"
  },
  {
     "code":"ps",
     "name":"Pashto"
  },
  {
     "code":"fa",
     "name":"Persian"
  },
  {
     "code":"pl",
     "name":"Polish"
  },
  {
     "code":"pt",
     "name":"Portuguese"
  },
  {
     "code":"pa",
     "name":"Punjabi"
  },
  {
     "code":"ro",
     "name":"Romanian"
  },
  {
     "code":"ru",
     "name":"Russian"
  },
  {
     "code":"sm",
     "name":"Samoan"
  },
  {
     "code":"gd",
     "name":"Scots Gaelic"
  },
  {
     "code":"sr",
     "name":"Serbian"
  },
  {
     "code":"st",
     "name":"Sesotho"
  },
  {
     "code":"sn",
     "name":"Shona"
  },
  {
     "code":"sd",
     "name":"Sindhi"
  },
  {
     "code":"si",
     "name":"Sinhala"
  },
  {
     "code":"sk",
     "name":"Slovak"
  },
  {
     "code":"sl",
     "name":"Slovenian"
  },
  {
     "code":"so",
     "name":"Somali"
  },
  {
     "code":"es",
     "name":"Spanish"
  },
  {
     "code":"su",
     "name":"Sundanese"
  },
  {
     "code":"sw",
     "name":"Swahili"
  },
  {
     "code":"sv",
     "name":"Swedish"
  },
  {
     "code":"tg",
     "name":"Tajik"
  },
  {
     "code":"ta",
     "name":"Tamil"
  },
  {
     "code":"tt",
     "name":"Tatar"
  },
  {
     "code":"te",
     "name":"Telugu"
  },
  {
     "code":"th",
     "name":"Thai"
  },
  {
     "code":"tr",
     "name":"Turkish"
  },
  {
     "code":"tk",
     "name":"Turkmen"
  },
  {
     "code":"uk",
     "name":"Ukrainian"
  },
  {
     "code":"ur",
     "name":"Urdu"
  },
  {
     "code":"ug",
     "name":"Uyghur"
  },
  {
     "code":"uz",
     "name":"Uzbek"
  },
  {
     "code":"vi",
     "name":"Vietnamese"
  },
  {
     "code":"cy",
     "name":"Welsh"
  },
  {
     "code":"xh",
     "name":"Xhosa"
  },
  {
     "code":"yi",
     "name":"Yiddish"
  },
  {
     "code":"yo",
     "name":"Yoruba"
  },
  {
     "code":"zu",
     "name":"Zulu"
  },
  {
     "code":"he",
     "name":"Hebrew"
  },
  {
     "code":"zh",
     "name":"Chinese (Simplified)"
  }
]