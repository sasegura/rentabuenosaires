

import IndexHeader from "components/Headers/IndexHeader";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import MyCard from "components/MyCard/MyCard.component";
import React from "react";
import {connect} from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";
import './css/pisoPreview.scss'

import fs from "fs"

// reactstrap components

const PisoPreview = (props) => {


  var encodedData = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
console.log(encodedData);
  //const encodedData = 'R0lGODlhAQABAIAAAAAA...7';
  
  
  props.setCurrentNavBarColor(false);

  //fetch pisos según el destino

  const pisos = [
    {
      id:1,
      nombre: "Piso 1",
      cantHab: 1,
      imagen:""
    },
    {
      id:2,
      nombre: "Piso 2",
      cantHab: 2,
      imagen:""
    },
    {
      id:3,
      nombre: "Piso 3",
      cantHab: 1,
      imagen:""
    },
    {
      id:4,
      nombre: "Piso 4",
      cantHab: 5,
      imagen:""
    },
  ];
  

  return (
    <fragment>
        <div className="separador"/>

        <div className="pisoPrev">

          <h1 className="h1">{props.currentDestino.nombre.toUpperCase()}</h1>
          
          <div className="collection-preview">
            {pisos
              .filter((piso, idx) => idx < 4)
              .map(({ id, ...theOthers }) => (
                <MyCard key={id} id={id} destino={props.currentDestino.nombre} {...theOthers} />
              ))}
          </div>

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