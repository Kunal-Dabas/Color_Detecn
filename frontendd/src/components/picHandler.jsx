/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useState, useEffect } from 'react';

const registerSchema = yup.object().shape({
  title: yup.string(),
  body: yup.string(),
  venue_img: yup.string(),
});

const initialValuesRegister = {
  title: "",
  body: "",
  venue_img: "",
};

const Form = () => {
  const navigate = useNavigate();
  const [postData, updateFormData] = useState(initialValuesRegister);
  const [postimage, setPostImage] = useState();
  const [answer , setAnswer] = useState();


  const handleChange = (e) => {
    if ([e.target.name] == 'venue_img') {
      setPostImage({
        image: e.target.files,
      });
      console.log(e.target.files);
    } else {
      updateFormData({
        ...postData,
        [e.target.name]: e.target.value,
      });
    }
  };


  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in postData) {
      formData.append(value, postData[value]);
    }
    formData.append("venue_img", postimage.image[0]);

    const savedUserResponse = await fetch(
      "http://127.0.0.1:8000/details",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    setAnswer(savedUser)
    onSubmitProps.resetForm(); // Resets the form after submit just in case 
  };
  

  

  const handleFormSubmit = async (values, onSubmitProps) => {
    // console.log(`${postData.title}`);
    // console.log(`${postData.body}`);
    // console.log(`${postimage.image[0]}`);
    await register(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit} // When the button with type submit is pressed below it will triigger this and go to the function "handleFormSubmit"
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: undefined },
            }}
          >
            {(
              <>
                <TextField
                  label="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={postData.title}
                  name="title"
                  error={
                    Boolean(touched.title) && Boolean(errors.title)
                  }
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="body"
                  onBlur={handleBlur}
                  onChange={handleChange}

                  name="body"
                  error={
                    Boolean(touched.body) && Boolean(errors.body)
                  }
                  helperText={touched.body && errors.body}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid grey`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("venue_img", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed grey`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()}
                          accept="image/*"
                          id="post-image"
                          onChange={handleChange}
                          name="venue_img"
                          type="file"
                        />
                        {!postimage ? (
                          <p>Add image Here</p>
                        ) : (
                          <Typography>{postimage.image[0].name}</Typography>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit" // this sumbits the formik form provided above and when clicked it triggers its onSubmit function around line 121
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "grey",
                color: "white",
                "&:hover": { color: "grey" },
              }}
            >
              Submit
            </Button>
            <div
              color="#fff"
            >
            {JSON.stringify(answer)}
            </div>
            
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;