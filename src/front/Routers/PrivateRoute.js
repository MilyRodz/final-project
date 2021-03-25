import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { isLogin } from "../utils";

const user = null;

export function PrivateRoute({ component: Component, ...rest }) {
	return (
		<>
			<Route {...rest}>{user ? <Component /> : <Redirect to="/login" />}</Route>
		</>
	);
}
