import React from "react";
import { withTranslation } from 'react-i18next';
// reactstrap components
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

import imagen from "../../assets/img/2.jpg";

import "./MyCard.style.scss";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

// core components

function MyCard({ id, match, destino, link, history, cantHab, nombre }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`${match.url}/${nombre}`);
  };
  const {t}=useTranslation()

  return (
    <>
      <Card className="col-xs-10 col-sm-4 ">
        <CardImg className="image" alt={nombre} src={imagen} top></CardImg>
        <CardBody className="cardbody col-12">
          <CardTitle tag="h4">{nombre}</CardTitle>
          <CardText> {t("Cantidad de habitaciones")}: {cantHab}</CardText>
          <Button
            type="submit"
            color="primary"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
            onClick={handleSubmit}
          >
            {t("Ver detalles")}
          </Button>
        </CardBody>
      </Card>
    </>
  );
}

export default withRouter(withTranslation ("translations") (MyCard));
