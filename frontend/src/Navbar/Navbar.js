import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Avatar from "@material-ui/core/Avatar";
import { withRouter } from "react-router-dom";
import { getUser, getIsLoading } from "../data/auth.selectors";
import { connect } from "react-redux";
import { Tooltip, Grid } from "@material-ui/core";
import { setUser } from "../data/auth.actions";
import { usePrevious } from "../common/hooks";
import AvatarImg from "./music-2-xxl.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  toolbar: {
    justifyContent: "space-around",
  },
  rightBlock: {
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoutButton: {
    color: theme.palette.error.main,
    marginLeft: theme.spacing(1),
  },
  favoritesIcon: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(3),
    cursor: "pointer",
    "& img": {
      width: "80%",
      height: "80%",
    },
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}));

const Navbar = ({ history, location, user, authInProcess, signOut }) => {
  const classes = useStyles();
  const isAuthenticated = !!user;

  const showSignIn = location.pathname === "/signup" && !authInProcess;
  const showSignUp = location.pathname === "/signin" && !authInProcess;

  const prevUser = usePrevious(user);

  useEffect(() => {
    if (!prevUser && user === null && location.pathname !== "/signup") {
      history.push("/signin");
    }
  }, [user, prevUser, history]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => (authInProcess ? null : history.push("/"))}
          >
            My Lyrics
          </Typography>
          <Grid container item className={classes.rightBlock}>
            {!isAuthenticated && (
              <>
                {showSignIn && (
                  <Button
                    color="inherit"
                    disabled={authInProcess}
                    onClick={() => history.push("/signin")}
                  >
                    Sign In
                  </Button>
                )}
                {showSignUp && (
                  <Button
                    color="inherit"
                    disabled={authInProcess}
                    onClick={() => history.push("/signup")}
                  >
                    Sign Up
                  </Button>
                )}
              </>
            )}
            {isAuthenticated && !(showSignIn || showSignUp) && (
              <>
                <Tooltip title={"My favorites"} aria-label="My favorites">
                  <Avatar
                    className={classes.favoritesIcon}
                    onClick={() => history.push("/favorites")}
                    variant="rounded"
                    src={AvatarImg}
                  />
                </Tooltip>
                <IconButton
                  className={classes.logoutButton}
                  size="small"
                  aria-label="Logout"
                  onClick={signOut}
                >
                  <PowerSettingsNewIcon />
                </IconButton>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
    authInProcess: getIsLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(setUser(null)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
