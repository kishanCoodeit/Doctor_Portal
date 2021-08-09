import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import toast, { Toaster } from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "white",
    padding: "3%",
    margin: "0% 7%",
    borderWidth: 5,
    boxShadow: "2px 2px 10px 2px #aaaaaa99",
    minHeight: "45vh",
    maxWidth: "350px",
  },
  typo: {
    flexGrow: 1,
    color: "black",
    textAlign: "center",
    marginBottom: "30px",
    fontWeight: "bold",
  },
  input: {
    margin: "13px",
    width: "70%",
    height: "25px",
    fontSize: "16px",
    border: "2px solid #4b38fa",
    outline: "none",
    padding: "15px",
    borderRadius: "5px",
  },
  button: {
    height: "58px",
    margin: "10px",
    fontSize: "18px",
    fontFamily: "open-sans, sans-serif",
    padding: "0px 32.5%",
    textAlign: "center",
    textTransform: "initial",
    color: "white",
    background: "#6129e2",
    "&:hover": {
      backgroundColor: "#6e3ce2",
    },
  },
  register: {
    color: "#ff0000a6",
    cursor: "pointer",
  },
}));

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const userchange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    fetch("http://localhost:3009/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.length > 0) {
          history.push("/dashboard");
        } else {
          toast.error("Please enter valid Email and Password");
        }
      });
  };

  const handleSignup = () => history.push("/signup");

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper className={classes.paper}>
          <Typography variant="h4" className={classes.typo}>
            Login
          </Typography>
          <input
            className={classes.input}
            type="email"
            placeholder="Email"
            name="email"
            value={loginData.email}
            onChange={userchange}
          />
          <input
            className={classes.input}
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={userchange}
          />
          <Button
            type="submit"
            variant="contained"
            className={classes.button}
            onClick={handleLogin}
          >
            Submit
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <span>Forgot Password</span>
          </div>
          <Toaster position="bottom-center" />
          <div style={{ marginTop: "50px", fontSize: "18px" }}>
            <span>Don't have an account?</span>
            &nbsp; &nbsp;
            <span onClick={handleSignup} className={classes.register}>
              Register Now
            </span>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
