import React from "react";
import "./App.css";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, Grid } from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import Content from "./Content/Content";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0277bd",
      contrastText: "#ffffff",
    },
  },
});

const useStyles = makeStyles((theme) => {
  return {
    fullHeight: {
      height: "100%",
    },
  };
});

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container sx={12} alignItems="stretch" className={classes.fullHeight}>
        <Grid container item sx={12} direction="column">
          <Navbar />
          <Content />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
