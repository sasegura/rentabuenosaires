import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import airbnbLogo from '../../assets/img/airbnb-logon.png'
import esp from "../../assets/img/flags/ES.png";
import eng from "../../assets/img/flags/GB.png";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";
import { connect } from "react-redux";
import { setCurrentDestino } from "redux/destino/destino.action";
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";
import './IndexNavBar.style.scss'

const IndexNavbar = (props) => {
  const { t } = props
  const [navbarColor, setNavbarColor] = React.useState(
    (props.currentNavBarColor === true) ? ("navbar-transparent") : ("")
  );

  const ChangeLenguage = (e, language) => {
    e.preventDefault()
    props.i18n.changeLanguage(language);
  }
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  const destinos = [
    {
      id: 1,
      nombre: "Madrid",
      cantPisos: 1,
    },
    {
      id: 2,
      nombre: "Buenos Aires",
      cantPisos: 3,
    },
  ];


  React.useEffect(() => {

    const updateNavbarColor = () => {

      if (navbarColor === "navbar-transparent") {
        if (
          document.documentElement.scrollTop > 399 ||
          document.body.scrollTop > 399
        ) {
          setNavbarColor("")
        } else if (
          document.documentElement.scrollTop < 400 ||
          document.body.scrollTop < 400
        ) {
          setNavbarColor("navbar-transparent");
        }
      }
    };

    if (props.currentNavBarColor) {
      window.addEventListener("scroll", updateNavbarColor);
    }
    else {
      window.removeEventListener("scroll", updateNavbarColor);
      setNavbarColor("")
    }



    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, [props.currentNavBarColor]);



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
            <NavbarBrand
              href="/rentabuenosaires"
              id="navbar-brand"
              target="_self"
            >
              Logo
            </NavbarBrand>


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
                <NavLink
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("enviar_mensaje")
                      .scrollIntoView();
                  }}
                >
                  <i className="now-ui-icons ui-1_send"></i>
                  <p>{t("Enviar mensaje")}</p>
                </NavLink>
              </NavItem>

              <UncontrolledDropdown nav>
                <DropdownToggle caret color="default" href="#pablo" nav onClick={(e) => e.preventDefault()}>
                  <i className="now-ui-icons location_map-big"></i>
                  <p>{t("Destinos")}</p>
                </DropdownToggle>
                <DropdownMenu>
                  {destinos.map(({ id, nombre }) => (
                    <DropdownItem to='/piso' onClick={() => props.setCurrentDestino({
                      nombre: nombre,
                      id: id
                    })}
                      key={id} tag={Link}>
                      <i className="now-ui-icons mr-1"></i>
                      {nombre}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>


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

              <NavItem >
                <Link to='/login'>
                  <NavLink

                    target="_self"
                  >
                    <i className="now-ui-icons users_single-02"></i>
                    <p>{t("Entrar")}</p>
                  </NavLink>
                </Link>

              </NavItem>


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
})

const mapStateToProps = state => ({
  currentNavBarColor: state.navBarColor.currentNavBarColor
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation("translations")(IndexNavbar));


