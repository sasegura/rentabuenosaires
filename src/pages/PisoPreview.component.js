

import IndexHeader from "components/Headers/IndexHeader";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import MyCard from "components/MyCard/MyCard.component";
import React,{Fragment} from "react";
import {connect} from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";
import './css/pisoPreview.scss'


import { pisos } from "configuracion/constantes";
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { useState } from "react";

// reactstrap components

const PisoPreview = (props) => {

  const [img, setImg]=useState("")
  const [load, setLoad]=useState(true)
  props.setCurrentNavBarColor(false);

  //fetch pisos según el destino

  //const piso=pisos;
  
  async function getImagen() {
    
    const url = '/imagen';
    try {
      console.log("aaa")
        const imagen = await AxiosConexionConfig.get(url);
        //console.log(imagen.data[2].imagen);
        setImg(imagen.data[1].imagen)
        setLoad(!load)
        console.log("bbbb")
        //history.push("/profile")
    } catch (e) {
      console.log("error")
        console.log(e);
    }
}

React.useEffect(() => {
  getImagen()
},[]);

  const destino=()=>{
      return (<div className="pisoPrev">
          <h1 className="h1">{props.currentDestino.nombre.toUpperCase()}</h1>
          <img src={"data:image/png;base64,"+img}/>
          <div className="collection-preview">
              {pisos
                  .filter((piso, idx) => idx < 4)
                  .map(({ id, ...theOthers }) => (
                    < MyCard key={id} id={id} destino={props.currentDestino.nombre} {...theOthers} />
                ))}
          </div>
      </div>)
  }
  const nodestino=()=>{
    return (<div className="pisoPrev">
          <h1 className="h1">{"Buenos Aires".toUpperCase()}</h1>
          <div className="collection-preview">
              {pisos
                  .filter((piso, idx) => idx < 4)
                  .map(({ id, ...theOthers }) => (
                    < MyCard key={id} id={id} destino={"Buenos Aires"} {...theOthers} />
                ))}
          </div>
      </div>)
  }

  return (
    <Fragment>
        <div className="separador" key={load}/>
          {props.currentDestino!==null ?
              destino():
              nodestino()
          }
          <img src={"data:image/png;base64,"+img}/>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  currentDestino: state.destino.currentDestino
})

const mapDispatchToProps = dispatch => ({
    setCurrentNavBarColor : navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
  })

export default connect(mapStateToProps,mapDispatchToProps)(PisoPreview);