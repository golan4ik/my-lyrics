import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../data/auth.selectors";

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getUser(state),
  };
};

export default connect(mapStateToProps)(
  ({ component: Component, isAuthenticated, ...props }) => {
    //console.log(isAuthenticated, Component, props);

    return isAuthenticated ? (
      <Route component={Component} {...props} />
    ) : (
      <Redirect to="/signin" />
    );
  }
);
