import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import { withRouter } from "react-router-dom";
import { useIsAuthenticated } from "../utils/networking";
import { getUser, getIsLoading } from "../data/auth.selectors";
import { connect } from "react-redux";
import { Tooltip, Grid } from "@material-ui/core";

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
  userAvatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    cursor: "pointer",
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}));

const Navbar = ({ history, location, user, authInProcess }) => {
  const classes = useStyles();
  const isAuthenticated = !!user;

  const showSignIn = location.pathname !== "/signin" && !authInProcess;
  const showSignUp = location.pathname !== "/signup" && !authInProcess;

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {/* {isAuthenticated && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )} */}
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
            {isAuthenticated && (
              <>
                <Tooltip title={"My favorites"} aria-label="My favorites">
                  <Avatar
                    className={classes.userAvatar}
                    onClick={() => history.push("/favorites")}
                  >
                    {user[0] || "F"}
                  </Avatar>
                </Tooltip>
                <IconButton
                  className={classes.logoutButton}
                  size="small"
                  aria-label="Logout"
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

export default withRouter(connect(mapStateToProps)(Navbar));
