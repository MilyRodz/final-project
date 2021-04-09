import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export default function Authentication() {
	const authContext = useContext(AuthContext);
	const loginHandler = () => {
		//API call to server...
		//response from server
		const userResponse = {
			token: "abjd2323jb443jbbb"
		};
		authContext.login(userResponse.token); //setAuthContext
	};
	const logoutHandler = () => {
		authContext.logout();
	};
	return (
		<>
			{!authContext.isLoggedIn && (
				<button className="login" onClick={loginHandler}>
					Login
				</button>
			)}
			{authContext.isLoggedIn && (
				<button className="logout" onClick={logoutHandler}>
					Logout
				</button>
			)}
		</>
	);
}
