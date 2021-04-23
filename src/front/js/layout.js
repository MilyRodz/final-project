import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/Home";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

import { CommunityPage } from "./pages/CommunityPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { PricingPage } from "./pages/PricingPage";

import { Error } from "./pages/Error";
import { ProfilePage } from "./pages/ProfilePage";
import PrivateRoute from "../Routers/PrivateRoute";
import { DashboardPage } from "./pages/DashboardPage";
import { Booking } from "./component/Booking";
import { ForgotPassword } from "./component/ForgotPassword";
import { ResetPassword } from "./component/ResetPassword";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/Login" component={LoginPage} />
						<Route exact path="/Register" component={RegisterPage} />

						<PrivateRoute path="/dashboard" component={DashboardPage} exact />
						<PrivateRoute path="/profile" component={ProfilePage} exact />
						<PrivateRoute path="/booking" component={Booking} exact />
						<Route exact path="/recuperar" component={ForgotPassword} />
						<Route exact path="/recuperar/:token" component={ResetPassword} />

						<Route path="*" component={Error} />
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
