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
  img: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "13%",
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
}));

const Signup = () => {
  const history = useHistory();
  const classes = useStyles();
  const [signUpDetail, setSignUpDetail] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const userchange = (e) => {
    setSignUpDetail({
      ...signUpDetail,
      [e.target.name]: e.target.value,
    });
  };

  console.log(signUpDetail);

  const handleLogin = () => {
    if (
      signUpDetail.first_name !== "" &&
      signUpDetail.last_name !== "" &&
      signUpDetail.email !== "" &&
      signUpDetail.password !== ""
    ) {
      fetch("http://localhost:3009/user/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpDetail),
      })
        .then((res) => res.json())
        .then((response) => console.log("response", response));
      history.push("/dashboard");
    } else {
      toast.error("Please fill the required detail");
    }
  };

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
            Sign up
          </Typography>
          <input
            className={classes.input}
            type="text"
            placeholder="First Name"
            name="first_name"
            value={signUpDetail.first_name}
            onChange={userchange}
          />
          <input
            className={classes.input}
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={signUpDetail.last_name}
            onChange={userchange}
          />
          <input
            className={classes.input}
            type="email"
            placeholder="Email"
            name="email"
            value={signUpDetail.email}
            onChange={userchange}
          />
          <input
            className={classes.input}
            placeholder="Create Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={signUpDetail.password}
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
          <Toaster position="bottom-center" />
        </Paper>
      </Box>
    </div>
  );
};

export default Signup;
