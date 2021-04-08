import React, { Fragment } from "react";
import { useState } from "react";

//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";

//CSS
import './pisoPreview.scss'

//Components
import MyCard from "components/MyCard/MyCard.component";

//Conexion
import AxiosConexionConfig from "conexion/AxiosConexionConfig";


const PisoPreview = (props) => {


  props.setCurrentNavBarColor(false);

  React.useEffect(() => {
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


  async function getPiso() {
    const url = '/pisos?filter[where][iddestino]=' + props.currentDestino.id;
    try {
      const piso = await AxiosConexionConfig.get(url);
      //console.log(piso.data)
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
      <div className="separador" />
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