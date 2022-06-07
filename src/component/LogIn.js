import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { userSigninAuth, userSignupAuth } from "../api/auth";
import "../styles/LogIn.css";

function LogIn() {
  const [show, setShow] = useState(false);
  const [usertype, setUsertype] = useState("None");
  const [
    userIdLoginRef,
    userPassLoginRef,
    userIdRef,
    userNameRef,
    userMailRef,
    userPassRef,
    userTypeRef,
  ] = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const toggleSignup = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setUsertype(e.target.value);
  };

  const signUpFun = () => {
    setLoading(true);
    const data = {
      name: userNameRef.current.value,
      userId: userIdRef.current.value,
      email: userMailRef.current.value,
      userType: userTypeRef.current.value,
      password: userPassRef.current.value,
    };

    userSignupAuth(data)
      .then((responce) => {
        console.log(responce);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setShowSnackbar(true);
        setSnackbarMsg(error.response.data.message);
        setLoading(false);
      });
  };

  const logInFun = () => {
    setLoading(true);
    const data = {
      userId: userIdLoginRef.current.value,
      password: userPassLoginRef.current.value,
    };

    userSigninAuth(data)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setShowSnackbar(true);
        setSnackbarMsg(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <div className="login-main-container">
      <div className="login-container">
        <div className="sidePic">
          <img
            src="https://img.freepik.com/free-vector/smartphone-crm-system-app-isometric-illustration-customer-relationship-management-mobile-application-software-sales-metrics-client-data-analysis-phone-3d-concept-isolated-blue-background_151150-1097.jpg"
            alt=""
            className="sideImage"
          />
        </div>
        <div
          className="loginContainer"
          style={{ backgroundColor: theme.palette.background.default }}
        >
          {show ? (
            <>
              {" "}
              <div
                className="crm"
                style={{ color: theme.palette.text.primary }}
              >
                Customer Relationship Management
              </div>
              <div
                className="welcome"
                style={{ color: theme.palette.text.primary }}
              >
                Welcome to sasta CRM-APP
              </div>
              <TextField
                id="standard-basic"
                label="user id"
                variant="standard"
                inputRef={userIdLoginRef}
              />
              <TextField
                id="standard-basic"
                label="password"
                variant="standard"
                type="password"
                inputRef={userPassLoginRef}
              />
              <div
                className="forgot-pass"
                style={{ color: theme.palette.text.primary }}
              >
                forgot password?
              </div>
              <Button
                variant="contained"
                className="login-btn"
                onClick={logInFun}
                disabled={loading}
              >
                {loading ? <CircularProgress size={25} /> : "Sign in"}
              </Button>
              <div className="or" style={{ color: theme.palette.text.primary }}>
                <div className="line"></div>
                <div>OR</div>
                <div className="line"></div>
              </div>
              <div className="sign-with-google">
                <img
                  src="data:image/png;base64,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"
                  alt=""
                  className="google"
                />
                <span style={{ color: theme.palette.text.primary }}>
                  Sign in with google
                </span>
              </div>
              <div className="not-have-acc">
                <span
                  className="not-have-account"
                  style={{ color: theme.palette.text.primary }}
                >
                  Don't have an account?
                </span>
                <Button color="secondary" onClick={toggleSignup}>
                  Sign-up
                </Button>
              </div>
            </>
          ) : (
            <>
              <div
                className="crm"
                style={{ color: theme.palette.text.primary }}
              >
                Customer Relationship Management
              </div>
              <div
                className="getStarted"
                style={{ color: theme.palette.text.primary }}
              >
                Let's get started
              </div>
              <div
                className="welcome"
                style={{ color: theme.palette.text.primary }}
              >
                Welcome to sasta CRM-APP
              </div>
              <TextField
                id="standard-basic"
                label="user name"
                variant="standard"
                inputRef={userNameRef}
              />
              <TextField
                id="standard-basic"
                label="user id"
                variant="standard"
                inputRef={userIdRef}
              />
              <TextField
                id="standard-basic"
                label="e-mail"
                variant="standard"
                inputRef={userMailRef}
              />
              <TextField
                id="standard-basic"
                label="password"
                variant="standard"
                type="password"
                inputRef={userPassRef}
              />
              <FormControl sx={{ m: 1, minWidth: 180 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  select user type
                </InputLabel>
                <Select
                  value={usertype}
                  label="Select User Type"
                  onChange={handleChange}
                  inputRef={userTypeRef}
                >
                  <MenuItem value={"NONE"}>None</MenuItem>
                  <MenuItem value={"CUSTOMER"}>Customer</MenuItem>
                  <MenuItem value={"ENGINEER"}>Engineer</MenuItem>
                  <MenuItem value={"ADMIN"}>Admin</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                className="login-btn"
                style={{ marginTop: "1%" }}
                onClick={signUpFun}
                disabled={loading}
              >
                {loading ? <CircularProgress size={25} /> : "Sign up"}
              </Button>
              <div className="not-have-acc">
                <span
                  className="not-have-account"
                  style={{ color: theme.palette.text.primary }}
                >
                  Already have an account
                </span>
                <Button color="secondary" onClick={toggleSignup}>
                  Sign-in
                </Button>
              </div>
            </>
          )}
        </div>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => {
            setShowSnackbar(false);
            setSnackbarMsg("");
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="error"
            onClose={() => {
              setShowSnackbar(false);
              setSnackbarMsg("");
            }}
            sx={{ width: "100%" }}
          >
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default LogIn;
