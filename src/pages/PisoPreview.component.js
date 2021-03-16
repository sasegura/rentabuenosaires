

import IndexHeader from "components/Headers/IndexHeader";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import MyCard from "components/MyCard/MyCard.component";
import React from "react";
import {connect} from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";
import './css/pisoPreview.scss'

// reactstrap components

const PisoPreview = (props) => {

  props.setCurrentNavBarColor(false);

  const pisos = [
    {
      id:1,
      nombre: "piso 1",
      cantHab: 1,
    },
    {
      id:2,
      nombre: "piso 2",
      cantHab: 3,
    },
  ];

  return (
    <fragment>
    
        <div className="separador"/>

        <h1 className="title">{props.currentDestino.nombre.toUpperCase()}</h1>
        
        <div className="preview">
          {pisos
            .filter((piso, idx) => idx < 4)
            .map(({ id, ...theOthers }) => (
              <MyCard key={id} {...theOthers} />
            ))}
        </div>

    </fragment>
  );
}



const mapStateToProps = state => ({
  currentDestino: state.destino.currentDestino
})

const mapDispatchToProps = dispatch => ({
    setCurrentNavBarColor : navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
  })

export default connect(mapStateToProps,mapDispatchToProps)(PisoPreview);