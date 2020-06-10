import React from "react";
import { Provider } from "react-redux";
import axiosConfig from "./utils/axiosConfig";
import configureStore from "./store/configureStore";
import "./App.css";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, Grid } from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import Content from "./Content/Content";

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
  };
});

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Grid
          container
          sx={12}
          alignItems="stretch"
          className={classes.fullHeight}
        >
          <Grid container item sx={12} direction="column">
            <Navbar />
            <Content />
          </Grid>
        </Grid>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
