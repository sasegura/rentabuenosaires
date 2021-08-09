/*eslint-disable*/
import { linkMensaje } from 'configuracion/constantes';
import { linkPropietarios } from 'configuracion/constantes';
import { linkNosotros } from 'configuracion/constantes';
import React from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
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
						© 2021 E-HomeSelect. All Rights Reserved.
					</div>
					<div className='p-col-12 p-md-4'>
						<p>{t('Nuestros objetivos')}:</p>"
						{t('Servicio de alquiler de primer nivel')}"
						<br />"{t('Tu estancia será perfecta')}"
						<br />"{t('Limpieza y seguridad son nuestras prioridades')}"
					</div>
					<div className='p-col-12 p-md-4'>
						WHATSAPP
						<br />
						{t('Reservas')}: +34 626 151 223
						<br />
						{t('Atención al cliente')}: +54 911 3848 4956
						<br />
						<br />
						<SocialIcon url='https://api.whatsapp.com/send?phone=34123456789' />
						<SocialIcon url='https://facebook.com/e-homeselect' />
						<SocialIcon url='mailto:administrador@e-homeselect.com' network='mailto' />
						<SocialIcon url='https://linkedin.com/e-homeselect' />
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
