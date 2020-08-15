import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axiosConfig from "./utils/axiosConfig";
import configureStore from "./store/configureStore";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import Main from "./Main/Main";
import SignIn from "./SignIn/SignIn";
import ProtectedRoute from "./utils/ProtectedRoute";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./App.css";
import { useIsAuthenticated } from "./utils/networking";
import Signup from "./Signup/Signup";

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
  const [isAuthenticated] = useIsAuthenticated();

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Navbar />
          <div className={classes.appbarOffset} />

          <Switch>
            <ProtectedRoute exact path="/" component={Main} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={Signup} />
            <Route path="*" component={() => <div>404 Not Found</div>} />
          </Switch>
        </Provider>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
