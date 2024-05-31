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
import { useState , useEffect} from 'react';
import axios from 'axios';

const registerSchema = yup.object().shape({
  title: yup.string().required("required"),
  body: yup.string().required("required"),
  venue_img: yup.string().required("required"),
});

const initialValuesRegister = {
  title: "",
  body: "",
  venue_img: "",
};

const Form1 = () => {
  const navigate = useNavigate();

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      if (!value == "venue_img"){
        formData.append(value, values[value]);
      }
    }
    formData.append("venue_img", values.venue_img.name);

    const savedUserResponse = await fetch(
      "http://127.0.0.1:8000/details",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    // onSubmitProps.resetForm(); // Resets the form after submit just in case 

    if (savedUser) {
      // navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // navigate("/home");
    // console.log(`${values.title}`);
    // console.log(`${values.body}`);
    // console.log(`${values.venue_img}`);
    await register(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit} // When the button with type submit is pressed below it will triigger this and go to the function "handleFormSubmit"
      initialValues={ initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
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
              "& > div": { gridColumn: undefined},
            }}
          >
            {(
              <>
                <TextField
                  label="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={
                    Boolean(touched.title) && Boolean(errors.title)
                  }
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="body"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.body}
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
                        <input {...getInputProps()} />
                        {!values.venue_img ? (
                          <p>Add venue_img Here</p>
                        ) : (
                            <Typography>{values.venue_img.name}</Typography>
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
            <Typography
              onClick={() => {
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Reset
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form1;