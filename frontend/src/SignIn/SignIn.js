import React from "react";
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
import { signInStart } from "../data/auth.actions";
import { connect } from "react-redux";
import { useEffect } from "react";

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

const SignIn = ({ error, loading, signIn, history, user }) => {
  const classes = useStyles();
  const [fields, updateFIeld] = useForm({
    email: "",
    password: "",
  });
  const prevUser = usePrevious(user);

  useEffect(() => {
    if(prevUser === null && user !== null){
      history.push('/');
    }
  }, [user, prevUser]);

  const onSubmit = () => {
    const allValid = canSubmit();
    console.log(fields);
    console.log(allValid);

    signIn(fields);
  };

  const canSubmit = () => {
    let result = true;
    const { password, email } = fields;

    result = password.length > 5;
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
          Sign In
        </Typography>
        <Grid container item xs={12} justify="center">
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
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, props) => {
  const user = getUser(state);

  return {
    loading: getIsLoading(state),
    error: getError(state),
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signInStart(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
