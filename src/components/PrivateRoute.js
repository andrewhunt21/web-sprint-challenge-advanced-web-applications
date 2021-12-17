import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component:Component, ...rest}) => {
  return <Route {...rest} render={() => {
    if (localStorage.getItem("token")) {
      return <Component {...rest} />
    } else {
      return <Redirect to="/login" />
    }
  }} />;
}

export default PrivateRoute;

//Task List:
//1. Complete PrivateRoute