

import IndexHeader from "components/Headers/IndexHeader";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import MyCard from "components/MyCard/MyCard.component";
import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";
import './css/pisoPreview.scss'


import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { useState } from "react";

// reactstrap components

const PisoPreview = (props) => {

  const [img, setImg] = useState("")
  const [load, setLoad] = useState(true)
  props.setCurrentNavBarColor(false);

  //fetch pisos según el destino

  async function getPiso() {
    const url = '/pisos?filter[where][iddestino]=' + props.currentDestino.id;
    try {
      const piso = await AxiosConexionConfig.get(url);
      setPisos(piso.data);
    } catch (e) {
      console.log(e);
    }
  }

  const [pisos, setPisos] = useState(null);

  React.useEffect(() => {
    getPiso()
  }, [props.currentDestino]);

  const destino = () => {
    return (<div className="pisoPrev">
      <h1 className="h1">{props.currentDestino.nombre.toUpperCase()}</h1>
      {/*<img src={"data:image/png;base64," + img} />*/}
      <div className="collection-preview">
        {pisos !== null ?
          pisos
            .filter((piso, idx) => idx < 3)
            .map(({ id, ...theOthers }) => (
              < MyCard key={id} id={id} destino={props.currentDestino.nombre} {...theOthers} />
            )) : <Fragment />}
      </div>
    </div>)
  }

  const nodestino = () => {
    return (<div className="pisoPrev">
      <h1 className="h1">{"No hay destinos disponibles".toUpperCase()}</h1>
    </div>)
  }

  return (
    <Fragment>
      <div className="separador" key={load} />
      {props.currentDestino !== null ?
        destino() :
        nodestino()
      }
      {/* <img src={"data:image/png;base64," + img} />*/}
    </Fragment>
  );
}

const mapStateToProps = state => ({
  currentDestino: state.destino.currentDestino
})

const mapDispatchToProps = dispatch => ({
  setCurrentNavBarColor: navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
})

export default connect(mapStateToProps, mapDispatchToProps)(PisoPreview);