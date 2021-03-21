

import IndexHeader from "components/Headers/IndexHeader";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import MyCard from "components/MyCard/MyCard.component";
import React,{Fragment} from "react";
import {connect} from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";
import './css/pisoPreview.scss'

import fs from "fs"
import { pisos } from "configuracion/constantes";

// reactstrap components

const PisoPreview = (props) => {

  props.setCurrentNavBarColor(false);

  //fetch pisos según el destino

  //const piso=pisos;
  
  const destino=()=>{
      return (<div className="pisoPrev">
          <h1 className="h1">{props.currentDestino.nombre.toUpperCase()}</h1>
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
        <div className="separador"/>
          {props.currentDestino!==null ?
              destino():
              nodestino()
          }
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