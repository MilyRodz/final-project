import React, { useContext, useState, useEffect } from "react";
import { Context } from "../js/store/appContext";
import { Route, Redirect } from "react-router-dom";
import { LoginPage } from "../js/pages/LoginPage";
import { LoginPage22 } from "../js/pages/LoginPage2";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
	const { store } = useContext(Context);
	const token = store.user ? store.user.token : null;
	return <Route {...rest} render={props => (token ? <Component {...props} /> : <LoginPage path={path} />)} />;
};

export default PrivateRoute;
