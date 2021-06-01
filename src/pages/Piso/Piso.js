import React, { Fragment, useEffect, useRef, useState } from "react";
import { withTranslation } from 'react-i18next';
import { Carousel } from 'primereact/carousel';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Toast } from 'primereact/toast';
//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";
import imagenLoading from "../../assets/img/loading.gif"
import imagenTV from "../../assets/img/television.svg"
import imagenAire from "../../assets/img/air-conditioner.svg"
import imagencalefaccion from "../../assets/img/heating.svg"
import imagenWifi from "../../assets/img/wifi.svg"
// reactstrap components
import { Container, Row } from "reactstrap";

//CSS
import './Piso.scss'

//Conexión
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { amenitiesGeneralesTextConst } from "configuracion/constantes";
import { amenitiesGeneralesConst } from "configuracion/constantes";
import Maps from "./Map";
import DialogDemo from "components/Dialog";

const Piso = (props) => {
  const {t}=props
  const toast = useRef(null);
  const idPiso=props.history.location.search.split("?")[1]
  const [imagenes, setImagenes] = useState(null);
  const [loadImg,setLoadImg]=useState(false)
  const [loadData,setLoadData]=useState(false)
  const [data,setData]=useState(false)
  const [destino,setDestino]=useState(null)
  const [dateBegin, setDateBegin] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [disabledDates, setddisabledDates]=useState([])
  const [disabledEndDate,setdisabledEndDate]=useState(true)
  const [errorfecha, seterrorfecha]=useState("");
  const [minDate,setminDate]=useState(null);
  const [amenities, setAmenities]=useState(null);
  const [huesped, sethuesped]=useState(1);
  const [totalCalculo,settotalCalculo]=useState(0);
  const [calculo,setCalculo]=useState(false);
  const amenitiesGenerales=amenitiesGeneralesConst;
  const amenitiesGeneralesText=amenitiesGeneralesTextConst;
  const [activeIndex,setactiveIndex]=useState([]);

  const [visibleDialog,setVisibleDialog]=useState(false);
  const [valorDialog,setValorDialog]=useState('');
  const [acept,setAcept]=useState(false);

  let today = new Date();
  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Claro'
});
  props.setCurrentNavBarColor(false);

  React.useEffect(() => {
    //setdisabledDays([2])
    //setddisabledDates([today])
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  useEffect(()=>{
    if(dateBegin){
      setdisabledEndDate(false);
      let date=new Date(dateBegin);
      date.setDate(date.getDate()+1);
      setminDate(date)
    }  
  },[dateBegin])
  
  useEffect(()=>{
    let begin=dateBegin?.getDate();
    let end=dateEnd?.getDate();
    if(BuscarEnIntervalo(dateBegin,dateEnd)){
      seterrorfecha("En el intervalo seleccionado existen fechas reservadas previamente.")
      setCalculo(false);
    }else{
      if(end>begin){
        settotalCalculo((end-begin)*huesped*data.precio);
        setCalculo(true);
        seterrorfecha('')
      }
    }
  },[dateEnd, huesped])
  
  async function getImagenes() {
    const url = '/imagen?filter[where][idpiso]='+idPiso;
    try {
      const imagen = await AxiosConexionConfig.get(url);
      setImagenes(imagen.data);
      setLoadImg(true)
    } catch (e) {
      console.log(e);
    }
  }
  let datos=[]
  const amenitiesList=(data)=>{
    let a=[]
    if(data.wifi){
      a.push(<div className="p-col-12 p-md-3"><img src={imagenWifi} alt=""  width={"20px"}/><span className="marginLeft5px">Wifi</span></div>)
    }
    if(data.calefaccion){
      a.push(<div className="p-col-12 p-md-3"><img src={imagencalefaccion} width={"20px"} alt="" /><span className="marginLeft5px">{t("Calefacción")}</span></div>)
    }
    if(data.aireacondicionado){
      a.push(<div className="p-col-12 p-md-3"><img src={imagenAire} width={"20px"} alt="" /><span className="marginLeft5px">{t("Aire Acondicionado")}</span></div>)
    }
    if(data.tvcable){
      a.push(<div className="p-col-12 p-md-3"><img src={imagenTV} alt="" width={"20px"}/><span className="marginLeft5px">TV</span></div>)
    }
    setAmenities(a)
  }
  async function getData() {
    const url = '/pisos/'+idPiso;
    try {
      const piso = await AxiosConexionConfig.get(url);
      // console.log(piso.data)
      setData(piso.data);
      amenitiesList(piso.data)
      getDestino(piso.data.iddestino)
      let temp=[];
      if(piso.data?.diasReservados!==""&& piso.data?.diasReservados!==null){
        temp=(piso.data?.diasReservados?.split(","));
        temp=temp.map((pos)=>(pos=new Date(pos)))
      }
      setddisabledDates(temp)      
      if(piso.data.wifi){
        datos.push({icon:"pi-wifi"})
      }
      setLoadData(true)
    } catch (e) {
      console.log(e);
    }
  }
  async function getDestino(idDestino) {
    const url = '/destinos/'+idDestino;
    try {
      const piso = await AxiosConexionConfig.get(url);
      setDestino(piso.data);
      
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    getImagenes();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if(acept){
      console.log(valorDialog)
      //setValorDialog('')
      
      sendMail();
      setAcept(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acept]);

  const getDate=(date)=>{
    const temp=new Date(date);
    let respuesta=temp.getFullYear()+'/'+temp.getMonth()+'/'+temp.getDay();
    return (respuesta);

  }
  async function sendMail() {
    const url = '/sendMailPreReserva';
    const values={
      correoCliente: valorDialog.email,
      correoAdmin: "administrador@e-homeselect.com",
      fechaInicio: getDate(dateBegin),
      fechaFin: getDate(dateEnd),
      cantidadPersonas: huesped,
      precio: data.precio,
      pisoNombre:data.nombre,
      clienteNombre: valorDialog.name,
      destino: destino.nombre,
      telefono: valorDialog.telefono,
      texto:valorDialog.texto
    }
    try {
      const piso = await AxiosConexionConfig.post(url, JSON.stringify(values));
      console.log(piso)
      if(piso.data){
        toast.current.show({severity:'success', summary: 'Success Message', detail:`Correo enviado al administrador.`, life: 3000});
      }else{
        toast.current.show({severity:'success', summary: 'Success Message', detail:`El correo no se envió correctamente.`, life: 3000});
      }
      
      
    } catch (e) {
      toast.current.show({severity:'success', summary: 'Success Message', detail:e, life: 3000});
      console.log(e);
    }
  }

  const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '600px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1
    }
];
const productTemplate = (imagenes) => {
  return (
      <div className="product-item ">
          <div className="product-item-content ">
              <div className="p-mb-3 ">
                  <img src={"data:image/png;base64," +imagenes.imagen} alt="imagen" className="width100 product-image height440px" />
              </div>              
          </div>
      </div>
  );
}
  const carrusel=()=>{
    return(
      <div className="carruselDiv">
          <Carousel value={imagenes} circular={true} verticalViewPortHeight="80px" containerClassName=" " numVisible={1} numScroll={1} responsiveOptions={responsiveOptions}
              itemTemplate={productTemplate} />
      </div>
    )
  }

  const BuscarEnIntervalo=(begin, end)=>{
    console.log(begin)
    console.log(end)
    let flag=false;
    disabledDates.map((pos)=>{
      console.log(pos)
      if(pos>begin && pos<end){
        flag=true;
      }
    });
    return(flag);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    /*if(new Date(dateEnd)-new Date(dateBegin)<=0){
      seterrorfecha("El rango seleccionado no es correcto")
    }else if(BuscarEnIntervalo(dateBegin,dateEnd)){
      seterrorfecha("En el intervalo seleccionado existen fechas reservadas previamente.")
    }else{
      seterrorfecha('');
    }*/
    setVisibleDialog(true)

  }

 

  const headerTarjeta=()=>{
    return(
        <div className='marginLeft20px'>            
            <i className="fa fa-user"></i>
            <span className="marginLeft5px amenitie">
              {data.cantpersonas}
            </span>
            <span className="marginLeft10px"></span>
            {data.metroscuadrados}
            <span className="fa-exp amenitie">m<sup>2</sup></span>
            <span className="marginLeft10px"></span>
            <i className="fa fa-bath"></i>
            <span className="marginLeft5px amenitie">
              {data.cantbannos}
            </span>
            <span className="marginLeft10px"></span>
            <i className="fa fa-bed"></i>
            <span className="marginLeft5px amenitie">
              {data.canthabitaciones}
            </span>
            <span className="marginLeft10px"></span>
        </div>
    )
  }
  const TarjetPiso=()=>{
    return (
      <div className="">   
      <div className='marginLeft20px'><h2 style={{fontFamily: 'playfair'}}>{data.nombre}</h2></div>
        {headerTarjeta()}
        <hr/>
        <div className='marginLeft20px'>{t("Desde")} <i className="pi pi-euro"></i><span className="marginLeft5px">{data.precio}</span> {t("por noche")}</div>
        <div className="p-field p-col-12">
            <label className='marginLeft10px' htmlFor="calendar">{t("Seleccione un rango")}</label>
            <div>
                <Calendar 
                    id="calendar" 
                    className={"p-col-12 p-md-6"} 
                    value={dateBegin} 
                    minDate={today} 
                    locale="es" 
                    placeholder='Check in'
                    onChange={(e) => (setDateBegin(e.value), setDateEnd(null))} 
                    disabledDates={disabledDates}
                    baseZIndex={500}
                    readOnlyInput />
                <Calendar 
                    id="calendarend" 
                    className={"p-col-12 p-md-6"}  
                    minDate={new Date(minDate)} 
                    value={dateEnd} 
                    locale="es" 
                    placeholder='Check out'
                    disabled={disabledEndDate}
                    onChange={(e) => setDateEnd(e.value)} 
                    disabledDates={disabledDates}
                    baseZIndex={500}
                    readOnlyInput />
            </div>
            <div className="marginLeft10px">
                <div><label htmlFor="minmax-buttons">{t("Guests")}</label></div>
                <InputNumber id="minmax-buttons" value={huesped} onValueChange={(e) => sethuesped(e.value)} mode="decimal" showButtons min={1} max={100} />
            </div>
            <div>
                {calculo?
                    <Fragment>
                        <div>{t("Estancia")}<span className="floatRigth">{"("+(dateEnd?.getDate()-dateBegin?.getDate())+")"}{t("noches")}</span></div>
                        <div>{t("Total")}: <i className="pi pi-euro floatRigth"><span className="marginLeft5px">{totalCalculo}</span></i></div>
                    </Fragment>:
                    <Fragment></Fragment>}
            </div>
            <small className="p-error">{errorfecha}</small>
        </div>
        <Button
          type="submit"
          color="primary"
          href="#pablo"
          disabled={!calculo}
          onClick={(e) => (handleSubmit(e))}
        >
          {t("Pre-reserva")}
        </Button>
      </div>
    )
  }
  const DatosPiso=()=>{    
    return(
    <Container>
      <div className='p-col-12 flex'>
        <div className='p-col-12 p-md-1'></div>
        <div className='p-col-12 p-md-11'>
        <div >
            <h1 style={{fontFamily: 'playfair'}}>
                {data.nombre}
                <span className="marginLeft5px"></span>
                -
                <span className="marginLeft5px"></span>
                {destino?.nombre}
            </h1>
        </div>
        {headerTarjeta()}
        <div><h4>{data.descripcion}</h4></div>
        <Row>        
            {t("Comodidades")}
        </Row>
        <Row>          
            {amenities?.map((dato, index)=>{
              return(<Fragment key={index}>{dato}</Fragment>)
            })}
        </Row>
        <Row>
            {amenitiesGenerales.map((dato, index)=>{
                return(data[dato]?<div key={index} className="p-col-12 p-md-3">{amenitiesGeneralesText[index]}</div>:"")
            })}      
        </Row>
        </div>
      </div>
        
    </Container>)
}
  const fila=(datosFila, texto)=>{
    if(datosFila!==null){    
      return(
        <AccordionTab header={t(texto)}>
          <Row>
              {datosFila.split(",").map((dato, index)=>{
                  return(dato?<div key={index} className="p-col-4">{t(dato)}</div>:"")
              })}      
          </Row>
        </AccordionTab>
      )
    }else{
      return(<AccordionTab header={texto}>{t("Sin servicios.")}</AccordionTab>)
    }
  }

  const acordion=()=>{
    return (
      <Accordion multiple activeIndex={activeIndex} headerClassName="seccion" onTabChange={(e) => setactiveIndex(e.index)}>
            {fila(data.banno, "Baño")}
            {fila(data.dormitorio,"Dormitorio")}
            {fila(data.entretenimiento,"Entretenimiento")}
            {fila(data.paraFamilias,"Para familias")}
            {fila(data.calefaccionRefrigeracion,"Calefacción y refrigeración")}
            {fila(data.seguridadHogar,"Seguridad en el hogar")}
            {fila(data.internetOficina,"Internet y oficina")}
            {fila(data.cocinaComedor,"Cocina y comedor")}
            {fila(data.estacionamientoInstalaciones,"Estacionamiento e instalaciones")}
            {fila(data.serviciosAdicionales,"Servicios adicionales con recargo")}
        </Accordion>
    )
  }
  return (
    <>    
    
      <DialogDemo acept={(e)=>setAcept(e)} open={visibleDialog} setOpen={(e)=>setVisibleDialog(e)} valor={valorDialog} setValor={(e)=>setValorDialog(e)}/>
      <div className="separador" style={{fontFamily: 'gotham'}}/>
      
          <div className="flex p-col-12">
              <div className="p-col-12 p-md-1"></div>
              <div className="center p-col-12 p-md-10">
                  <div className="p-lg-9 p-col-12 floatLeft">
                  <Toast baseZIndex={500} ref={toast} />
                      {loadImg ?
                          carrusel() : <div className="loaddingCenter"><img alt="imagen"  src={imagenLoading}/></div>}
                  </div>
                  <div className="p-lg-3 p-col-12 floatLeft">
                      <div className="card p-col-12" style={{fontFamily: 'gotham'}}>
                          {loadData ?
                              TarjetPiso() : <div className="loaddingCenter"><img alt="imagen" src={imagenLoading}/></div>}
                      </div>
                  </div>
                </div>
          </div>
          <div className="floatLeft p-col-12">
              <div className="floatLeft p-col-12 p-md-12 p-lg-8" style={{fontFamily: 'gotham'}}>
                {loadData ?
                    DatosPiso() : 
                    <div className="loaddingCenter"><img alt="imagen" src={imagenLoading}/></div>}
              </div>
              <div className="p-lg-3 p-col-12 floatLeft" style={{fontFamily: 'gotham'}}>
                  {loadData ?
                      <div className="p-col-12 card"><Maps piso={data}/></div> : 
                      <div className="loaddingCenter"><img alt="imagen" src={imagenLoading}/></div>}
              </div>
          </div>
          <div className="p-col-12 p-lg-10 amenitiesCenter">
                    
          {loadData ?acordion():<div className="loaddingCenter"><img alt="imagen" src={imagenLoading}/></div>}
          </div>
    </>
  );
}

const mapStateToProps = state => ({
  currentPiso: state.piso.currentPiso
})

const mapDispatchToProps = dispatch => ({
  setCurrentNavBarColor: navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation ("translations")(Piso));