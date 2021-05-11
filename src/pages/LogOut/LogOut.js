
import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUsuario } from "redux/usuario/usuario.action";

const LogOut=(props)=>{

    const history=useHistory()
    let usuario = ""
    props.setCurrentUsuario(usuario)

    //localStorage.setItem('', "");

    history.push("/rentabuenosaires")
    return (<div>Cerrando Seción</div>)
}


const mapDispatchToProps = dispatch => ({
    setCurrentUsuario: usuario => dispatch(setCurrentUsuario(usuario))
  })
  
  const mapStateToProps = state => ({
    currentUsuario: state.usuario.currentUsuario
  })


export default connect(mapStateToProps, mapDispatchToProps)(LogOut);