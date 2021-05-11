import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

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
import EnviarMensaje from "pages/Mensaje/Mensaje.component";
import Adicionar from "pages/Adicionar/Adicionar";

//components
import DarkFooter from "components/Footers/DarkFooter";
import IndexNavbar from "components/Navbars/IndexNavbar";

//styles
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "./App.scss"
import LogOut from "pages/LogOut/LogOut";
import { index, linkPisos, linkAdicionar, linkLogin, linkMensaje, linkLogout } from "configuracion/constantes";

function App() {
    return (

        <Fragment>

            {/**TopBar */}
            <IndexNavbar />

            {/**Ruteo */}
            <Switch>

                <Route
                    exact path={index}
                    render={(props) => <Inicio {...props} />}
                />
                <Route
                    exact path={linkPisos}
                    render={(props) => <PisoPreview {...props} />}
                />
                <Route
                    exact path="/piso"
                    render={(props) => <Piso {...props} />}
                />
                <Route
                    exact path={linkAdicionar}
                    render={(props) => <Adicionar {...props} />}
                />
                <Route
                    exact path="/nucleo-icons"
                    render={(props) => <NucleoIcons {...props} />}
                />
                <Route
                    exact path={linkLogin}
                    render={(props) => <LoginPage {...props} />}
                />
                <Route
                    exact path={linkLogout}
                    render={(props) => <LogOut {...props} />}
                />
                <Route
                    exact path={linkMensaje}
                    render={(props) => <EnviarMensaje {...props} />}
                />
                



            </Switch>
            <div > -</div> 
            
            <DarkFooter />
        </Fragment>


    );
}


export default App;
