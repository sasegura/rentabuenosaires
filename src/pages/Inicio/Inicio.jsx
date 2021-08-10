import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setCurrentDestino } from 'redux/destino/destino.action';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';
import { setCurrentUsuario } from 'redux/usuario/usuario.action';
//Reactstrap
import {
	Button,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
} from 'reactstrap';

// Imagenes
import img1 from 'assets/img/bg1.jpg';
import img2 from 'assets/img/bg4.jpg';
import foto1 from 'assets/img/avatar.jpg';
import foto2 from 'assets/img/ryan.jpg';
import foto3 from 'assets/img/eva.jpg';

//Component
import LandingPageHeader from 'components/Headers/LandingPageHeader.js';
import Nosotros from 'pages/Nosotros/Nosotros.component';
//Conexión

//Styles
import './inicio.style.scss';
import Mensaje from 'pages/Mensaje/Mensaje';
import Equipo from 'components/Equipo';

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
			<div className='wrapper'>
				<LandingPageHeader />
				<div className='section-about-us'>
					<Container>
						<Row>
							<Col className='ml-auto mr-auto text-center'>
								<Nosotros isInicioPage />
							</Col>
						</Row>
						<div className='separator separator-primary'></div>
						<div className='section-story-overview'>
							<Row>
								<Col md='6'>
									<div
										className='image-container image-left'
										style={{
											backgroundImage: 'url(' + img1 + ')',
										}}
									>
										<p className='blockquote ' id='1234'>
											<div>
												<h4>
													<b>{t('Garantia')}</b>
												</h4>
											</div>
											{t('+ Calidad')} <br />
											{t('+ Comodidad')}
											<br />
											{t('+ Limpieza')} <br />
											{t('+ Ubicación')}
											<br />
											{t('+ Seguridad')}
										</p>
									</div>
								</Col>
								<Col md='5'>
									<div
										className='image-container image-right'
										style={{
											backgroundImage: 'url(' + img2 + ')',
										}}
									></div>
									<p>
										<h4>
											<b>{t('Sericio 24/7')}</b>
										</h4>
									</p>
									<p>
										{t(
											'Estamos a tu disposición 24/7 durante toda tu estancia. Cuidamos y mantenemos nuestras propiedades revisando cada detalle. Si hay algo que podamos hacer para mejorar tu estancia, avísanos y estaremos encantados de ayudarte.'
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
