
import React, { Fragment, useState, useEffect, useRef } from "react";


//Redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";

//PrimeReact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

//CSS
import '../PisoPreview/pisoPreview.scss'
import classNames from 'classnames';
import './Adicionar.style.scss';


//Conexion
import AxiosConexionConfig from "conexion/AxiosConexionConfig";


const Adisionar = (props) => {

    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    props.setCurrentNavBarColor(false);

    const [destinos, setDestinos] = useState(null);
    const [selectedDestino, setSelectesDestino] = useState(null);
    const [selectedPiso, setSelectesPiso] = useState(null);
    const [img, setImg] = useState("")
    const [load, setLoad] = useState(true)
    const [pisos, setPisos] = useState(null);


    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    React.useEffect(() => {
        getDestinos()
    }, []);
    React.useEffect(() => {
        if (selectedDestino !== null) {
            getPiso();
        }
    }, [selectedDestino]);

    //Obtener destinos
    async function getDestinos() {
        const url = '/destinos';
        try {
            const destino = await AxiosConexionConfig.get(url);
            setDestinos(destino.data);
        } catch (e) {
            console.log(e);
        }
    }
    async function getPiso() {
        const url = '/pisos?filter[where][iddestino]=' + selectedDestino.iddestino;
        try {
            const piso = await AxiosConexionConfig.get(url);
            setPisos(piso.data);
        } catch (e) {
            console.log(e);
        }
    }

    const setSelectedDestino = (valor) => {
        setSelectesDestino(valor)
    }

    const setSelectedPiso = (valor) => {
        setSelectesPiso(valor)
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Gestiona los pisos</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Importar" chooseLabel="Importar" className="p-mr-2 p-d-inline-block" />
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }
    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }
    const formatCurrency = (value) => {
        return (value !== null ? value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }) : <></>
        );
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


                    <div className="datatable-crud-demo">
                        <Toast ref={toast} />

                        <div className="card">
                            <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                            <DataTable ref={dt} value={pisos} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                                globalFilter={globalFilter} header={header}
                            >

                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                                <Column field="idpiso" header="Nº" sortable></Column>
                                <Column field="direccion" header="Dirección" sortable></Column>
                                <Column field="precio" header="Precio" sortable></Column>
                                <Column field="cantpersonas" header="Cant. de personas" sortable></Column>
                                <Column field="metroscuadrados" header="Metros Cuadrados" sortable></Column>
                                <Column field="wifi" header="WiFi" sortable></Column>



                            </DataTable>
                        </div>


                    </div>


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