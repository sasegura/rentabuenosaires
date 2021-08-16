import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setCurrentUsuario } from 'redux/usuario/usuario.action';

import { withTranslation } from 'react-i18next';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Col,
} from 'reactstrap';

// Imagenes
import img1 from 'assets/img/login.jpg';
import img2 from 'assets/img/logo-de-alquiler.png';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import { index } from 'configuracion/constantes';
import { useHistory } from 'react-router';

function LoginPage(props) {
	const history = useHistory();
	const img11 = img1;
	const { t } = props;
	const [firstFocus, setFirstFocus] = React.useState(false);
	const [lastFocus, setLastFocus] = React.useState(false);
	const [nombreUsuario, setNombreUsuario] = React.useState('');
	const [contrasennaUsuario, setContrasennaUsuario] = React.useState('');
	const [nombremensaje, setNombremensaje] = React.useState('');
	const [contrasennamensaje, setContrasennamensaje] = React.useState('');
	const [loginmensaje, setloginmensaje] = React.useState('');

	React.useEffect(() => {
		document.body.classList.add('login-page');
		document.body.classList.add('sidebar-collapse');
		document.documentElement.classList.remove('nav-open');
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;

		return function cleanup() {
			document.body.classList.remove('login-page');
			document.body.classList.remove('sidebar-collapse');
		};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (nombreUsuario === '') {
			setNombremensaje(t('Nombre de usuario requerido'));
		} else {
			setNombremensaje('');
		}
		if (contrasennaUsuario === '') {
			setContrasennamensaje(t('Contraseña de usuario requerido'));
		} else {
			setContrasennamensaje('');
		}
		getUsuarioLogin();
	};

	async function getUsuarioLogin() {
		const url = '/usuarios?filter=';
		const valores = JSON.stringify({
			where: {
				and: [{ nombre: nombreUsuario }, { contrasenna: contrasennaUsuario }],
			},
		});
		try {
			const respuesta = await AxiosConexionConfig.get(url + encodeURIComponent(valores));
			if (respuesta.data.length > 0) {
				const fecha = new Date(
					respuesta.data[0].expiracion.replace(/ /g, 'T').split('+')[0]
				);
				const hoy = new Date();
				console.log(respuesta.data[0].expiracion.replace(/ /g, 'T'));
				console.log(fecha);
				console.log(hoy);
				if (fecha.getTime() > hoy.getTime()) {
					setloginmensaje('');
					props.setCurrentUsuario(respuesta.data[0]);
					history.push(index);
				} else {
					setloginmensaje(t('El usuario ha expirado.'));
				}
			} else {
				setloginmensaje(t('Usuario o contraseña incorrectos.'));
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<>
			<div className='page-header clear-filter' filter-color='blue'>
				<div
					className='page-header-image'
					style={{
						backgroundImage: 'url(' + img11 + ')',
					}}
				></div>
				<div className='content'>
					<Container>
						<Col className='ml-auto mr-auto' md='4'>
							<Card className='card-login card-plain'>
								<Form action='' className='form' method=''>
									<CardHeader className='text-center'>
										<div className='logo-container'>
											<img alt='...' src={img2}></img>
										</div>
									</CardHeader>
									<CardBody>
										<InputGroup
											className={
												'no-border input-lg' +
												(firstFocus ? ' input-group-focus' : '')
											}
										>
											<InputGroupAddon addonType='prepend'>
												<InputGroupText>
													<i className='now-ui-icons users_circle-08'></i>
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder={t('Usuario...')}
												type='text'
												value={nombreUsuario}
												onFocus={() => setFirstFocus(true)}
												onBlur={() => setFirstFocus(false)}
												onChange={(e) => setNombreUsuario(e.target.value)}
											></Input>
										</InputGroup>
										<div>
											{nombremensaje !== '' ? (
												<label>{nombremensaje}</label>
											) : (
												<Fragment />
											)}
										</div>
										<InputGroup
											className={
												'no-border input-lg' +
												(lastFocus ? ' input-group-focus' : '')
											}
										>
											<InputGroupAddon addonType='prepend'>
												<InputGroupText>
													<i className='now-ui-icons text_caps-small'></i>
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder={t('Contraseña...')}
												type='password'
												value={contrasennaUsuario}
												onFocus={() => setLastFocus(true)}
												onBlur={() => setLastFocus(false)}
												onChange={(e) =>
													setContrasennaUsuario(e.target.value)
												}
											></Input>
										</InputGroup>
										{contrasennamensaje !== '' ? (
											<label>{contrasennamensaje}</label>
										) : (
											<Fragment />
										)}
									</CardBody>
									{loginmensaje !== '' ? (
										<label>{loginmensaje}</label>
									) : (
										<Fragment />
									)}
									<CardFooter className='text-center'>
										<Button
											block
											className='btn-round'
											color='btn-primary'
											href='#pablo'
											onClick={(e) => handleSubmit(e)}
											size='lg'
										>
											{t('Entrar')}
										</Button>
										{/*<div className="pull-left">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Create Account
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>*/}
									</CardFooter>
								</Form>
							</Card>
						</Col>
					</Container>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => ({
	currentUsuario: state.usuario.currentUsuario,
});
const mapDispatchToProps = (dispatch) => ({
	setCurrentUsuario: (usuario) => dispatch(setCurrentUsuario(usuario)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withTranslation('translations')(LoginPage));
