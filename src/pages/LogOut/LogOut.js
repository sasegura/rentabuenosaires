
import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUsuario } from "redux/usuario/usuario.action";

const LogOut=(props)=>{

    const history=useHistory()
    let usuario = ""
    props.setCurrentUsuario(usuario)

    history.push("/")
    return (<div>Cerrando Sesión</div>)
}


const mapDispatchToProps = dispatch => ({
    setCurrentUsuario: usuario => dispatch(setCurrentUsuario(usuario))
  })
  
  const mapStateToProps = state => ({
    currentUsuario: state.usuario.currentUsuario
  })


export default connect(mapStateToProps, mapDispatchToProps)(LogOut);