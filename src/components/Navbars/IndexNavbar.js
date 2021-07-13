import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import esp from '../../assets/img/flags/ES.png';
import eng from '../../assets/img/flags/GB.png';
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
} from 'reactstrap';

import logo from '../../assets/img/logo-de-alquiler.png';

import { connect } from 'react-redux';
import { setCurrentDestino } from 'redux/destino/destino.action';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';
import { setCurrentUsuario } from 'redux/usuario/usuario.action';

import './IndexNavBar.style.scss';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import {
	linkAdicionar,
	linkDestinos,
	linkPisos,
	index,
	linkMensaje,
	linkNosotros,
	linkPropietarios,
	linkLogin,
	linkLogout,
} from 'configuracion/constantes';
import { linkReservaciones } from 'configuracion/constantes';

const IndexNavbar = (props) => {
	const { t } = props;
	const [navbarColor, setNavbarColor] = React.useState(
		props.currentNavBarColor === true ? 'navbar-transparent' : ''
	);
	const [navbarTextColor, setNavbarTextColor] = React.useState(
		props.currentNavBarColor === true ? 'white' : 'black'
	);
	const [destinos, setDestinos] = useState(null);

	const ChangeLenguage = (e, language) => {
		e.preventDefault();
		props.i18n.changeLanguage(language);
	};
	const [collapseOpen, setCollapseOpen] = React.useState(false);

	useEffect(() => {
		getDestinos();
	}, []);

	async function getDestinos() {
		AxiosConexionConfig.get(linkDestinos)
			.then((respuesta) => {
				setDestinos(respuesta.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}
	React.useEffect(() => {});
	React.useEffect(() => {
		if (props.currentNavBarColor) {
			setNavbarColor('navbar-transparent');
			setNavbarTextColor('white');
			const updateNavbarColor = () => {
				if (document.documentElement.scrollTop > 3 || document.body.scrollTop > 3) {
					setNavbarColor('');
					setNavbarTextColor('black');
				} else if (document.documentElement.scrollTop < 4 || document.body.scrollTop < 4) {
					setNavbarColor('navbar-transparent');
					setNavbarTextColor('white');
				}
			};
			window.addEventListener('scroll', updateNavbarColor);
			return function cleanup() {
				window.removeEventListener('scroll', updateNavbarColor);
			};
		} else {
			setNavbarColor('');
			setNavbarTextColor('black');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.currentNavBarColor]);

	const Login = () => {
		if (props.currentUsuario !== '') {
			return (
				<NavItem>
					<Link to={linkLogout}>
						<NavLink
							className={navbarTextColor}
							target='_self'
							onClick={() => {
								document.documentElement.classList.toggle('nav-open');
								setCollapseOpen(!collapseOpen);
							}}
						>
							{/*<p>{t("Cerrar Sesión")}</p>*/}
							{<p className='fontFamily'>Log Out</p>}
						</NavLink>
					</Link>
				</NavItem>
			);
		} else {
			return (
				<NavItem>
					<Link to={linkLogin}>
						<NavLink
							target='_self'
							className={navbarTextColor}
							onClick={() => {
								document.documentElement.classList.toggle('nav-open');
								setCollapseOpen(!collapseOpen);
							}}
						>
							{/*<p>{t("Entrar")}</p>*/}
							<p className='fontFamily'>Log In</p>
						</NavLink>
					</Link>
				</NavItem>
			);
		}
	};

	return (
		<>
			{collapseOpen ? (
				<div
					id='bodyClick'
					onClick={() => {
						document.documentElement.classList.toggle('nav-open');
						setCollapseOpen(false);
					}}
				/>
			) : null}
			<Navbar className={'fixed-top ' + navbarColor} expand='lg' color='white'>
				<Container>
					<div className='navbar-translate'>
						{/*logo*/}
						<Link to={index}>
							<div className='width100'>
								<img alt={'Logo'} src={logo} />
							</div>
						</Link>
						<button
							className='navbar-toggler navbar-toggler'
							onClick={() => {
								document.documentElement.classList.toggle('nav-open');
								setCollapseOpen(!collapseOpen);
							}}
							aria-expanded={collapseOpen}
							type='button'
						>
							<span className='navbar-toggler-bar top-bar'></span>
							<span className='navbar-toggler-bar middle-bar'></span>
							<span className='navbar-toggler-bar bottom-bar'></span>
						</button>
					</div>

					<Collapse className='justify-content-end' isOpen={collapseOpen} navbar>
						<Nav navbar>
							{props?.currentUsuario?.rol === 1 ? (
								<UncontrolledDropdown nav>
									<DropdownToggle
										className={navbarTextColor}
										caret
										color='default'
										href='#'
										nav
										onClick={(e) => e.preventDefault()}
									>
										<p className='fontFamily'>{t('Administracion')}</p>
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem to={linkAdicionar} tag={Link}>
											<i className='now-ui-icons mr-1'></i>
											<p className='fontFamily'>{t('Pisos')}</p>
										</DropdownItem>
										<DropdownItem to={linkReservaciones} tag={Link}>
											<i className='now-ui-icons mr-1'></i>
											<p className='fontFamily'>{t('Reservaciones')}</p>
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							) : null}

							<UncontrolledDropdown nav>
								<DropdownToggle
									className={navbarTextColor}
									caret
									color='default'
									href='#pablo'
									nav
									onClick={(e) => e.preventDefault()}
								>
									<p className='fontFamily'>{t('Destinos')}</p>
								</DropdownToggle>
								<DropdownMenu>
									{destinos !== null ? (
										destinos.map(({ iddestino, nombre }) => (
											<DropdownItem
												to={linkPisos}
												onClick={() => {
													props.setCurrentDestino({
														nombre: nombre,
														id: iddestino,
													});
												}}
												key={iddestino}
												tag={Link}
											>
												<i className='now-ui-icons mr-1'></i>
												<p className='fontFamily'>{nombre}</p>
											</DropdownItem>
										))
									) : (
										<Fragment />
									)}
								</DropdownMenu>
							</UncontrolledDropdown>

							<NavItem>
								<Link to={linkNosotros}>
									<NavLink target='_self' className={navbarTextColor}>
										<p className='fontFamily'>{t('Nosotros')}</p>
									</NavLink>
								</Link>
							</NavItem>

							<NavItem>
								<Link to={linkPropietarios}>
									<NavLink target='_self' className={navbarTextColor}>
										<p className='fontFamily'>{t('Propietarios')}</p>
									</NavLink>
								</Link>
							</NavItem>

							<NavItem>
								<Link to={linkMensaje}>
									<NavLink target='_self' className={navbarTextColor}>
										<p className='fontFamily'>{t('Contactar')}</p>
									</NavLink>
								</Link>
							</NavItem>

							<UncontrolledDropdown nav>
								<DropdownToggle
									className={navbarTextColor}
									caret
									color='default'
									href='#pablo'
									nav
									onClick={(e) => e.preventDefault()}
								>
									<i className='now-ui-icons location_world'></i>
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem
										to='/'
										onClick={(e) => ChangeLenguage(e, 'en')}
										tag={Link}
									>
										<img alt='...' className='n-logo bandera' src={eng} />
										<p className='fontFamily'>{t('Inglés')}</p>
									</DropdownItem>
									<DropdownItem
										to='/'
										onClick={(e) => ChangeLenguage(e, 'es')}
										tag={Link}
									>
										<img alt='...' className='n-logo bandera' src={esp} />
										<p className='fontFamily'>{t('Español')}</p>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>

							{Login()}

							<NavItem>
								<NavLink
									href='https://www.facebook.com/e-homeselect'
									target='_blank'
									id='facebook-tooltip'
									className={navbarTextColor}
								>
									<i className='fab fa-facebook-square'></i>
									<p className='d-lg-none d-xl-none'>Facebook</p>
								</NavLink>
								<UncontrolledTooltip target='#facebook-tooltip'>
									<p className='fontFamily'>{t('Síguenos en Facebook')}</p>
								</UncontrolledTooltip>
							</NavItem>
							<NavItem>
								<NavLink
									href='https://www.instagram.com/e-homeselect'
									target='_blank'
									id='instagram-tooltip'
									className={navbarTextColor}
								>
									<i className='fab fa-instagram'></i>
									<p className='d-lg-none d-xl-none'>Instagram</p>
								</NavLink>
								<UncontrolledTooltip target='#instagram-tooltip'>
									<p className='fontFamily'>{t('Síguenos en Instagram')}</p>
								</UncontrolledTooltip>
							</NavItem>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setCurrentDestino: (destino) => dispatch(setCurrentDestino(destino)),
	setCurrentNavBarColor: (navBarColor) => dispatch(setCurrentNavBarColor(navBarColor)),
	setCurrentUsuario: (usuario) => dispatch(setCurrentUsuario(usuario)),
});

const mapStateToProps = (state) => ({
	currentNavBarColor: state.navBarColor.currentNavBarColor,
	currentUsuario: state.usuario.currentUsuario,
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withTranslation('translations')(IndexNavbar));
