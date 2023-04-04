import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Pages/Home";
import menu from "../globals/Menu";
import { PublicRoute } from "./PublicRoute";
import { useStore } from "react-hookstore";
import PageNotFound from "../components/Pages/PageNotFound";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            {menu.map((item) => (
                <Route path={item.route} exact component={item.component} />         
            ))}
            <Route component={PageNotFound} />
        </Switch>
    );
}
