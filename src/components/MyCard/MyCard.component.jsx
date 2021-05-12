import React, { Fragment, useState } from "react";
import { withTranslation } from 'react-i18next';
// reactstrap components
import {
  Card,
  CardImg,
  CardBody,
  Button,
} from "reactstrap";

import "./MyCard.style.scss";
import { useHistory, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import AxiosConexionConfig from "conexion/AxiosConexionConfig";

import cargando from '../../assets/img/loading.gif';
import noImagenDisponible from '../../assets/img/Imagen-no-disponible.png';
// core components

function MyCard(props,{ match, destino, link, history, cantHab, nombre }) {

  const [noImagen, setNoImagen]=useState(false)
  const historyy=useHistory();
 console.log(props)
  React.useEffect(() => {
    getImagen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    historyy.push('/piso?'+props.idpiso);
  };

  async function getImagen() {
    const idPiso = props.idpiso;
    
    const url = '/imagen?filter[where][and][0][idpiso]='+ idPiso +'&filter[where][and][1][portada]=true'
    const urlNoPortada = '/imagen?filter[where][idpiso]='+ idPiso

    try {
      const imagen = await AxiosConexionConfig.get(url);
      if(imagen.data.length === 0) {
          const imagen1 = await AxiosConexionConfig.get(urlNoPortada); 
          if(imagen1.data.length !== 0) {
              setImagen(imagen1.data[0].imagen)
          }else{
              setNoImagen(true);
          }
      }else{
          setImagen(imagen.data[0].imagen)
      }
    } catch (e) {
      console.log(e);
    }
  }

  const [imagen, setImagen] = useState(null);

  const {t}=useTranslation()

  return (
    <>
      <Card className="card1" style={{width:"90%"}}>
        <div className="imagenDiv">
          {imagen!==null?
            <CardImg className="image" alt={nombre} src={"data:image/png;base64," + imagen} top></CardImg>
            :!noImagen?
                <CardImg className="cargando" alt={nombre} src={cargando} top></CardImg>
                :<CardImg className="cargando" alt={nombre} src={noImagenDisponible} top></CardImg>
          }
        </div>
        <CardBody className="cardbody col-12 ">
          
          <div className="flex p-col-12 padding-bottom0">
              <div className=" p-col-12 p-md-7">
                  <h3 className="p-mb-1">{props.nombre}</h3>
                  <span className="marginLeft10px"></span>
                  
                  <p className="card-location margin-bottom0">
                      {props.destino}
                  </p>
              </div>
              <div className=" p-col-12 p-md-5">
                  <span className="textdecorationunderline fontweightbold">{t("desde")}</span>
                  <div>
                      <i className="pi pi-euro"></i><span className="marginLeft5px"></span>
                      <span className="fontweightbold">{props.precio}</span>
                  </div>
                  <span className="marginLeft10px"></span>
                  {t("noche")}
              </div>
          </div>
          <div className="flex p-col-12 padding-top0">
              <div className=" p-col-12 p-md-7 padding11">
                  <span className="fa-exp"><span className="fontweightbold">{props.metroscuadrados}</span>
                  <span className="marginLeft5px"></span>
                  m<sup>2</sup></span>
                  <span className="marginLeft10px"></span>
                  <i className="pi pi-user"></i><span className="marginLeft5px"></span>
                  <span className="fontweightbold">{props.cantpersonas}</span>
                  <span className="marginLeft10px"></span> 
              </div>             
              <div className=" p-col-12 p-md-5">
                  <Button
                    type="submit"
                    color="primary"
                    href="#pablo"
                    className="margin0"
                    onClick={(e) => (handleSubmit(e))}
                  >
                    {t("Ver detalles")}
                  </Button>
              </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

const mapStateToProps = state => ({
  currentDestino: state.destino.currentDestino
})

export default  withRouter( connect(mapStateToProps) (withTranslation ("translations") (MyCard)));  
