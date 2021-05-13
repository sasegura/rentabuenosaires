import React from 'react';

//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";

//reactstrap
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

//CSS
import './Propietarios.style.scss';
import { Link } from 'react-router-dom';
import { linkNosotros } from 'configuracion/constantes';
import { linkMensaje } from 'configuracion/constantes';
import { withTranslation } from 'react-i18next';

const Propietarios = (props) => {
  const {t}=props;
    props.setCurrentNavBarColor(false);



    return (
        <>
        <div
          id="enviar_mensaje"
          className="section section-contact-us text-center"
        >
          <Container>
          <h2 className="title">{t("Rentabiliza tu propiedad.")}</h2>
            <p className="description">
              {t("Te ofrecemos una propuesta de alta rentabilidad para tu propiedad.")}
              {t("Comercializamos por días, semanas o meses, y nos ocupamos de todo lo necesario.")}
            </p>
            <p className="description">
              {t("Cuidamos tu casa y obtenemos beneficios económicos cuando no estás en ella.")}
            </p>
            <Link to={linkMensaje}>
              <h3>
                {t("CONTACTA CON NOSOTROS")}
              </h3>
            </Link>
          </Container>
        </div>
        </>
    )};

    const mapDispatchToProps = dispatch => ({
        setCurrentNavBarColor : navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
      })

    export default connect(null, mapDispatchToProps)(withTranslation("translations") (Propietarios));