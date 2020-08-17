import React from "react";
import {
  Grid,
  makeStyles,
  Paper,
  FormControl,
  Typography,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@material-ui/core";
import EmailValidator from "email-validator";
import AuthFormControl from "../common/AuthFormControl";
import { useForm } from "../common/hooks";
import { getIsLoading, getUser, getError } from "../data/auth.selectors";
import { signInStart } from "../data/auth.actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
  },
  content: {
    padding: () => theme.spacing(4),
  },
  title: {
    margin: "auto",
  },
  submitBtn: {
    marginTop: theme.spacing(4),
  },
}));

const SignUp = ({ error, loading, signIn }) => {
  const classes = useStyles();
  const [fields, updateFIeld] = useForm({
    userName: "",
    email: "",
    password: "",
    password2: "",
  });

  const onSubmit = () => {
    const allValid = canSubmit();
    console.log(fields);
    console.log(allValid);

    signIn(fields);
  };

  const canSubmit = () => {
    let result = true;
    const { userName, password, password2, email } = fields;

    result = password.length > 5 && password2 === password;
    result = result && userName.length > 0;
    result = result && EmailValidator.validate(email);

    return result;
  };

  return (
    <Grid
      container
      item
      xs={12}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid container item xs={12} md={4} lg={2} className={classes.content}>
        <Typography component="h3" variant="h5" className={classes.title}>
          Sign Up
        </Typography>
        <Grid container item xs={12} justify="center">
          <AuthFormControl
            id="userName"
            label="User Name"
            error={error}
            value={fields.userName}
            onChange={updateFIeld}
            disabled={loading}
          />
          <AuthFormControl
            id="email"
            label="Email"
            type="email"
            error={error}
            value={fields.email}
            onChange={updateFIeld}
            disabled={loading}
          />
          <AuthFormControl
            id="password"
            label="Password"
            type="password"
            error={error}
            value={fields.password}
            onChange={updateFIeld}
            disabled={loading}
          />
          <AuthFormControl
            id="password2"
            label="Repeat Password"
            type="password"
            error={error}
            value={fields.password2}
            onChange={updateFIeld}
            disabled={loading}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify="center"
          className={classes.submitBtn}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={loading}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, props) => {
  return {
    loading: getIsLoading(state),
    error: getError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signInStart(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
