import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import esp from "../../assets/img/flags/ES.png";
import eng from "../../assets/img/flags/GB.png";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

import logo from '../../assets/img/logo-de-alquiler.png'

import { connect } from "react-redux";
import { setCurrentDestino } from "redux/destino/destino.action";
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";
import { setCurrentUsuario } from "redux/usuario/usuario.action";

import './IndexNavBar.style.scss'
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { linkAdicionar, linkDestinos, linkPisos, index, linkMensaje, linkLogin, linkLogout } from "configuracion/constantes";

const IndexNavbar = (props) => {
  const { t } = props
  const [navbarColor, setNavbarColor] = React.useState(
    (props.currentNavBarColor === true) ? ("navbar-transparent") : ("")
  );
  const [destinos, setDestinos] = useState(null)

  const ChangeLenguage = (e, language) => {
    e.preventDefault()
    props.i18n.changeLanguage(language);
  }
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  useEffect(() => {
    getDestinos();
  }, []);

  async function getDestinos() {
      AxiosConexionConfig.get(linkDestinos).then((respuesta)=>{
        setDestinos(respuesta.data);        
      }).catch((e)=>{
        console.log(e)
      })
  }  
  React.useEffect(() => {
    
  });
  React.useEffect(() => {
      if (props.currentNavBarColor) {        
          setNavbarColor("navbar-transparent");
          const updateNavbarColor = () => {
            if (
              document.documentElement.scrollTop > 399 ||
              document.body.scrollTop > 399
            ) {
              setNavbarColor("");
            } else if (
              document.documentElement.scrollTop < 400 ||
              document.body.scrollTop < 400
            ) {
              setNavbarColor("navbar-transparent");
            }
          };
          window.addEventListener("scroll", updateNavbarColor);
          return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
          };
      }else{setNavbarColor("");}
        
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentNavBarColor]);


  const Login = () => {
    if (props.currentUsuario !== "") {
      return (
        <NavItem >
          <Link to={linkLogout}>
            <NavLink
              target="_self"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
            >
              <i className="now-ui-icons users_single-02"></i>
              <p>{t("Cerrar Sesión")}</p>
            </NavLink>
          </Link>

        </NavItem>
      )
    } else {
      return (<NavItem >
        <Link to={linkLogin}>
          <NavLink
            target="_self"
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              setCollapseOpen(!collapseOpen);
            }}
          >
            <i className="now-ui-icons users_single-02"></i>
            <p>{t("Entrar")}</p>
          </NavLink>
        </Link>

      </NavItem>)
    }
  }

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">

            {/*logo*/}


            <Link to={index}><div className="width20"><img alt={"Logo"} src={logo}/></div></Link>

            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >

              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>

          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              

              <NavItem>
                <Link to={linkAdicionar}>
                  <NavLink target="_self">
                    <i className="now-ui-icons ui-1_send"></i>
                    <p>{t("Administracion")}</p>
                  </NavLink>
                </Link>
              </NavItem>

              <UncontrolledDropdown nav>
                <DropdownToggle caret color="default" href="#pablo" nav onClick={(e) => e.preventDefault()}>
                  <i className="now-ui-icons location_map-big"></i>
                  <p>{t("Destinos")}</p>
                </DropdownToggle>
                <DropdownMenu>
                  {destinos !== null ?
                    destinos.map(({ iddestino, nombre }) => (
                      <DropdownItem to={linkPisos} onClick={() => {
                        props.setCurrentDestino({ nombre: nombre, id: iddestino })
                        document.documentElement.classList.toggle("nav-open");
                        setCollapseOpen(!collapseOpen);
                      }}
                        key={iddestino} tag={Link}>
                        <i className="now-ui-icons mr-1"></i>
                        {nombre}
                      </DropdownItem>
                    )) : <Fragment />}
                </DropdownMenu>
              </UncontrolledDropdown>
              
              <NavItem>
                <Link to={linkMensaje}>
                  <NavLink target="_self" onClick={() => {
                    document.documentElement.classList.toggle("nav-open");
                    setCollapseOpen(!collapseOpen);
                  }}>
                    <i className="now-ui-icons ui-1_send"></i>
                    <p>{t("Enviar mensaje")}</p>

                  </NavLink>
                </Link>
              </NavItem>

              <UncontrolledDropdown nav>
                <DropdownToggle caret color="default" href="#pablo" nav onClick={(e) => e.preventDefault()}>
                  <i className="now-ui-icons location_world"></i>
                  <p>{t("Idioma")}</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to='/' onClick={(e) => ChangeLenguage(e, "en")} tag={Link}>
                    <img alt="..." className="n-logo bandera" src={eng} />
                    {t("Inglés")}
                  </DropdownItem>
                  <DropdownItem to='/' onClick={(e) => ChangeLenguage(e, "es")} tag={Link}>
                    <img alt="..." className="n-logo bandera" src={esp} />
                    {t("Español")}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              {Login()}


              <NavItem>
                <NavLink
                  href="https://www.facebook.com/CreativeTim?ref=creativetim"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  {t("Síguenos en Facebook")}
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  {t("Síguenos en Instagram")}
                </UncontrolledTooltip>
              </NavItem>



            </Nav>
          </Collapse>
        </Container>
      </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("translations")(IndexNavbar));


