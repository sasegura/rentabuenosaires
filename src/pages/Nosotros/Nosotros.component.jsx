import React from 'react';

//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";

//reactstrap
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

//CSS
import './Nosotros.style.scss';


const Nosotros = (props) => {
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);

    props.setCurrentNavBarColor(false);

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
        <div
          id="enviar_mensaje"
          className="section section-contact-us text-center"
        >
          <Container>
            <h2 className="title">Te ofrecemos un servicio de alquiler de primer nivel.</h2>
            <h2 className="title">Queremos que te sientas especial.</h2>

            <p className="description">
              Disfrutamos viajar por el mundo, conocer diferentes culturas y sentirnos parte de cada lugar.
            </p>
            <p className="description">
              A lo largo de los últimos años hemos conocido más de 100 ciudades, lo que nos ayuda a entender qué necesitan y valoran los viajeros del lugar donde se hospedan.
            </p>
            <p className="description">
              Nuestro objetivo es lograr que tu estadía sea lo más placentera posible, ofreciendo un servicio completo y de primer nivel, no sólo en el hospedaje sino también en las inquietudes que tengas durante tu viaje.
            </p>
            <p className="description">
              Alquila por días, semanas o meses con nosotros.
            </p>

            <h3><b>Nuestra garantía:</b></h3>
            <h4><p>+ Calidad + Comodidad + Limpieza + Ubicación + Seguridad +

            </p></h4>
            <br/>
            <Row><p>
              Estamos a tu disposición 24/7 durante toda tu estancia. 
              Cuidamos y mantenemos nuestras propiedades revisando cada detalle. Si hay algo que podamos hacer para mejorar tu experiencia, avísanos y estaremos encantados de ayudarte.
            </p>
            
              
            </Row>
          </Container>
        </div>
        </>
    )};

    const mapDispatchToProps = dispatch => ({
        setCurrentNavBarColor : navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
      })

    export default connect(null,mapDispatchToProps)(Nosotros);