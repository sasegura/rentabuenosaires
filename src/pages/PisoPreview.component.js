

import IndexHeader from "components/Headers/IndexHeader";
import ProfilePageHeader from "components/Headers/ProfilePageHeader";
import MyCard from "components/MyCard/MyCard.component";
import React from "react";
import {connect} from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";

// reactstrap components

const PisoPreview = (props) => {

    props.setCurrentNavBarColor(false);

  return (
    <>
        <ProfilePageHeader/>
        <MyCard/>
    </>
  );
}

const mapStateToProps = state => ({
  currentDestino: state.destino.currentDestino
})

const mapDispatchToProps = dispatch => ({
    setCurrentNavBarColor : navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
  })

export default connect(mapStateToProps,mapDispatchToProps)(PisoPreview);