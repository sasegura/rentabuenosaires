import React from 'react';

//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';

import { withTranslation } from 'react-i18next';

//reactstrap
import {
	Button,
	Col,
	Container,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row,
} from 'reactstrap';

//CSS
import './Nosotros.style.scss';

const Nosotros = (props) => {
	const { t } = props;
	const [firstFocus, setFirstFocus] = React.useState(false);
	const [lastFocus, setLastFocus] = React.useState(false);

	props.setCurrentNavBarColor(false);

	return (
		<>
			<div className={props.inicio ? null : 'section ' + 'section-contact-us text-center'}>
				<Container>
					<h2>{t('Te ofrecemos un servicio de alquiler')}</h2>
					<h2>{t('de primer nivel.')}</h2>
					<h2>{t('Queremos que te sientas especial.')}</h2>

					<p className='fontFamily'>
						{t(
							'Disfrutamos viajar por el mundo, conocer diferentes culturas y sentirnos parte de cada lugar.'
						)}
					</p>
					<p className='fontFamily'>
						{t(
							'A lo largo de los últimos años hemos conocido más de 100 ciudades, lo que nos ayuda a entender qué necesitas y valoras del lugar donde te hospedas.'
						)}
					</p>
					<p className='fontFamily'>
						{t(
							'Nuestro objetivo es lograr que tu estadía sea perfecta, ofreciendo un servicio completo y de primer nivel, no sólo en el hospedaje sino también en las inquietudes que tengas durante toda tu estancia.'
						)}
					</p>
					<p className='fontFamily'>
						{t('Alquila por días, semanas o meses con nosotros.')}
					</p>
					{props.inicio ? null : (
						<>
							<h3>
								<b className='fontFamily'>{t('Garantia')}</b>
							</h3>
							<h4>
								<p className='fontFamily'>
									{t(
										'+ Calidad + Comodidad + Limpieza + Ubicación + Seguridad +'
									)}
								</p>
							</h4>
							<br />
							<p className='fontFamily'>
								{t('Estamos a tu disposición 24/7 durante toda tu estadía.')}
							</p>
							<p className='fontFamily'>
								{t(
									'Cuidamos y mantenemos nuestras propiedades revisando cada detalle.'
								)}
							</p>
							<p className='fontFamily'>
								{t(
									'Si hay algo que podamos hacer para mejorar tu experiencia, avísanos y estaremos encantados de ayudarte.'
								)}
							</p>
						</>
					)}
				</Container>
			</div>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setCurrentNavBarColor: (navBarColor) => dispatch(setCurrentNavBarColor(navBarColor)),
});

export default connect(null, mapDispatchToProps)(withTranslation('translations')(Nosotros));
