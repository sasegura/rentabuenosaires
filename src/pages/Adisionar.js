

import MyCard from "components/MyCard/MyCard.component";
import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";
import './css/pisoPreview.scss'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { useState } from "react";

// reactstrap components

const Adisionar = (props) => {

  

    props.setCurrentNavBarColor(false);

    const [destinos, setDestinos] = useState(null);
    const [selectedDestino, setSelectesDestino] = useState(null);
    const [selectedPiso, setSelectesPiso] = useState(null);
    const [img, setImg] = useState("")
    const [load, setLoad] = useState(true)
    const [pisos, setPisos] = useState(null);
  
    React.useEffect(() => {
        getDestinos()
    }, []);
    React.useEffect(() => {
        if(selectedDestino!==null){
          getPiso()
        }
      
  }, [selectedDestino]);

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
      const url = '/pisos?filter[where][iddestino]=' + selectedDestino.iddestino;
      try {
          const piso = await AxiosConexionConfig.get(url);
          console.log(piso)
          setPisos(piso.data);
      } catch (e) {
          console.log(e);
      }
  }

    const setSelectedDestino=(valor)=>{
        console.log(valor)
        setSelectesDestino(valor)
    }

    const setSelectedPiso=(valor)=>{
        console.log(valor)
        setSelectesPiso(valor)
    }
  

    const getDestino = () => {
        return (
            <div className="section datatable-responsive-demo">
                <div className="section datatable-responsive-demo">
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
            </div>
        )
    }

    const getPisos = () => {
        return (
            <div className="datatable-responsive-demo">
                  <DataTable  
                      className="p-datatable-responsive-demo roboto" 
                      value={pisos} selection={selectedPiso} 
                      selectionMode="single" 
                      onSelectionChange={e => setSelectedPiso(e.value)}
                      dataKey="idpiso"
                  >
                      <Column field="direccion" header="Nombre"></Column>                    
                  </DataTable>
            </div>
        )
    }


    return (
      <Fragment>
          {getDestino()}
          {getPisos()}
      </Fragment>
    );
}

const mapStateToProps = state => ({
    currentDestino: state.destino.currentDestino
})

const mapDispatchToProps = dispatch => ({
    setCurrentNavBarColor: navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
})

export default connect(mapStateToProps, mapDispatchToProps)(Adisionar);