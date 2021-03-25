import React, { Fragment } from "react";
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
import Inicio from "pages/Inicio";
import DarkFooter from "components/Footers/DarkFooter";
import IndexNavbar from "components/Navbars/IndexNavbar";
import Example from "pages/PisoPreview.component";
import PisoPreview from "pages/PisoPreview.component";
import Navbars from "views/index-sections/Navbars";
import SignUp from "views/index-sections/SignUp";
import EnviarMensaje from "pages/Mensaje.component";


function App() {
    return (

        <Fragment>

            {/**TopBar */}
            <IndexNavbar />

            {/**Ruteo */}
            <Switch>

                <Route
                    exact path="/rentabuenosaires" exact
                    render={(props) => <Inicio {...props} />}
                />
                <Route
                    exact path="/piso" exact
                    render={(props) => <PisoPreview {...props} />}
                />

                <Route
                    exact path="/piso/Piso 1" exact
                    render={(props) => <Piso {...props} />}
                />

                <Route exact path="/index" render={(props) => <Index {...props} />} />
                <Route
                    exact path="/nucleo-icons"
                    render={(props) => <NucleoIcons {...props} />}
                />
                <Route
                    exact path="/landing"
                    render={(props) => <LandingPage {...props} />}
                />

                <Route
                    exact path="/profile-page"
                    render={(props) => <ProfilePage {...props} />}
                />
                <Route
                    exact path="/login"
                    render={(props) => <LoginPage {...props} />}
                />
                <Route
                    exact path="/3"
                    render={(props) => <SignUp {...props} />}
                />
                <Route
                    exact path="/mensaje"
                    render={(props) => <EnviarMensaje {...props} />}
                />
                <Route
                    exact path="/example"
                    render={(props) => <Example {...props} />}
                />

            </Switch>

            {/**Footer */}
            <DarkFooter />
        </Fragment>


    );
}


export default App;
