import React from "react";
import { Route, Redirect } from "react-router-dom";

const user = null;

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (user()) {
				return <Component {...props} />;
			} else {
				return <Redirect to="/Login" />;
			}
		}}
	/>
);

export default PrivateRoute;
