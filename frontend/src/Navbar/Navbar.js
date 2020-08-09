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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoutButton: {
    color: theme.palette.error.main,
    marginLeft: theme.spacing(1),
    lol: () => console.log(theme),
  },
  userAvatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My Lyrics
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
          <Avatar className={classes.userAvatar}>
            {props.userName || "U"}
          </Avatar>
          <IconButton
            className={classes.logoutButton}
            size="small"
            aria-label="Logout"
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
