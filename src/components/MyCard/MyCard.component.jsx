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
// core components

function MyCard(props) {
  return (
    <>
      <Card style={{ width: "20rem" }}>
        <CardImg alt="..." src={imagen} top></CardImg>
        <CardBody>
          <CardTitle tag="h4">Card title</CardTitle>
          <CardText>Conenido...</CardText>
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
