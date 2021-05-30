import React, { useRef, useState } from 'react';

//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";

//primereact
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Form, Field } from 'react-final-form';
import classNames from 'classnames';
import { Toast } from 'primereact/toast';

//reactstrap
// import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Container } from 'reactstrap';
//CSS
import './Mensaje.style.scss';

import { withTranslation } from 'react-i18next';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import Mensaje from './Mensaje';

const EnviarMensaje = (props) => {
    
    

    React.useEffect(() => {
      props.setCurrentNavBarColor(false);
      document.body.classList.add("landing-page");
      document.body.classList.add("sidebar-collapse");
      document.documentElement.classList.remove("nav-open");
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
      };
  }, []);



    return (
        <>
        <Mensaje/>
        </>
    )};

    const mapDispatchToProps = dispatch => ({
        setCurrentNavBarColor : navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
      })

    export default connect(null,mapDispatchToProps)(withTranslation("translations") (EnviarMensaje));