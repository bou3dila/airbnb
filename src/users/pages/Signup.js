import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { createClient } from "contentful-management";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [entry, setEntry] = useState();
  const [emailError, setEmailError] = useState("  ");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const checkMail = async (email) => {
    setLoading(true);
    const query = `{
      userCollection (where: {
        email:"${email}"
      })
        {
        items {
          email
         
        }
      }
    }`;
    await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer " + process.env.REACT_APP_ACCESS_TOKEN,
        },
        // send the GraphQL query

        body: JSON.stringify({ query }),
      }
    )
      .then((response) => response.json())
      .then(({ data, errors }) => {
        console.log(data.userCollection.items.length);
        if (errors) {
          console.error(errors);
        }
        if (data.userCollection.items.length > 0) {
          console.log(data.userCollection.items.length);
          setEmailError("email already exist");
        } else setEmailError("");
      });
    setLoading(false);
  };

  useEffect(() => {
    const submit = async () => {
      const client = await createClient({
        accessToken: process.env.REACT_APP_PERSONAL_ACCESS_TOKEN,
      });

      await client
        .getSpace(process.env.REACT_APP_SPACE_ID)
        .then((space) => space.getEnvironment("master"))
        .then((environment) =>
          environment.createEntry("user", {
            fields: {
              email: { "en-US": email },
              password: { "en-US": password },
              name: { "en-US": name },
            },
          })
        )
        .then((entry) => {
          console.log("here");
          entry.publish();
          setEntry(entry);
        })
        .catch((e) => {
          console.log(e);
        });
      setLoading(false);
    };
    if (emailError.length === 0 || emailError.length === 1) {
      setLoading(true);
      submit();
      setLoading(false);
    }
  }, [emailError]);

  useEffect(() => {
    setLoading(true);
    if (entry) {
      auth.login(entry.sys.id);
    }
    setLoading(false);
  }, [entry]);
  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError("password must be at least 6 char length");
    }
    if (name.length < 4) {
      setNameError("name must be at least 4 char length");
    }
    if (name.length >= 4 && password.length >= 6) {
      setPasswordError("");
      setNameError("");
      await checkMail(email);
      // if (emailError.length === 0) auth.login(entry.fields.sys.id);
    }

    setLoading(false);
  };

  //disable scrolling
  // window.onscroll = function () {
  //   window.scrollTo(0, 0);
  // };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form onSubmit={onSubmitHandler} className={classes.form} >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Full Name"
                    autoFocus
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    error={!!nameError}
                    helperText={nameError}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    error={emailError === "email already exist"}
                    helperText={emailError}
                    helper
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    error={!!passwordError}
                    helperText={passwordError}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      )}
    </>
  );
}
