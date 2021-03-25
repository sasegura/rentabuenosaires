import React, { useState } from "react";
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

import "./MyCard.style.scss";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import AxiosConexionConfig from "conexion/AxiosConexionConfig";

// core components

function MyCard(props,{ match, destino, link, history, cantHab, nombre }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`${match.url}/${nombre}`);
  };

  //const idPiso = props.idpiso;
  async function getImagen() {
    const idPiso = props.idpiso;
    
    const url = '/imagen?filter[where][and][0][idpiso]='+ idPiso +'&filter[where][and][1][portada]=true'
    const urlNoPortada = '/imagen?filter[where][idpiso]='+ idPiso

   // ?filter[where][and][0][title]=My%20Post&filter[where][and][1][content]=Hello

    try {
      const imagen = await AxiosConexionConfig.get(url);
      console.log(imagen)
      console.log(imagen.data.length)
      
     if(imagen.data.length === 0) {
        const imagen1 = await AxiosConexionConfig.get(urlNoPortada); 
        setImagen(imagen1.data[0].imagen)
        console.log(imagen1)
     }    
      
      

      setImagen(imagen.data[0].imagen)
      //history.push("/profile")
      
    } catch (e) {
      console.log(e);
    }
  }

  const [imagen, setImagen] = useState(null);

  

  React.useEffect(() => {
    getImagen()
  }, []);

  const {t}=useTranslation()


  console.log(props)

  return (
    <>
      <Card className="col-xs-12 col-sm-3 card1">
        <CardImg className="image" alt={nombre} src={"data:image/png;base64," + imagen} top></CardImg>
        <CardBody className="cardbody col-12">
          <CardTitle tag="h4">{nombre}</CardTitle>
          <CardText> {t("Habitaciones")}: {props.canthabitaciones}</CardText>
          <CardText> {t("Cantidad de personas")}: {props.cantpersonas}</CardText>
          <CardText> {t("Mertos cuadrados")}: {props.metroscuadrados}</CardText>
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

const mapStateToProps = state => ({
  currentDestino: state.destino.currentDestino
})

export default  withRouter( connect(mapStateToProps) (withTranslation ("translations") (MyCard)));  
