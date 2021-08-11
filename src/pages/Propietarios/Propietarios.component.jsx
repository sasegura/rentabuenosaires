import React from 'react';

//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';

//reactstrap
import {
	Col,
	Container,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row,
} from 'reactstrap';
import { Button } from 'primereact/button';
//CSS
import './Propietarios.style.scss';
import { Link, useHistory } from 'react-router-dom';
import { linkNosotros } from 'configuracion/constantes';
import { linkMensaje } from 'configuracion/constantes';
import { withTranslation } from 'react-i18next';

const Propietarios = (props) => {
	const { t } = props;
	const history = useHistory();
	props.setCurrentNavBarColor(false);
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
			<div id='enviar_mensaje' className='section section-contact-us text-center'>
				<Container>
					<h2 className=''>{t('Rentabiliza tu propiedad')}</h2>
					<p className='fontFamily '>
						{t('Te ofrecemos una propuesta de alta rentabilidad para tu propiedad.')}
						{t(' ')}
						{t(
							'Comercializamos por días, semanas o meses, y nos ocupamos de todo lo necesario.'
						)}
					</p>
					<p className='fontFamily'>
						{t(
							'Cuidamos tu casa y obtenemos beneficios económicos cuando no estás en ella.'
						)}
					</p>
					<Button
						label={t('CONTACTA CON NOSOTROS')}
						className='p-button-rounded margingTop50'
						onClick={() => history.push(linkMensaje)}
					/>
				</Container>
			</div>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setCurrentNavBarColor: (navBarColor) => dispatch(setCurrentNavBarColor(navBarColor)),
});

export default connect(null, mapDispatchToProps)(withTranslation('translations')(Propietarios));
