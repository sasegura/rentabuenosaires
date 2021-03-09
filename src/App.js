import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import Piso from "pages/Piso";

function App() {
    return (
        /**TopBar */


        /**Ruteo */
    <BrowserRouter>
        <Switch>
        <Switch>
            <Route exact path="/index" render={(props) => <Index {...props} />} />
            <Route
            exact path="/nucleo-icons"
            render={(props) => <NucleoIcons {...props} />}
            />
            <Route
            exact path="/"
            render={(props) => <LandingPage {...props} />}
            />
            <Route
            exact path="/piso"
            render={(props) => <Piso {...props} />}
            />
            <Route
            path="/profile-page"
            render={(props) => <ProfilePage {...props} />}
            />
            <Route
            path="/login-page"
            render={(props) => <LoginPage {...props} />}
            />
        </Switch>
        </Switch>
    </BrowserRouter>

    /**Footer */
);}
export default App;
