import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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
import { setCurrentDestino } from 'redux/destino/destino.action';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';
import { setCurrentUsuario } from 'redux/usuario/usuario.action';
import foto1 from 'assets/img/luciana.jpg';
import foto2 from 'assets/img/jona.jpg';
import foto3 from 'assets/img/ryan.jpg';
import foto4 from 'assets/img/alicia.jpg';
const Equipo = (props) => {
	const { t } = props;
	return (
		<div className='sectionEquipo section-team text-center'>
			<Container>
				<h2 className=''>{t('Este es nuestro equipo')}</h2>
				<div className='team'>
					<Row>
						<Col md='3'>
							<div className='team-player'>
								<img
									alt='Jonathan Berman'
									className='rounded-circle img-fluid img-raised height100px'
									src={foto2}
								></img>
								<h4 className='title'>Jonathan Berman</h4>
								<p className='category '>
									{t('Director ejecutivo & Co-Fundador')}{' '}
								</p>
							</div>
						</Col>
						<Col md='3'>
							<div className='team-player'>
								<img
									alt='Luciana Carino'
									className='rounded-circle img-fluid img-raised height100px'
									src={foto1}
								></img>
								<h4 className='title'>Luciana Carino </h4>
								<p className='category'>{t('Jefa de diseño & Co-Fundadora')}</p>
							</div>
						</Col>
						<Col md='3'>
							<div className='team-player'>
								<img
									alt='Luis Alberto'
									className='rounded-circle img-fluid img-raised height100px'
									src={foto3}
								></img>
								<h4 className='title'>Luis Alberto</h4>
								<p className='category'>{t('Jefe de servicio')} </p>
							</div>
						</Col>
						<Col md='3'>
							<div className='team-player'>
								<img
									alt='Alicia Ghignone'
									className='rounded-circle img-fluid img-raised height100px'
									src={foto4}
								></img>
								<h4 className='title'>Alicia Ghignone</h4>
								<p className='category'>
									{t('Coordinadora de servicio al cliente')}{' '}
								</p>
							</div>
						</Col>
					</Row>
				</div>
			</Container>
		</div>
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
)(withTranslation('translations')(Equipo));
