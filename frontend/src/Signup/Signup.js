import React, { useEffect } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import EmailValidator from "email-validator";
import AuthFormControl from "../common/AuthFormControl";
import { useForm, usePrevious } from "../common/hooks";
import { getIsLoading, getUser, getError } from "../data/auth.selectors";
import { signUpStart } from "../data/auth.actions";
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

const SignUp = ({ error, loading, signUp, user, history }) => {
  const classes = useStyles();
  const [fields, updateFIeld] = useForm({
    userName: "",
    email: "",
    password: "",
    password2: "",
  });

  const prevUser = usePrevious(user);

  useEffect(() => {
    if(prevUser === null && user !== null){
      history.push('/');
    }
  }, [user, prevUser, history]);

  const onSubmit = () => {
    const allValid = canSubmit();
    console.log(fields);
    console.log(allValid);

    signUp(fields);
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
    user: getUser(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (credentials) => dispatch(signUpStart(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
