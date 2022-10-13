/* eslint-disable no-undef */
import React from "react";
// import {useSelector} from "react-redux";
import {Route, Navigate} from "react-router-dom";

const ProtectedRoute = props => {
  // const user = useSelector(state => state.session.user);
  return (
    <Route {...props}>
      {false ? props.children : <Navigate to="/" />}
      {/* {user ? props.children : <Redirect to="/login" />} */}
    </Route>
  );
};

export default ProtectedRoute;
