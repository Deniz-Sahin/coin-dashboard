import { default as ReduxProvider, configureRedux } from "../utils/Redux";
import { Route, BrowserRouter as Router, Switch, useLocation } from "react-router-dom";

import AdminPage from "./admin";
import Dashboard from "./Dashboard";
import React from "react";
import TopMenu from "./topMenu";

export default function Main() {
	return (

        <React.Fragment>
            <TopMenu />
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/admin-page" component={AdminPage} />
            </Switch>
        </React.Fragment>

    )
}