import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Orders from "../pages/Orders";
import Movies from "../pages/Movies";
import Discount from "../pages/Discount";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/users" component={Users} />
      <Route path="/movies" component={Movies} />
      <Route path="/discount" component={Discount} />

      <Route path="/orders" component={Orders} />
    </Switch>
  );
};

export default Routes;
