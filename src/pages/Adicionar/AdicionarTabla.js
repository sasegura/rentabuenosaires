import React, { useState, useEffect, useRef, Fragment } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import pisoservice from '../service/pisoservice';

import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Form, Field } from 'react-final-form';

import cargando from '../../assets/img/loading.gif'

import './Adicionar.style.scss';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import { amenitiesGeneralesTextConst } from 'configuracion/constantes';
import { amenitiesGeneralesConst } from 'configuracion/constantes';

const AdicionarTabla = (props) => {
    let emptypiso={
        direccion:"",
        iddestino:3,
        cantpersonas:0,
        metroscuadrados:0,
        wifi:true,
        tvcable:true,
        aireacondicionado:true,
        calefaccion:true,
        canthabitaciones:0,
        cantbannos:0,
        precio:0,
        nombre:"",
        descripcion:"",
        imagen:"",
        diasReservados:""
    }
    const getEmptyPiso=()=>{
        amenitiesGeneralesConst.forEach((amenitie)=>{
            emptypiso[amenitie]=true
        })
        return(emptypiso)
    }
    

    const [pisos, setpisos] = useState(null);
    const [loadingPisos, setloadingpisos] = useState(false);
    const [pisoDialog, setpisoDialog] = useState(false);
    const [deletepisoDialog, setDeletepisoDialog] = useState(false);
    const [deletepisosDialog, setDeletepisosDialog] = useState(false);
    const [piso, setpiso] = useState(emptypiso);
    const [selectedpisos, setSelectedpisos] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const amenitiesGenerales=amenitiesGeneralesConst;
    const amenitiesGeneralesText=amenitiesGeneralesTextConst;
    //const pisoservice = new pisoservice();

    useEffect(() => {
        getPiso()
        //pisoservice.getpisos().then(data => setpisos(data));
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [props.destino]); 

    async function getPiso() {
        // console.log(pisos)
        setpisos(null)
        setloadingpisos(true)
        const url = '/pisos?filter[where][iddestino]=' + props.destino.iddestino;
        const urlImagen = '/imagen?filter=';
        try {
            const pisos = await AxiosConexionConfig.get(url);
            const a=pisos.data;
            let go=0;
            pisos.data.forEach((piso,index)=>{
                const uri={
                    where: {
                        and:[
                            {portada: true},
                            {idpiso: piso.idpiso}
                        ]
                    }
                  }
                AxiosConexionConfig.get(urlImagen+encodeURI(JSON.stringify(uri))).then((respuesta)=>{
                    piso.imagen=respuesta.data
                    go=go+1;
                    if(go===pisos.data.length){
                        setpisos(pisos.data);
                        setloadingpisos(false)
                    }
                });
            })
            if(pisos.data.length===0){
                setloadingpisos(false)
            }
            //setImagenes(img1);
            //setpiso(pisos)
        } catch (e) {
            console.log(e);
        }
    }
    

    const openNew = () => {
        setpiso(getEmptyPiso());
        setSubmitted(false);
        setpisoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setpisoDialog(false);
    }

    const hideDeletepisoDialog = () => {
        setDeletepisoDialog(false);
    }

    const hideDeletepisosDialog = () => {
        setDeletepisosDialog(false);
    }

    function Validacion(){
        console.log(piso.nombre+"nombre  "+ 
        piso.descripcion+"descrip  "+
        piso.direccion+" direccion "+ 
        piso.precio+" precio "+
        piso.cantpersonas+" persona "+
        piso.metroscuadrados+" metrosc "+ 
        piso.canthabitaciones+"habitac  "+ 
        piso.cantbannos+" baños ")
        if(piso.nombre==="" || 
            piso.descripcion==="" || piso.descripcion===null ||
            piso.direccion==="" || 
            piso.precio==="" || 
            piso.cantpersonas===0 ||
            piso.metroscuadrados===0 || 
            piso.canthabitaciones===0 || 
            piso.cantbannos===0 ){
                console.log("false")
            return false;
        }else{console.log("true");return true;}
    }
    async function savepiso (){
            setSubmitted(true);
            let modificar=false;
            let id=0;
            if (piso.nombre.trim()) {
                let _pisos = [...pisos];
                _pisos.push(piso)
                if(piso.idpiso){
                    id=piso.idpiso
                    modificar=true;
                    delete piso.idpiso                
                }
                if(piso.imagen){
                    delete piso.imagen
                }
                //let _piso = {...piso};
                const url = '/pisos';
                if(modificar){
                    try {
                        const pisoDatos = await AxiosConexionConfig.patch(url+"/"+id, piso);
                        console.log(pisoDatos.data)
                    } catch (e) {
                        console.log(e);
                    }
                }else{
                    try {
                        const imagen = await AxiosConexionConfig.post(url, piso);
                        console.log(imagen.data)
                    } catch (e) {
                        console.log(e);
                    }
                }  
                setpisoDialog(false);
                getPiso()          
                //setpisos(_pisos);            
                //setpiso(emptypiso);
            
        }
    }

    const editpiso = (piso) => {
        setpiso({...piso});
        setpisoDialog(true);
    }

    const confirmDeletepiso = (piso) => {
        setpiso(piso);
        setDeletepisoDialog(true);
        
    }

    async function deletepiso() {
        const url = '/pisos/'+piso.idpiso;
        try {
            const imagen = await AxiosConexionConfig.delete(url);
            console.log(imagen.data)
        } catch (e) {
            console.log(e);
        }
            
        let _pisos = pisos.filter(val => val.id !== piso.id);
        setpiso(_pisos);
        setDeletepisoDialog(false);
        setpiso(emptypiso);
        getPiso();
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'piso Deleted', life: 3000 });
    }

    const confirmDeleteSelected = () => {
        setDeletepisosDialog(true);
    }

    const deleteSelectedpisos = () => {
        const urlImagen = '/imagen';
        selectedpisos.forEach((pisoX)=>{
            console.log(pisoX);
            const uri={
                where: {
                    and:[
                        {idpiso: pisoX.idpiso}
                    ]
                }
              }
            AxiosConexionConfig.get(urlImagen+"?filter="+encodeURI(JSON.stringify(uri)))
            .then((respuesta)=>{
                if(respuesta.data.length>0){
                    respuesta.data.forEach((img)=>{
                        AxiosConexionConfig.delete(urlImagen+"/"+img.id).then(()=>{
                            if(img===respuesta.data[respuesta.data.length-1]){
                                EliminarPiso(pisoX)
                            }
                        })
                    })
                }

            })
        })
        let _pisos = pisos.filter(val => !selectedpisos.includes(val));
        console.log(_pisos)
        setpisos(_pisos);
        setDeletepisosDialog(false);
        setSelectedpisos(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'pisos Deleted', life: 3000 });
    }

    const EliminarPiso=(pisoX)=>{
        const url = '/pisos/'+pisoX.idpiso;
        try {
            AxiosConexionConfig.delete(url).then((respuesta)=>{
                console.log(respuesta.data)    
            });
        } catch (e) {
            console.log(e);
        }
    }

    const onInputChange = (e, nombre) => {
        const val = (e.target && e.target.value) || '';
        let _piso = {...piso};
        _piso[`${nombre}`] = val;
        setpiso(_piso);
    }

    const onInputSelectChange = (e, nombre) => {
        let _piso = {...piso};
        _piso[`${nombre}`] = e.value;
        setpiso(_piso);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _piso = {...piso};
        _piso[`${name}`] = val;
        setpiso(_piso);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedpisos || !selectedpisos.length} />
            </React.Fragment>
        )
    }    

    /*const imageBodyTemplate = (rowData) => {
        return <img src={`showcase/demo/images/piso/${rowData.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="piso-image" />
    }*/
    const imageBodyTemplate = (row) => {
        
        let src = "";
        if(row.imagen!==undefined&&row.imagen[0]!==undefined&&row.imagen[0].imagen!==undefined){
            src = 'data:image/png;base64,' + row.imagen[0].imagen;
        }else{
            src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png';
        }
        return <img src={src} alt="imagen" className="piso-image" />
    }    

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editpiso(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletepiso(rowData)} />
            </React.Fragment>
        );
    }
    
    const pisoDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button type="submit" label="Submit" className="p-button-text" />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={savepiso} />
        </React.Fragment>
    );
    const deletepisoDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletepisoDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletepiso} />
        </React.Fragment>
    );
    const deletepisosDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletepisosDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedpisos} />
        </React.Fragment>
    );

    const booleanData=(field, fieldName)=>{
        return(
            <div className="floatLeft p-field p-col-12 p-md-6">
                    <label className="p-mb-3">{fieldName}</label>
                    <div className="p-formgrid p-grid">
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId={field+"1"} name={field} value={true} onChange={(e) => onInputSelectChange(e, field)} checked={piso[field] === true} />
                            <label htmlFor={field+"1"}>Si</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId={field+"2"} name={field} value={false} onChange={(e) => onInputSelectChange(e, field)} checked={piso[field] === false} />
                            <label htmlFor={field+"2"}>No</label>
                        </div>
                    </div>
                </div>
        )                            
    }

    async function SavePiso (pisoData){
        console.log(pisoData)
        console.log(props.destino)
        pisoData.iddestino=props.destino.iddestino
        setSubmitted(true);
        let modificar=false;
        let id=0;
        if (pisoData.nombre.trim()) {
            let _pisos = [...pisos];
            _pisos.push(pisoData)
            if(pisoData.idpiso){
                id=pisoData.idpiso
                modificar=true;
                delete pisoData.idpiso                
            }
            if(pisoData.imagen){
                delete pisoData.imagen
            }
            //let _piso = {...piso};
            const url = '/pisos';
            if(modificar){
                try {
                    const pisoDatos = await AxiosConexionConfig.patch(url+"/"+id, pisoData);
                    console.log(pisoDatos.data)
                } catch (e) {
                    console.log(e);
                }
            }else{
                try {
                    const imagen = await AxiosConexionConfig.post(url, pisoData);
                    console.log(imagen.data)
                } catch (e) {
                    console.log(e);
                }
            }  
            setpisoDialog(false);
            getPiso()          
            //setpisos(_pisos);            
            //setpiso(emptypiso);
        
        }
}

const initialValues=
{ direccion:"",
        iddestino:3,
        cantpersonas:0,
        metroscuadrados:0,
        wifi:true,
        tvcable:true,
        aireacondicionado:true,
        calefaccion:true,
        canthabitaciones:0,
        cantbannos:0,
        precio:0,
        nombre:piso.nombre,
        descripcion:"",
        diasReservados:"",
        name: '',
        email: '',
        password: '',
        date: null,
        country: null,
        accept: false };

    const formik = useFormik({
        initialValues: {
            direccion:"",
            iddestino:3,
            cantpersonas:0,
            metroscuadrados:0,
            wifi:true,
            tvcable:true,
            aireacondicionado:true,
            calefaccion:true,
            canthabitaciones:0,
            cantbannos:0,
            precio:0,
            nombre:piso.nombre,
            descripcion:"",
            diasReservados:"",
            name: '',
            email: '',
            password: '',
            date: null,
            country: null,
            accept: false
        },
        validate: (data) => {
            let errors = {};

            if (!data.nombre) {
                errors.nombre = 'Nombre is required.';
            }
            if (!data.descripcion) {
                errors.descripcion = 'descripcion is required.';
            }
            /*else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }*/

            return errors;
        },
        onSubmit: (data) => {
            //savepiso()
            SavePiso(data)
            console.log(data)
            setpisoDialog(false)
            formik.resetForm();
        }
    });
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    
    const onSubmit = (data, form) => {
        console.log(data);
        setpisoDialog(false);
        SavePiso(data)
        form.restart();
    };
    const validate = (data) => {
        let errors = {};
        if (!data.nombre|| data.nombre==='') {
            errors.nombre = 'Nombre is required.';
        }
        if (!data.descripcion|| data.descripcion==='') {
            errors.descripcion = 'descripcion is required.';
        }
        if (!data.latitud|| data.latitud==='') {
            errors.latitud = 'latitud is required.';
        }
        if (!data.longitud|| data.longitud==='') {
            errors.longitud = 'longitud is required.';
        }
        /*else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }*/
            return errors;
    };

    const fieldTextComponent=(campo, texto)=>(
        <Field name={campo} render={({ input, meta }) => (
            <div className="p-field">
                <span className="p-float-label">
                <InputText id="serviciosAdicionales" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                    <label htmlFor={campo} className={classNames({ 'p-error': isFormFieldValid('canthabitaciones') })}>{texto}*</label>
                </span>
                {getFormErrorMessage(campo)}
            </div>
        )} />
    )
    const fieldNumberComponent=(campo, texto)=>(
        <Field name={campo} render={({ input, meta }) => (
            <div className="p-field">
                <span className="p-float-label">
                    <InputNumber id={campo} onValueChange={(e) => input.onChange(e.value)} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })}/>
                    <label htmlFor={campo} className={classNames({ 'p-error': isFormFieldValid('canthabitaciones') })}>{texto}*</label>
                </span>
                {getFormErrorMessage(campo)}
            </div>
        )} />
    )
    const elementoBoolean=(text, elemento, handleChange, valor)=>{
        return(
            <div className="floatLeft p-field p-col-12 p-md-6">
                <label className="p-mb-3">{text}</label>
                <div className="p-formgrid p-grid">
                    <div className="p-field-radiobutton p-col-6">
                        <RadioButton inputId={elemento+"1"} name={elemento} value={true} onChange={handleChange} checked={valor === true} />
                        <label htmlFor={elemento+"1"}>Si</label>
                    </div>
                    <div className="p-field-radiobutton p-col-6">
                        <RadioButton inputId={elemento+"2"} name={elemento} value={false} onChange={handleChange} checked={valor === false} />
                        <label htmlFor={elemento+"2"}>No</label>
                    </div>
                </div>
            </div>
        )
    }
    const form=()=>{
        return (
            <div className="p-d-flex p-jc-center">
                <div className="card">
                    <Form onSubmit={onSubmit}
                    initialValues={{ nombre: piso.nombre}}
                    validate={validate} render={({ handleSubmit }) => (
                       
                    <form onSubmit={handleSubmit} className="p-fluid">       
                    <Dialog visible={pisoDialog} style={{ width: '450px' }} header="Adicionar Piso" modal className="p-fluid" 
                        footer={<React.Fragment>
                            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />,
                            <Button type="submit" label="Submit" className="p-button-text" /></React.Fragment>
                        } onHide={hideDialog}
                    >
                        {fieldTextComponent('nombre','nombre')}
                        {fieldTextComponent('latitud','latitud')}
                        {fieldTextComponent('longitud','longitud')}
                        {fieldTextComponent('direccion','direccion')}
                        {fieldTextComponent('descripcion','descripcion')}
                        {fieldTextComponent('descripcionI','descripcionI')}
                        {fieldNumberComponent('precio','precio')}
                        {fieldNumberComponent('canthabitaciones','canthabitaciones')}
                        {fieldNumberComponent('cantpersonas','cantpersonas')}
                        {fieldNumberComponent('metroscuadrados','metroscuadrados')}
                        {fieldNumberComponent('cantbannos','cantbannos')}
                        
                        
                        {fieldTextComponent('serviciosAdicionales','serviciosAdicionales')}
                        {fieldTextComponent('estacionamientoInstalaciones','estacionamientoInstalaciones')}
                        {fieldTextComponent('cocinaComedor','cocinaComedor')}
                        {fieldTextComponent('internetOficina','internetOficina')}
                        {fieldTextComponent('seguridadHogar','seguridadHogar')}
                        {fieldTextComponent('calefaccionRefrigeracion','calefaccionRefrigeracion')}
                        {fieldTextComponent('entretenimiento','entretenimiento')}
                        {fieldTextComponent('paraFamilias','paraFamilias')}
                        {fieldTextComponent('dormitorio','dormitorio')}
                        {fieldTextComponent('banno','banno')}
                        {elementoBoolean("Aire Acondicionado", "aireacondicionado", formik.handleChange, formik.values.aireacondicionado)}
                        <div>
                            <div className="floatLeft"> 
                                {amenitiesGenerales.map((amenitie, index)=>{
                                    return(elementoBoolean(amenitiesGeneralesText[index],amenitie, formik.handleChange, formik.values[amenitie]))
                                })}
                            </div>
                        </div>
                        </Dialog>
                    </form>
                    )} />
                </div>
            </div>
            
        )
    }
    /**{path: "", code: "required", message: "should have required property 'serviciosAdicionales'",…}
1: {path: "", code: "required", message: "should have required property 'estacionamientoInstalaciones'",…}
2: {path: "", code: "required", message: "should have required property 'cocinaComedor'",…}
3: {path: "", code: "required", message: "should have required property 'internetOficina'",…}
4: {path: "", code: "required", message: "should have required property 'seguridadHogar'",…}
5: {path: "", code: "required", message: "should have required property 'calefaccionRefrigeracion'",…}
6: {path: "", code: "required", message: "should have required property 'entretenimiento'",…}
7: {path: "", code: "required", message: "should have required property 'paraFamilias'",…}
8: {path: "", code: "required", message: "should have required property 'dormitorio'",…}
9: {path: "", code: "required", message: "should have required property 'banno'",…} */
    return (
        <div className="datatable-crud-demo">
            <div className="card">
            <Toast ref={toast} />
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} /*right={rightToolbarTemplate}*/></Toolbar>
                {(pisos===null)?
                    (loadingPisos?
                        (<div className="p-col-12 p-text-center"><img src={cargando}/></div>)
                        :(<div className="p-col-12 p-text-center"><p>Sin datos</p></div>)
                    ):
                (
                <DataTable ref={dt} value={pisos} selection={selectedpisos} onSelectionChange={(e) => setSelectedpisos(e.value)}
                    dataKey="idpiso" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} pisos"
                //    header={header}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="nombre" header="Nombre" sortable></Column>
                    <Column field="descripcion" header="Descripción" sortable></Column>
                    <Column field="direccion" header="Dirección" sortable></Column>
                    <Column header="Imagen" body={(r)=>imageBodyTemplate(r)}></Column>
                    <Column field="precio" header="Precio" sortable></Column>
                    <Column field="cantpersonas" header="Cant. de personas" sortable></Column>
                    <Column field="metroscuadrados" header="Metros Cuadrados" sortable></Column>
                    <Column field="canthabitaciones" header="Habitaciones" sortable></Column>
                    <Column field="cantbannos" header="Baños" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>)}
            </div>

            {form()}

            <Dialog visible={deletepisoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletepisoDialogFooter} onHide={hideDeletepisoDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {piso && <span>Are you sure you want to delete <b>{piso.nombre}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deletepisosDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletepisosDialogFooter} onHide={hideDeletepisosDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {piso && <span>Are you sure you want to delete the selected pisos?</span>}
                </div>
            </Dialog>
        </div>
    );
}
export default AdicionarTabla;
