import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setCurrentDestino } from 'redux/destino/destino.action';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';
import { setCurrentUsuario } from 'redux/usuario/usuario.action';
//Reactstrap
import { Container, Row, Col } from 'reactstrap';

// Imagenes
import img1 from 'assets/img/bg1.jpg';
import img2 from 'assets/img/bg4.jpg';

//Component
import LandingPageHeader from 'components/Headers/LandingPageHeader.js';
import Nosotros from 'pages/Nosotros/Nosotros.component';
//Conexión

//Styles
import './inicio.style.scss';
import Mensaje from 'pages/Mensaje/Mensaje';
import Equipo from 'components/Equipo';
import IndexNavbar from 'components/Navbars/IndexNavbar';

function Inicio(props) {
	const { t } = props;

	React.useEffect(() => {
		props.setCurrentNavBarColor(true);
	});
	React.useEffect(() => {
		document.body.classList.add('landing-page');
		document.body.classList.add('sidebar-collapse');
		document.documentElement.classList.remove('nav-open');
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		return function cleanup() {
			document.body.classList.remove('landing-page');
			document.body.classList.remove('sidebar-collapse');
		};
	}, []);

	return (
		<>
			<IndexNavbar />
			<div className='wrapper'>
				<LandingPageHeader />
				<div className='section-about-us'>
					<Container>
						<Row>
							<Col className='ml-auto mr-auto text-center'>
								<Nosotros isInicioPage />
							</Col>
						</Row>
						<div className='section-story-overview p-pt-0'>
							<Row>
								<Col md='6' className='fontFamily'>
									<div
										className='image-container image-left'
										style={{
											backgroundImage: 'url(' + img1 + ')',
										}}
									>
										<div className='blockquote ' id='1234'>
											<div className=''>
												<h3 className='p-mb-0'>{t('Garantia')}</h3>
											</div>
											{t('+ Calidad')} <br />
											{t('+ Comodidad')}
											<br />
											{t('+ Limpieza')} <br />
											{t('+ Ubicación')}
											<br />
											{t('+ Seguridad')}
										</div>
									</div>
								</Col>
								<Col md='5' className='fontFamily'>
									<div
										className='image-container image-right'
										style={{
											backgroundImage: 'url(' + img2 + ')',
										}}
									></div>
									<div>
										<div className='p-mb-0 '>
											<h3 className='p-mb-0 '>{t('Servicio 24/7')}</h3>
										</div>
									</div>
									<p>
										{t(
											'Estamos a tu disposición 24/7 durante toda tu estancia. Cuidamos y mantenemos nuestras propiedades revisando cada detalle.'
										)}
										<br />
										{t(
											'Si hay algo que podamos hacer para mejorar tu estancia, avísanos y estaremos encantados de ayudarte.'
										)}
									</p>
								</Col>
							</Row>
						</div>
					</Container>
				</div>
				<Equipo />
				<div className=' text-center'>
					<Container>
						<Mensaje inicio consulta />
					</Container>
				</div>
			</div>
		</>
	);
}

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
)(withTranslation('translations')(Inicio));
