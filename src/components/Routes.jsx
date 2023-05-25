import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";
import Orders from "../pages/Orders";
import TicketChecker from "../pages/TicketChecker";
import Users from "../pages/Users";
import Showtimes from "../pages/Showtimes";

const Routes = () => {
	return (
		<Switch>
			<Route path='/' exact component={Dashboard} />
			<Route path='/TicketChecker' component={TicketChecker} />
			<Route path='/users' component={Users} />
			<Route path='/movies' component={Movies} />
			<Route path='/showtimes' component={Showtimes} />
			<Route path='/orders' component={Orders} />
		</Switch>
	);
};

export default Routes;
