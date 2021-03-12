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
import Inicio from "pages/Inicio";
import DarkFooter from "components/Footers/DarkFooter";
import IndexNavbar from "components/Navbars/IndexNavbar";

function App() {
    return (
    
        <BrowserRouter>

            {/**TopBar */}
            <IndexNavbar/>

            {/**Ruteo */}
            <Switch>

                <Route
                exact path="/rentabuenosaires"
                render={(props) => <Inicio {...props} />}
                />
                <Route
                exact path="/piso"
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
                path="/profile-page"
                render={(props) => <ProfilePage {...props} />}
                />
                <Route
                path="/login-page"
                render={(props) => <LoginPage {...props} />}
                />
            </Switch>

            {/**Footer */}
            <DarkFooter/>
           
        </BrowserRouter>

);}
export default App;
