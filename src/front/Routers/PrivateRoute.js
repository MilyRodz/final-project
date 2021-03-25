import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (verifySession()) {
				return <Component {...props} />;
			} else {
				return <Redirect to="/Login" />;
			}
		}}
	/>
);

export default PrivateRoute;
