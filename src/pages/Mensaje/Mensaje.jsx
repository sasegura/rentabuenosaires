import React, { useRef, useState } from 'react';

//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';

//primereact
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Form, Field } from 'react-final-form';
import classNames from 'classnames';
import { Toast } from 'primereact/toast';

//reactstrap
// import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Container } from 'reactstrap';
//CSS
import './Mensaje.style.scss';

import { withTranslation } from 'react-i18next';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';

const Mensaje = (props) => {
	const { t } = props;
	const toast = useRef(null);
	const [firstFocus, setFirstFocus] = React.useState(false);
	const [lastFocus, setLastFocus] = React.useState(false);

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
	const validate = (data) => {
		let errors = {};
		if (!data.name) {
			errors.name = 'Name is required.';
		}
		if (!data.telefono) {
			errors.telefono = 'Name is required.';
		}
		if (!/^[+][0-9]{6,14}$/i.test(data.telefono)) {
			errors.telefono = 'Invalid Phone. E.g +3485698545';
		}
		if (!data.email) {
			errors.email = 'Email is required.';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
			errors.email = 'Invalid email address. E.g. example@email.com';
		}
		return errors;
	};

	async function sendMail(data) {
		const url = '/sendMailMensaje';
		const values = {
			clienteNombre: data.name,
			correoCliente: data.email,
			correoAdmin: 'administrador@e-homeselect.com',
			telefono: data.telefono,
			mensaje: data.texto,
			fechaInicio: new Date(),
		};
		try {
			const piso = await AxiosConexionConfig.post(url, JSON.stringify(values));
			console.log(piso);
			if (piso.data) {
				toast.current.show({
					severity: 'success',
					summary: 'Success Message',
					detail: `Correo enviado al administrador.`,
					life: 3000,
				});
			} else {
				toast.current.show({
					severity: 'success',
					summary: 'Success Message',
					detail: `El correo no se envió correctamente.`,
					life: 3000,
				});
			}
		} catch (e) {
			toast.current.show({
				severity: 'success',
				summary: 'Success Message',
				detail: e,
				life: 3000,
			});
			console.log(e);
		}
	}

	const onSubmit = (data, form) => {
		console.log(data);
		sendMail(data);
		/*setOpen(false)
        setValor(data)
        acept(true)*/
		form.restart();
	};

	const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
	const getFormErrorMessage = (meta) => {
		return isFormFieldValid(meta) && <small className='p-error'>{meta.error}</small>;
	};

	return (
		<>
			<Toast baseZIndex={500} ref={toast} />
			<div
				id='enviar_mensaje'
				className={
					!props.inicio
						? 'section text-center text-center ml-auto mr-auto col-md-8 col-lg-6'
						: 'text-center text-center ml-auto mr-auto col-md-8 col-lg-6'
				}
			>
				<Container>
					<h2 className=''>{t('Envíanos un mensaje')}</h2>
					<p className='fontFamily'>
						{t('Tus comentarios son muy importantes para nosotros')}
					</p>
					<Form
						onSubmit={onSubmit}
						initialValues={{ name: '', email: '', telefono: '', texto: '' }}
						validate={validate}
						render={({ handleSubmit }) => (
							<form onSubmit={handleSubmit} className='p-fluid'>
								<h3>
									{props.consulta
										? t('Introduce tus datos para enviar tu consulta')
										: t('Introduzca sus datos para procesar la pre-reserva.')}
								</h3>
								<div className='p-field marginTop20'>
									<div className='flex'>
										<Field
											name='name'
											render={({ input, meta }) => (
												<div className='p-field p-col-12 p-md-6'>
													<span className='p-float-label'>
														<InputText
															id='name'
															{...input}
															className={
																'borderRadius2 ' +
																classNames({
																	'p-invalid':
																		isFormFieldValid(meta),
																})
															}
														/>
														<label
															htmlFor='name'
															className={classNames({
																'p-error': isFormFieldValid(meta),
															})}
														>
															{t('Nombre')}*
														</label>
													</span>
													{getFormErrorMessage(meta)}
												</div>
											)}
										/>
										<Field
											name='telefono'
											render={({ input, meta }) => (
												<div className='p-field p-col-12 p-md-6'>
													<span className='p-float-label'>
														<InputText
															id='telefono'
															{...input}
															className={
																'borderRadius2 ' +
																classNames({
																	'p-invalid':
																		isFormFieldValid(meta),
																})
															}
														/>
														<label
															htmlFor='telefono'
															className={classNames({
																'p-error': isFormFieldValid(meta),
															})}
														>
															{t('Telefono')}*
														</label>
													</span>
													{getFormErrorMessage(meta)}
												</div>
											)}
										/>
									</div>
									<div>
										<Field
											name='email'
											render={({ input, meta }) => (
												<div className='p-field  p-col-12'>
													<span className='p-float-label p-input-icon-right'>
														<i className='pi pi-envelope' />
														<InputText
															id='email'
															{...input}
															className={
																'borderRadius2 ' +
																classNames({
																	'p-invalid':
																		isFormFieldValid(meta),
																})
															}
														/>
														<label
															htmlFor='email'
															className={classNames({
																'p-error': isFormFieldValid(meta),
															})}
														>
															{t('Email')}*
														</label>
													</span>
													{getFormErrorMessage(meta)}
												</div>
											)}
										/>
									</div>
									<div>
										<Field
											name='texto'
											render={({ input, meta }) => (
												<div className='p-field  p-col-12'>
													<span className='p-float-label'>
														<InputText
															id='texto'
															{...input}
															className={
																'borderRadius2 ' +
																classNames({
																	'p-invalid':
																		isFormFieldValid(meta),
																})
															}
														/>
														<label
															htmlFor='texto'
															className={classNames({
																'p-error': isFormFieldValid(meta),
															})}
														>
															{t('Texto')}
														</label>
													</span>
													{getFormErrorMessage(meta)}
												</div>
											)}
										/>
									</div>
								</div>
								<div className='p-col-12 center text-center'>
									<div className='p-col-12 center text-center'>
										<Button
											type='submit'
											label={t('Enviar Mensaje')}
											className='p-button-rounded p-md-3'
										/>
									</div>
								</div>
							</form>
						)}
					/>
				</Container>
			</div>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setCurrentNavBarColor: (navBarColor) => dispatch(setCurrentNavBarColor(navBarColor)),
});

export default connect(null, mapDispatchToProps)(withTranslation('translations')(Mensaje));
