import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";

// pages
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "pages/LoginPage/LoginPage";

import Piso from "pages/Piso/Piso";
import Inicio from "pages/Inicio/Inicio";
import PisoPreview from "pages/PisoPreview/PisoPreview.component";

import DarkFooter from "components/Footers/DarkFooter";
import IndexNavbar from "components/Navbars/IndexNavbar";


import EnviarMensaje from "pages/Mensaje/Mensaje.component";
import Adisionar from "pages/Adicionar/Adisionar";

//styles
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "./App.scss"

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
                    exact path="/pisos" exact
                    render={(props) => <PisoPreview {...props} />}
                />

                <Route
                    exact path="/piso/1" exact
                    render={(props) => <Piso {...props} />}
                />
                <Route
                    exact path="/adisionar" exact
                    render={(props) => <Adisionar {...props} />}
                />

                <Route
                    exact path="/nucleo-icons"
                    render={(props) => <NucleoIcons {...props} />}
                />

                <Route
                    exact path="/login"
                    render={(props) => <LoginPage {...props} />}
                />

                <Route
                    exact path="/mensaje"
                    render={(props) => <EnviarMensaje {...props} />}
                />


            </Switch>

            {/**Footer */}
            <DarkFooter />
        </Fragment>


    );
}


export default App;
