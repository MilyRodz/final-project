import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	return <Route {...rest}>{user ? <Component /> : <Redirect to="/Login" />}</Route>;
};

export default PrivateRoute;
