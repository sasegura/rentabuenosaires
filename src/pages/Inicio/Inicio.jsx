import React from "react";
import { withTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { setCurrentDestino } from "redux/destino/destino.action";
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";
import { setCurrentUsuario } from "redux/usuario/usuario.action";
//Reactstrap
import { Button, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from "reactstrap";

// Imagenes
import img1 from "assets/img/bg1.jpg";
import img2 from "assets/img/bg4.jpg";
import foto1 from "assets/img/avatar.jpg";
import foto2 from "assets/img/ryan.jpg";
import foto3 from "assets/img/eva.jpg";

//Component
import LandingPageHeader from "components/Headers/LandingPageHeader.js";

//Conexión

//Styles
import './inicio.style.scss';
import MensajeComponent from "pages/Mensaje/Mensaje.component";

function Inicio(props) {
  const {t}=props;
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  
  React.useEffect(() => {
    props.setCurrentNavBarColor(true);
  });
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

  
  return (
    <>
      <div className="wrapper">
        <LandingPageHeader />
        <div className="section section-about-us">
          <Container>           
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">
                  <p>{t("Queremos que te sientas especial.")}</p>
                  <p>{t("Que has encontrado tu lugar.")}</p>
                  <p>{t("Vive lo mejor que puedas.")}</p>
                </h2>
                <h5 className="description">
                {t("Disfrutamos viajar por el mundo, conocer diferentes culturas y sentirnos parte de cada lugar. A lo largo de los últimos años hemos conocido más de 100 ciudades, lo que nos ayuda a entender qué necesitan y valoran los viajeros del lugar donde se hospedan. Nuestro objetivo es lograr que tu estadía sea lo más placentera posible, ofreciéndote un servicio completo y de primer nivel, no sólo sobre el hospedaje sino también sobre inquietudes que tengas durante tu viaje.")}

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
                    {t("Nuestra garantía:")}<br/>
                    {t("+ Calidad")} <br/> 
                    {t("+ Comodidad")}<br/> 
                    {t("+ Limpieza")} <br/>
                    {t("+ Ubicación")}<br/> 
                    {t("+ Seguridad")}
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
                  {t("Estamos a tu disposición 24/7 durante toda tu estancia. Cuidamos y mantenemos nuestras propiedades revisando cada detalle. Si hay algo que podamos hacer para mejorar tu estancia, avísanos y estaremos encantados de ayudarte.")}
                  </p>
                  
                 
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="sectionEquipo section-team text-center">
          <Container>
            <h2 className="title">{t("Este es nuestro equipo")}</h2>
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
            <MensajeComponent/>
          </Container>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  setCurrentDestino: destino => dispatch(setCurrentDestino(destino)),
  setCurrentNavBarColor: navBarColor => dispatch(setCurrentNavBarColor(navBarColor)),
  setCurrentUsuario: usuario => dispatch(setCurrentUsuario(usuario))
})

const mapStateToProps = state => ({
  currentNavBarColor: state.navBarColor.currentNavBarColor,
  currentUsuario: state.usuario.currentUsuario
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("translations") (Inicio));
