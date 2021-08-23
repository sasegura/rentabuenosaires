import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Form, Field } from 'react-final-form';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

const DialogDemo = ({ open, setOpen, valor, setValor, acept, t }, props) => {
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

	const onSubmit = (data, form) => {
		setOpen(false);
		setValor(data);
		acept(true);
		form.restart();
	};

	const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
	const getFormErrorMessage = (meta) => {
		return isFormFieldValid(meta) && <small className='p-error'>{meta.error}</small>;
	};

	return (
		<div className='dialog-demo'>
			<div className='card'>
				<Form
					onSubmit={onSubmit}
					initialValues={{ name: '', email: '', telefono: '', texto: '' }}
					validate={validate}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit} className='p-fluid'>
							<Dialog
								header={t('Pre-reserva')}
								visible={open}
								style={{ width: '50vw' }}
								onHide={() => setOpen(false)}
								footer={
									<div>
										<Button
											label={t('Cancelar')}
											icon='pi pi-times'
											onClick={() => setOpen(false)}
											className=''
										/>
										<Button
											type='submit'
											label={t('Submit')}
											icon='pi pi-check'
											className='p-button-text nocolor'
											onClick={() => handleSubmit()}
										/>
									</div>
								}
							>
								<h3>{t('Introduzca sus datos para procesar la pre-reserva.')}</h3>
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
															autoFocus
															className={
																'p-col-12 ' +
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
															autoFocus
															className={
																'p-col-12 ' +
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
													<span className='p-float-label p-input-icon-right p-col-12 '>
														<i className='pi pi-envelope' />
														<InputText
															id='email'
															{...input}
															className={
																'p-col-12 ' +
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
															autoFocus
															className={
																'p-col-12 ' +
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
								<h4>{t('No se aplicará ningún cargo.')}</h4>
							</Dialog>
						</form>
					)}
				/>
			</div>
		</div>
	);
};
export default withTranslation('translations')(DialogDemo);
