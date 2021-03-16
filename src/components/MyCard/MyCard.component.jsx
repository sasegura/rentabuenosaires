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

import imagen from "../../assets/img/bg1.jpg";

import "./MyCard.style.scss";
// core components

function MyCard(props) {
  return (
    <>
      <Card className="collection-item">
        <CardImg
          className="image"
          alt={props.nombre}
          src={imagen}
          top
        ></CardImg>
        <CardBody className="cardbody">
          <CardTitle tag="h4">{props.nombre}</CardTitle>
          <CardText> Cantidad de habitaciones: {props.cantHab}</CardText>
          <Button
            color="primary"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Ver detalles
          </Button>
        </CardBody>
      </Card>
    </>
  );
}

export default MyCard;
