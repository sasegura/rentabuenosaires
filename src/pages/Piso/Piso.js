import React, { Fragment, useEffect, useState } from "react";
import { withTranslation } from 'react-i18next';
import { Carousel } from 'primereact/carousel';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Accordion, AccordionTab } from 'primereact/accordion';
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

const Piso = (props) => {
  const {t}=props
  const idPiso=props.history.location.search.split("?")[1]
  const [imagenes, setImagenes] = useState(null);
  const [loadImg,setLoadImg]=useState(false)
  const [loadData,setLoadData]=useState(false)
  const [data,setData]=useState(false)
  const [destino,setDestino]=useState(null)
  const [dateBegin, setDateBegin] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [disabledDates, setddisabledDates]=useState(null)
  const [disabledEndDate,setdisabledEndDate]=useState(true)
  const [errorfecha, seterrorfecha]=useState("");
  const [minDate,setminDate]=useState(null);
  const [amenities, setAmenities]=useState(null);
  const [huesped, sethuesped]=useState(1);
  const [totalCalculo,settotalCalculo]=useState(0);
  const [calculo,setCalculo]=useState(false);
  const amenitiesGenerales=amenitiesGeneralesConst;
  const amenitiesGeneralesText=amenitiesGeneralesTextConst;
  const [activeIndex,setactiveIndex]=useState(0);
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
    if(end>begin){
      settotalCalculo((end-begin)*huesped*data.precio);
      setCalculo(true);
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
      a.push(<div className="p-col-4"><img src={imagenWifi} alt=""  width={"20px"}/><span className="marginLeft5px">Wifi</span></div>)
    }
    if(data.calefaccion){
      a.push(<div className="p-col-4"><img src={imagencalefaccion} width={"20px"} alt="" /><span className="marginLeft5px">{t("Calefacción")}</span></div>)
    }
    if(data.aireacondicionado){
      a.push(<div className="p-col-4"><img src={imagenAire} width={"20px"} alt="" /><span className="marginLeft5px">{t("Aire Acondicionado")}</span></div>)
    }
    if(data.tvcable){
      a.push(<div className="p-col-4"><img src={imagenTV} alt="" width={"20px"}/><span className="marginLeft5px">TV</span></div>)
    }
    setAmenities(a)
  }
  async function getData() {
    const url = '/pisos/'+idPiso;
    try {
      const piso = await AxiosConexionConfig.get(url);
      setData(piso.data);
      amenitiesList(piso.data)
      getDestino(piso.data.iddestino)
      if(piso.data?.diasReservados!==""&& piso.data?.diasReservados!==null){
        setddisabledDates(piso.data?.diasReservados?.split(","))
      }
      
      
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

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(new Date(dateEnd)-new Date(dateBegin)<=0){
      seterrorfecha("El rango seleccionado no es correcto")
    }else{

      seterrorfecha("")
    }
    console.log(e.value)
  }

  const headerTarjeta=()=>{
    return(
        <div>            
            <i class="fa fa-user"></i><span className="marginLeft5px amenitie">{data.cantpersonas}</span>
            <span className="marginLeft10px"></span>
            {data.metroscuadrados}<span class="fa-exp amenitie">m<sup>2</sup></span>
            <span className="marginLeft10px"></span>
            <i class="fa fa-bath"></i><span className="marginLeft5px amenitie">{data.cantbannos}</span>
            <span className="marginLeft10px"></span>
            <i class="fa fa-bed"></i><span className="marginLeft5px amenitie">{data.canthabitaciones}</span>
            <span className="marginLeft10px"></span>
        </div>
    )
  }
  const TarjetPiso=()=>{
    return (
      <div className="">   
      <div><h2>{data.nombre}</h2></div>
        {headerTarjeta()}
        <hr/>
        <div>{t("Desde")} <i className="pi pi-euro"></i><span className="marginLeft5px">{data.precio}</span> {t("la noche")}</div>
        <div className="p-field p-col-12">
            <label htmlFor="calendar">{t("Seleccione un rango")}</label>
            <div>
                <Calendar 
                    id="calendar" 
                    className={"p-col-12 p-md-6"} 
                    value={dateBegin} 
                    minDate={today} 
                    locale="es" 
                    onChange={(e) => setDateBegin(e.value)} 
                    disabledDates={disabledDates}
                    readOnlyInput />
                <Calendar 
                    id="calendarend" 
                    className={"p-col-12 p-md-6"}  
                    minDate={new Date(minDate)} 
                    value={dateEnd} 
                    locale="es" 
                    disabled={disabledEndDate}
                    onChange={(e) => setDateEnd(e.value)} 
                    disabledDates={disabledDates}
                    readOnlyInput />
            </div>
            <div className="p-field p-col-12 p-md-3">
                <label htmlFor="minmax-buttons">{t("Guests")}</label>
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
          onClick={(e) => (handleSubmit(e))}
        >
          {t("Pre-reservar")}
        </Button>
      </div>
    )
  }
  const DatosPiso=()=>{    
    return(<Container>
        <div>
            <p>
                {data.nombre}
                <span className="marginLeft5px"></span>
                -
                <span className="marginLeft5px"></span>
                {destino?.nombre}
            </p>
        </div>
        {headerTarjeta()}
        <span className="marginLeft10px"></span>
        <div>{data.descripcion}</div>
        <span className="marginLeft10px"></span>
        <Row>        
            {t("Comodidades")}
        </Row>
        <Row>          
            {amenities?.map((dato, index)=>{
              return(dato)
            })}
        </Row>
        <Row>
            {amenitiesGenerales.map((dato, index)=>{
                return(data[dato]?<div className="p-col-4">{amenitiesGeneralesText[index]}</div>:"")
            })}      
        </Row>

        
    </Container>)
}
  const fila=(datosFila, texto)=>{
    return(
      <AccordionTab header={texto}>              
          
      <Row>
          {datosFila.split(",").map((dato, index)=>{
              return(dato?<div className="p-col-4">{dato}</div>:"")
          })}      
      </Row>
      </AccordionTab>
    )
  }

  const acordion=()=>{
    return (
      <Accordion multiple activeIndex={activeIndex} headerClassName="seccion" onTabChange={(e) => setactiveIndex(e.index)}>
            {data.banno!==null?
                fila(data.banno, "Baño"):
                <Fragment/>}
            {data.dormitorio!==null?
                fila(data.dormitorio,"Dormitorio"):
                <Fragment/>}
            {data.entretenimiento!==null?
                fila(data.entretenimiento,"Entretenimiento"):
                <Fragment/>}
            {data.paraFamilias!==null?
                fila(data.paraFamilias,"Para familias"):
                <Fragment/>}

            {data.calefaccionRefrigeracion!==null?
                fila(data.calefaccionRefrigeracion,"Calefacción y refrigeración"):
                <Fragment/>}

            {data.seguridadHogar!==null?
                fila(data.seguridadHogar,"Seguridad en el hogar"):
                <Fragment/>}
            {data.internetOficina!==null?
                fila(data.internetOficina,"Internet y oficina"):
                <Fragment/>}
            {data.cocinaComedor!==null?
                fila(data.cocinaComedor,"Cocina y comedor"):
                <Fragment/>}
            {data.estacionamientoInstalaciones!==null?
                fila(data.estacionamientoInstalaciones,"Estacionamiento e instalaciones"):
                <Fragment/>}
            {data.serviciosAdicionales!==null?
                fila(data.serviciosAdicionales,"Servicios adicionales con recargo"):
                <Fragment/>}
        </Accordion>
    )
  }
  return (
    <>    
      <div className="separador" />
          <div className="floatLeft p-col-12">
              <div className="p-lg-8 p-col-12 floatLeft">
                  {loadImg ?
                      carrusel() : <img alt="imagen"  src={imagenLoading}/>}
              </div>
              <div className="p-lg-3 p-col-12 floatLeft">
                  <div className="card p-col-12">
                      {loadData ?
                          TarjetPiso() : <img alt="imagen" src={imagenLoading}/>}
                  </div>
              </div>
          </div>
          <div className="floatLeft p-col-12">
              <div className="floatLeft p-col-12 p-md-12 p-lg-8">
                {loadData ?
                    DatosPiso() : 
                    <img alt="imagen" src={imagenLoading}/>}
              </div>
              <div className="p-lg-3 p-col-12 floatLeft">
                  {loadData ?
                      <div className="p-col-12 card"><Maps piso={data}/></div> : 
                      <img alt="imagen" src={imagenLoading}/>}
              </div>
          </div>
          <div className="p-col-12">
          {loadData ?acordion():<img alt="imagen" src={imagenLoading}/>}
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