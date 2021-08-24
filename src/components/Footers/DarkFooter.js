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
			<div className='p-col-12 p-p-0 p-d-flex'>
				<div className='p-col-12 p-p-0 p-md-1'></div>
				<div className='p-col-12 p-p-0 p-md-10 p-d-flex'>
					<div className='p-col-12  p-md-4'>
						<p>{t('Enlaces comunes')}:</p>
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
						<p>{t('Nuestros objetivos')}:</p>"
						{t('Servicio de alquiler de primer nivel')}"
						<br />
						<br />"{t('Tu estancia será perfecta')}"
						<br />
						<br />"{t('Limpieza y seguridad son nuestras prioridades')}"
					</div>
					<div className='p-col-12 p-md-4'>
						<p>{t('Contáctanos')}</p>
						{t('Atención al cliente')} / {t('Reservas')}
						<br />
						Argentina:{' '}
						<SocialIcon
							className='p-ml-2'
							style={{ width: '20px', height: '20px' }}
							url='https://wa.me/34123456789'
							target='_blank'
							bgColor='grey'
						/>
						+54 911 3848 4956
						<br />
						España:{' '}
						<SocialIcon
							className=' p-ml-2'
							style={{ width: '20px', height: '20px' }}
							url='https://api.whatsapp.com/send?phone=34123456789'
							bgColor='grey'
						/>
						+34 626 151 223
						<br />
						<br />
						<SocialIcon
							style={{ width: '40px', height: '40px' }}
							className='p-mr-2'
							url='https://facebook.com/e-homeselect'
							bgColor='grey'
						/>
						<SocialIcon
							className='p-mr-2'
							style={{ width: '40px', height: '40px' }}
							url='mailto:administrador@e-homeselect.com'
							network='mailto'
							bgColor='grey'
						/>
						<SocialIcon
							style={{ width: '40px', height: '40px' }}
							className='p-mr-2'
							url='https://www.instagram.com/e-homeselect'
							bgColor='grey'
						/>
					</div>
				</div>
				<div className='p-col-12 p-md-1'></div>
			</div>
			<div className='p-text-center'>© 2021 E-HomeSelect. All Rights Reserved.</div>
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
