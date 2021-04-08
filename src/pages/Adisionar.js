

import MyCard from "components/MyCard/MyCard.component";
import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";
import './css/pisoPreview.scss'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { useState } from "react";
import { withTranslation } from "react-i18next";
import AdisionarPiso from "./AdisionarPiso";

// reactstrap components

const Adisionar = (props) => {
    const {t}=props;
  

    props.setCurrentNavBarColor(false);

    const [destinos, setDestinos] = useState(null);
    const [selectedDestino, setSelectedDestino] = useState(null);
    const [selectedPiso, setSelectedPiso] = useState(null);
    const [img, setImg] = useState("")
    const [loadPisos, setLoadPisos] = useState(false)
    const [pisos, setPisos] = useState(null);
    const [loadPiso, setLoadPiso] = useState(false)
    const [piso, setPiso] = useState(null);
    
  
    React.useEffect(() => {
        getDestinos()
    }, []);
    React.useEffect(() => {
        if(selectedDestino!==null){
          getPiso()
        }      
    }, [selectedDestino]);
    React.useEffect(() => {
      console.log("piso")
        if(selectedPiso!==null){
          getPisoSelecionado()
        }  
        console.log("piso")
        console.log(piso)
    }, [selectedPiso]);

    //Obtener destinos
    async function getDestinos() {
        const url = '/destinos' ;
        try {
            const destino = await AxiosConexionConfig.get(url);
            console.log(destino)
            setDestinos(destino.data);
        } catch (e) {
            console.log(e);
        }
    }
    async function getPiso() {
      setLoadPisos(false)
      setLoadPiso(false)
      const url = '/pisos?filter[where][iddestino]=' + selectedDestino.iddestino;
      try {
          const respuesta = await AxiosConexionConfig.get(url);
          console.log(respuesta.data)
          if(respuesta.data.length>0){
              setPisos(respuesta.data);
              setLoadPisos(true)
          }          
        } catch (e) {
            console.log(e);
        }
    }
  
    async function getPisoSelecionado() {
      setLoadPiso(false)
      const url = '/pisos?filter[where][idpiso]=' + selectedPiso.idpiso;
      try {
          const respuesta = await AxiosConexionConfig.get(url);
          console.log(respuesta.data)
          if(respuesta.data.length>0){
              setPiso(respuesta.data[0]);
              setLoadPiso(true)
          }          
        } catch (e) {
            console.log(e);
        }
    }

    const getDestino = () => {
        return (
            <div className=" datatable-responsive-demo">
                <DataTable  
                    className="p-datatable-responsive-demo roboto" 
                    value={destinos} selection={selectedDestino} 
                    selectionMode="single" 
                    onSelectionChange={e => setSelectedDestino(e.value)}
                    dataKey="iddestino"
                >
                    <Column field="nombre" header="Nombre"></Column>                    
                </DataTable>
            </div>
        )
    }

    const getPisos = () => {
        return (
            <div className=" datatable-responsive-demo">
                  <DataTable  
                      className="p-datatable-responsive-demo roboto" 
                      value={pisos} selection={selectedPiso} 
                      selectionMode="single" 
                      onSelectionChange={e => setSelectedPiso(e.value)}
                      dataKey="idpiso"
                  >
                      <Column field="direccion" header="Direccion"></Column>                    
                  </DataTable>
            </div>
        )
    }

    return (
      <Fragment>
          <div className="separador" />
          <div className="p-col-12 displayFlex ">
              <div className="col-md-6 p-col-12  ">
                  {getDestino()}
              </div>
              <div className=" col-md-6 p-col-12">
                  {loadPisos?getPisos():<Fragment></Fragment>}
              </div>
          </div>
          <div>
              {loadPiso?<AdisionarPiso idpiso={piso.idpiso}></AdisionarPiso>:<Fragment></Fragment>}
          </div>
      </Fragment>
    );
}

const mapStateToProps = state => ({
    currentDestino: state.destino.currentDestino
})

const mapDispatchToProps = dispatch => ({
    setCurrentNavBarColor: navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("translations")(Adisionar));