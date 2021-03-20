import React from "react";
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

// core components

function MyCard({ id, match, destino, link, history, cantHab, nombre }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`${match.url}/${nombre}`);
  };

  return (
    <>
      <Card className="collection-item">
        <CardImg className="image" alt={nombre} src={imagen} top></CardImg>
        <CardBody className="cardbody">
          <CardTitle tag="h4">{nombre}</CardTitle>
          <CardText> Cantidad de habitaciones: {cantHab}</CardText>
          <Button
            type="submit"
            color="primary"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
            onClick={handleSubmit}
          >
            Ver detalles
          </Button>
        </CardBody>
      </Card>
    </>
  );
}

export default withRouter(MyCard);
