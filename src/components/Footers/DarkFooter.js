/*eslint-disable*/
import { linkMensaje } from 'configuracion/constantes';
import { linkPropietarios } from 'configuracion/constantes';
import { linkNosotros } from 'configuracion/constantes';
import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import whatsapp from '../../assets/img/whatsapp--v13.png';
function DarkFooter(props) {
	const { t } = props;
	return (
		<footer className='footer' data-background-color='black'>
			<Container>
				<div className='p-col-12 p-d-flex'>
					<div className='p-col-12 p-md-4'>
						<p>Enlaces comunes:</p>
						<Link to={linkNosotros}>
							<p className='fontFamily'>{t('Nosotros')}</p>
						</Link>
						<Link to={linkPropietarios}>
							<p className='fontFamily'>{t('Propietarios')}</p>
						</Link>
						<Link to={linkMensaje}>
							<p className='fontFamily'>{t('Contactar')}</p>
						</Link>
					</div>
					<div className='p-col-12 p-md-4'>
						<p>{t('Nosotros')}:</p>
						Te ofrecemos un servicio de alquiler de primer nivel. Queremos que te
						sientas especial. <br />A lo largo de los últimos años hemos conocido más de
						100 ciudades, lo que nos ayuda a entender qué necesitas y valoras del lugar
						donde te hospedas.
					</div>
					<div className='p-col-12 p-md-4'>
						<p>Get in touch</p>
						Reservations: +34 911 438 350
						<img src={whatsapp} alt={'Whatsapp'} style={{ width: '15px' }} />
						<br />
						Guest Services: +34 911 43 83 32
						<img src={whatsapp} alt={'Whatsapp'} style={{ width: '15px' }} />
					</div>
				</div>
				<nav>
					<ul>
						<li>
							<a
								href='https://www.creative-tim.com?ref=nukr-dark-footer'
								target='_blank'
							></a>
						</li>
						<li>
							<a
								href='http://presentation.creative-tim.com?ref=nukr-dark-footer'
								target='_blank'
							></a>
						</li>
						<li>
							<a
								href='http://blog.creative-tim.com?ref=nukr-dark-footer'
								target='_blank'
							></a>
						</li>
					</ul>
				</nav>
			</Container>
		</footer>
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

export default withTranslation('translations')(DarkFooter);
