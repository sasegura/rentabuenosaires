
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
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

//CSS
import '../PisoPreview/pisoPreview.scss'
import classNames from 'classnames';
import './Adicionar.style.scss';


//Conexion
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { InputSwitch } from "primereact/inputswitch";

//Componente
import Imagen from './ImagenUpload.component';
import { Link } from "react-router-dom";

const Adicionar = (props) => {

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

    let emptyImagen = {
        id: null,
        idpiso: null,
        imagen: null,
        portada: true
    }

    props.setCurrentNavBarColor(false);

    const [destinos, setDestinos] = useState(null);
    const [selectedDestino, setSelectesDestino] = useState(null);
    const [img, setImg] = useState("")
    const [load, setLoad] = useState(true)


    const [products, setProducts] = useState(null);

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    const [imagenes, setImagenes] = useState(null);

    const toast = useRef(null);
    const dt = useRef(null);



    const [wifi, setWifi] = useState(true);
    const [calefaccion, setCalefaccion] = useState(true);
    const [aire, setAire] = useState(true);



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
        const urlImagen = '/imagen?filter[where][portada]=true';

        try {
            const piso = await AxiosConexionConfig.get(url);
            setProducts(piso.data);

            const img1 = await AxiosConexionConfig.get(urlImagen);
            setImagenes(img1);

        } catch (e) {
            console.log(e);
        }
    }


    const setSelectedDestino = (valor) => {
        setSelectesDestino(valor)
    }

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProduct(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const imageBodyTemplate = (row) => {
        let src = null;

        if (imagenes != null && products != null) {
            const id = row.idpiso

            var index = -1;

            var filteredObj = imagenes.data.find(function (item, i) {
                if (item.idpiso === row.idpiso) {
                    index = i;
                    return i;
                }
            });
            src = 'data:image/png;base64,' + imagenes.data[index].imagen;
        }
        else {
            src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
        }
        return <img src={src} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="product-image" />
    }



    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    const statusBooleanTemplate = (rowData) => {
        return <span >{
            rowData.wifi ? "Sí" : "No"}</span>;

    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Link to='/modificarPiso'>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" /></Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Products</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

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



                            <DataTable ref={dt} value={products} selection={selectedProducts} dataKey="idpiso" onSelectionChange={(e) => setSelectedProducts(e.value)}
                                paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="{first} a {last} de {totalRecords} pisos"
                                globalFilter={globalFilter}
                                header={header}>

                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                                <Column field="direccion" header="Dirección" sortable></Column>
                                <Column header="Image" body={imageBodyTemplate}></Column>
                                <Column field="precio" header="Precio" sortable></Column>
                                <Column field="cantpersonas" header="Cant. de personas" sortable></Column>
                                <Column field="metroscuadrados" header="Metros Cuadrados" sortable></Column>
                                <Column field="wifi" header="WiFi" body={statusBooleanTemplate} sortable></Column>
                                <Column field="aireacondicionado" body={statusBooleanTemplate} header="Aire" sortable></Column>
                                <Column field="calefaccion" body={statusBooleanTemplate} header="Calefacción" sortable></Column>
                                <Column field="canthabitaciones" header="Habitaciones" sortable></Column>
                                <Column field="cantbannos" header="Baños" sortable></Column>


                                <Column body={actionBodyTemplate}></Column>



                            </DataTable>
                        </div>

                        <Dialog visible={productDialog} id="esteId" style={{ width: '950px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                            {product.image && <img src={`showcase/demo/images/product/${product.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image" />}


                            <div className="p-grid">
                                <div className="p-col-12 p-md-12 p-lg-7">

                                    <div className="p-grid">
                                        <div className="p-field p-col-8">
                                            <label htmlFor="name">Dirección</label>
                                            <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                                            {submitted && !product.name && <small className="p-error">Introduzca la dirección.</small>}
                                        </div>

                                        <div className="p-field p-col-3">
                                            <label htmlFor="precio">Precio</label>
                                            <InputNumber id="precio" value={product.precio} onValueChange={(e) => onInputNumberChange(e, 'precio')} mode="currency" currency="EUR" locale="en-US" />
                                        </div>
                                    </div>


                                    <div className="p-field">
                                        <label htmlFor="description">Descripción</label>
                                        <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                                    </div>


                                    <div className="p-grid">
                                        <div className="p-field p-col-3">
                                            <div className="p-field ">
                                                <label htmlFor="bannos">Nº Baños</label>
                                                <InputNumber id="bannos" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                                            </div>
                                            <div className="p-field">
                                                <label htmlFor="habitaciones">Nº Habitaciones</label>
                                                <InputNumber id="habitaciones" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                                            </div>
                                        </div>

                                        <div className="p-col-3">
                                            <div className="p-field ">
                                                <label htmlFor="personas">Nº Personas</label>
                                                <InputNumber id="personas" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                                            </div>

                                            <div className="p-field">
                                                <label htmlFor="metros">Metros cuadrados</label>
                                                <InputNumber id="metros" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                                            </div>

                                        </div>


                                        <div className="p-col-6">
                                            <div className="switch">
                                                <label htmlFor="binary">WiFi</label>
                                                <InputSwitch checked={wifi} onChange={(e) => setWifi(e.value)} />
                                            </div>
                                            <div className="switch">
                                                <label htmlFor="binary">Aire Acondicionado</label>
                                                <InputSwitch checked={aire} onChange={(e) => setAire(e.value)} />
                                            </div>
                                            <div className="switch">
                                                <label htmlFor="binary">Calefacción</label>
                                                <InputSwitch checked={calefaccion} onChange={(e) => setCalefaccion(e.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-col-12 p-md-12 p-lg-5">
                                    <label htmlFor="binary">Subir imágenes del piso</label>

                                    <Imagen imagen={imagenes} />

                                </div>
                            </div>
                        </Dialog>

                        <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                {product && <span>Estás seguro que quieres eliminar <b>{product.name}</b>?</span>}
                            </div>
                        </Dialog>

                        <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                {product && <span>Are you sure you want to delete the selected products?</span>}
                            </div>
                        </Dialog>

                    </div>
                </div>
            </div>
        )
    }



    return (
        <Fragment>
            {getDestino()}
        </Fragment>
    );
}

const mapStateToProps = state => ({
    currentDestino: state.destino.currentDestino
})

const mapDispatchToProps = dispatch => ({
    setCurrentNavBarColor: navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
})

export default connect(mapStateToProps, mapDispatchToProps)(Adicionar);