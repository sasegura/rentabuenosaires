import React from "react";

import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import img1 from "../assets/img/bg1.jpg";
import img2 from "../assets/img/bg4.jpg";
import img3 from "../assets/img/bg3.jpg";
import foto1 from "../assets/img/avatar.jpg";
import foto2 from "../assets/img/ryan.jpg";
import foto3 from "../assets/img/eva.jpg";
import DarkFooter from "components/Footers/DarkFooter";
import TransparentFooter from "components/Footers/TransparentFooter";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react";
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import './css/inicio.style.scss';

function Inicio() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [imagen, setImagen] = React.useState(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
  
  React.useEffect(() => {
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


  const onChange=(e)=>{
    console.log(e.target.files[0])
    let file=e.target.files[0]
    if(file){
      const reader=new FileReader()
      reader.readAsDataURL(file)
      reader.onload=function(){
          var base64=reader.result
          console.log(base64)
          var s=base64.split(",")
          setImagen(s[1])
          setImagenX(s[1])
      }
      
    }
  }
  async function setImagenX(imagenX) {
    const url = '/imagen';
    const v={ idpiso:2, imagen:imagenX, portada:true}
    try {
        const imagen = await AxiosConexionConfig.post(url,JSON.stringify(v));
        
        
        //history.push("/profile")
    } catch (e) {
        console.log(e);
        
    }
}
  const ReaderLoaded=(ev)=>{
    let binary=ev
    console.log(binary)
    console.log(btoa(binary.target.result))
  }
  return (
    <>
      <div className="wrapper">
        <LandingPageHeader />
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <form onChange={(e)=>{onChange(e)}}>
                  <input type="file" name ="image" id="file" accept=".jpeg, .png, .jpg"/>
                </form>
                <img src={"data:image/png;base64,"+imagen}/>
              </Col>
            </Row>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">“Queremos que te sientas especial.
                Que has encontrado tu lugar. Vive lo mejor que puedas”
</h2>
                <h5 className="description">
                Disfrutamos viajar por el mundo, conocer diferentes 
                culturas y sentirnos parte de cada lugar. A lo largo 
                de los últimos años hemos conocido más de 100 ciudades, 
                lo que nos ayuda a entender qué necesitan y valoran 
                los viajeros del lugar donde se hospedan. Nuestro 
                objetivo es lograr que tu estadía sea lo más placentera
                posible, ofreciéndote un servicio completo y de primer 
                nivel, no sólo sobre el hospedaje sino también sobre 
                inquietudes que tengas durante tu viaje.

                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                  <div
                    className="image-container image-left"
                    style={{
                      backgroundImage: "url(" + img1 + ")",
                    }}
                  >
                    <p className="blockquote blockquote-info" id="1234">
                    Nuestra garantía:<br/>
                    + Calidad <br/> 
                    + Comodidad<br/> 
                    + Limpieza <br/>
                    + Ubicación<br/> 
                    + Seguridad
                    </p>
                  </div>
                  
                </Col>
                <Col md="5">
                  <div
                    className="image-container image-right"
                    style={{
                      backgroundImage: "url(" + img2 + ")",
                    }}
                  ></div>
                  
                  <p>
                  Estamos a tu disposición 24/7 durante toda tu estancia. 
                  Cuidamos y mantenemos nuestras propiedades revisando 
                  cada detalle. Si hay algo que podamos hacer para 
                  mejorar tu estancia, avísanos y estaremos encantados 
                  de ayudarte.
                  </p>
                  
                 
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="sectionEquipo section-team text-center">
          <Container>
            <h2 className="title">Este es nuestro equipo</h2>
            <div className="team">
              <Row>
                <Col md="3">
                  <div className="team-player">
                    <img
                      alt="Nombre Apellido 1"
                      className="rounded-circle img-fluid img-raised"
                      src={foto2}
                    ></img>
                    <h4 className="title">Jonathan Berman</h4>
                    <p className="category text-info">CEO & Co-Founder{" "}</p>
                                        
                  </div>
                </Col>
                <Col md="3">
                  <div className="team-player">
                    <img
                      alt="Luciana Carino Hasperué"
                      className="rounded-circle img-fluid img-raised"
                      src={foto1}
                    ></img>
                    <h4 className="title">Luciana Carino Hasperué</h4>
                    <p className="category text-info">Head of interior design & Co-Founder </p>
                    
                  </div>
                </Col>
                <Col md="3">
                  <div className="team-player">
                    <img
                      alt="Luis"
                      className="rounded-circle img-fluid img-raised"
                      src={foto2}
                    ></img>
                    <h4 className="title">Luis</h4>
                    <p className="category text-info">Head of service </p>
                    
                  </div>
                </Col>
                <Col md="3">
                  <div className="team-player">
                    <img
                      alt="Alicia"
                      className="rounded-circle img-fluid img-raised"
                      src={foto3}
                    ></img>
                    <h4 className="title">Alicia</h4>
                    <p className="category text-info">Guest service coordinator </p>
                    
                  </div>
                </Col>
                </Row>
            </div>
          </Container>
        </div>
        <div
          id="enviar_mensaje"
          className="section section-contact-us text-center"
        >
          <Container>
            <h2 className="title">Envíanos un mensaje</h2>
            <p className="description">
              Tus comentarios son muy importantes para nosotros
            </p>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Nombre"
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email..."
                    type="email"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                  ></Input>
                </InputGroup>
                <div className="textarea-container">
                  <Input
                    cols="80"
                    name="name"
                    placeholder="Escribe un mensaje..."
                    rows="4"
                    type="textarea"
                  ></Input>
                </div>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    Enviar Mensaje
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Inicio;
