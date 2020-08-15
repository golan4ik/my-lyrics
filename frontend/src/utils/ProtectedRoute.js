import React from "react";
import { useIsAuthenticated } from "./networking";
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, ...props }) => {
  const [isAuthenticated] = useIsAuthenticated();

  console.log(isAuthenticated);

  return (isAuthenticated ? (
    <Route component={Component} {...props} />
  ) : (
    <Redirect to="/signin" />
  ));
};
