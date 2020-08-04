import React from "react";
import { Provider } from "react-redux";
import axiosConfig from "./utils/axiosConfig";
import configureStore from "./store/configureStore";
import "./App.css";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, Grid } from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import Content from "./Content/Content";

import 'react-perfect-scrollbar/dist/css/styles.css';

axiosConfig();
const store = configureStore();

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
    appbarOffset: theme.mixins.toolbar,
  };
});

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Navbar />
        <div className={classes.appbarOffset} />
        <Grid
          container
          sx={12}
          alignItems="stretch"
          className={classes.fullHeight}
        >
          <Grid container item sx={12} direction="column">
            <Content />
          </Grid>
        </Grid>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
