import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup"
import PrivateRoutes from "./auth/helper/PrivateRoutes";

//{/* UserDashboard.js exercise 6th import UserDasboard */}
import  UserDashboard from "./user/UserDashboard";
import Signin from "./user/Signin"

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/signin' exact component={Signin} />
                {/* UserDashboard.js exercise 5th uncomment the link below with PrivateRoutes */}
                <PrivateRoutes path="/borrowuser/dashboard" exact component={UserDashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;