import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
//import pisoservice from '../service/pisoservice';
import ImageUploader from 'react-images-upload';

import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Form, Field } from 'react-final-form';
import { SelectButton } from 'primereact/selectbutton';
import { TabView, TabPanel } from 'primereact/tabview';

import { withTranslation } from 'react-i18next';

import './Adicionar.style.scss';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';

const AdicionarForm = (props) => {
	console.log(props);
	const { t } = props;

	const options = ['Yes', 'No'];
	const [activeIndex, setActiveIndex] = useState(0);
	const [pisos, setpisos] = useState(null);
	const [loadingPisos, setloadingpisos] = useState(false);
	const [pisoDialog, setpisoDialog] = useState(props.dialogVisible);
	const { piso } = props;
	// const [submitted, setSubmitted] = useState(false);
	const [images, setImages] = useState([]);
	const [cargandoImagenes, setCargandoImages] = useState(false);
	//const pisoservice = new pisoservice();

	async function SavePiso(pisoData) {
		console.log(pisoData);
		// console.log(images)
		// console.log(props.destino)
		pisoData.iddestino = props.destino.iddestino;
		// setSubmitted(true);
		setloadingpisos(true);
		let modificar = false;
		let id = 0;
		if (pisoData.nombre.trim()) {
			let _pisos = [...pisos];
			_pisos.push(pisoData);
			if (pisoData.idpiso) {
				id = pisoData.idpiso;
				modificar = true;
				delete pisoData.idpiso;
			}
			if (pisoData.imagen) {
				delete pisoData.imagen;
			}
			//let _piso = {...piso};
			const url = '/pisos';
			if (modificar) {
				console.log('asd');
				try {
					const pisoDatos = await AxiosConexionConfig.patch(url + '/' + id, pisoData);
					console.log(pisoDatos.data);
				} catch (e) {
					console.log(e);
				}
			} else {
				try {
					console.log('vvv');
					AxiosConexionConfig.post(url, pisoData).then((data) => {
						// console.log(data);
						let uri = '/imagen';
						images.forEach((imagen, index) => {
							const imagenData = {
								idpiso: data.data.idpiso,
								imagen,
								portada: index === 0 ? true : false,
							};
							AxiosConexionConfig.post(uri, imagenData).then((data) => {
								// console.log(data)
							});
						});
					});
				} catch (e) {
					console.log(e);
				}
			}
			setpisoDialog(false);

			//setpisos(_pisos);
			//setpiso(emptypiso);
		}
	}

	const initialValues = {
		// Tab2
		idpiso: piso.idpiso,
		diasReservados: piso?.diasReservados ? piso?.diasReservados : '',
		nombre: piso.nombre ? piso.nombre : '',
		latitud: piso?.latitud ? piso?.latitud : '',
		longitud: piso?.longitud ? piso?.longitud : '',
		direccion: piso?.direccion ? piso?.direccion : '',
		descripcion: piso?.descripcion ? piso?.descripcion : '',
		descripcionI: piso?.descripcionI ? piso?.descripcionI : '',
		precio: piso?.precio ? piso?.precio : '',
		canthabitaciones: piso?.canthabitaciones ? piso?.canthabitaciones : '',
		cantpersonas: piso?.cantpersonas ? piso?.cantpersonas : '',
		metroscuadrados: piso?.metroscuadrados ? piso?.metroscuadrados : '',
		cantbannos: piso?.cantbannos ? piso?.cantbannos : '',

		iddestino: piso?.iddestino ? piso?.iddestino : '',

		// Tab3
		aireacondicionado: true,
		tendederoRopa: piso?.tendederoRopa ? piso?.tendederoRopa : true,
		patioBalcon: piso?.patioBalcon ? piso?.patioBalcon : true,
		gimnasio: piso?.gimnasio ? piso?.gimnasio : true,
		productosLimpieza: piso?.productosLimpieza ? piso?.productosLimpieza : true,
		sauna: piso?.sauna ? piso?.sauna : true,
		plancha: piso?.plancha ? piso?.plancha : true,
		lavasecadora: piso?.lavasecadora ? piso?.lavasecadora : true,
		lavadora: piso?.lavadora ? piso?.lavadora : true,
		tv: piso?.tv ? piso?.tv : true,
		piscina: piso?.piscina ? piso?.piscina : true,
		cocina: piso?.cocina ? piso?.cocina : true,
		jacuzzi: piso?.jacuzzi ? piso?.jacuzzi : true,
		secadorPelo: piso?.secadorPelo ? piso?.secadorPelo : true,
		utensiliosCocina: piso?.utensiliosCocina ? piso?.utensiliosCocina : true,
		zonaTrabajar: piso?.zonaTrabajar ? piso?.zonaTrabajar : true,
		platosCubiertos: piso?.platosCubiertos ? piso?.platosCubiertos : true,

		wifi: true,
		tvcable: true,

		calefaccion: true,

		// Tab4
		serviciosAdicionales: piso?.serviciosAdicionales ? piso?.serviciosAdicionales : '',
		estacionamientoInstalaciones: piso?.estacionamientoInstalaciones
			? piso?.estacionamientoInstalaciones
			: '',
		cocinaComedor: piso?.cocinaComedor ? piso?.cocinaComedor : '',
		internetOficina: piso?.internetOficina ? piso?.internetOficina : '',
		seguridadHogar: piso?.seguridadHogar ? piso?.seguridadHogar : '',
		calefaccionRefrigeracion: piso?.calefaccionRefrigeracion
			? piso?.calefaccionRefrigeracion
			: '',
		entretenimiento: piso?.entretenimiento ? piso?.entretenimiento : '',
		paraFamilias: piso?.paraFamilias ? piso?.paraFamilias : '',
		dormitorio: piso?.dormitorio ? piso?.dormitorio : '',
		banno: piso?.banno ? piso?.banno : '',
	};

	const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
	const getFormErrorMessage = (meta) => {
		return isFormFieldValid(meta) && <small className='p-error'>{meta.error}</small>;
	};

	const onSubmit = (data, form) => {
		console.log(data);
		setpisoDialog(false);
		// console.log(images)
		SavePiso(data);
		form.restart();
	};
	const validate = (data) => {
		//console.log(images)
		let errors = {};
		if (!data.nombre || data.nombre === '') {
			errors.nombre = 'Nombre is required.';
		}
		if (!data.descripcion || data.descripcion === '') {
			errors.descripcion = 'descripcion is required.';
		}
		if (!data.latitud || data.latitud === '') {
			errors.latitud = 'latitud is required.';
		}
		if (!data.longitud || data.longitud === '') {
			errors.longitud = 'longitud is required.';
		}
		if (!data.cantpersonas || data.cantpersonas === '') {
			errors.cantpersonas = 'cantpersonas is required.';
		}
		if (!data.metroscuadrados || data.metroscuadrados === '') {
			errors.metroscuadrados = 'metroscuadrados is required.';
		}
		if (!data.canthabitaciones || data.canthabitaciones === '') {
			errors.canthabitaciones = 'canthabitaciones is required.';
		}
		if (!data.cantbannos || data.cantbannos === '') {
			errors.cantbannos = 'cantbannos is required.';
		}
		if (!data.precio || data.precio === '') {
			errors.precio = 'precio is required.';
		}
		if (!data.cantbannos || data.cantbannos === '') {
			errors.cantbannos = 'cantbannos is required.';
		}
		if (!data.cantbannos || data.cantbannos === '') {
			errors.cantbannos = 'cantbannos is required.';
		}
		/*else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }*/
		console.log(data);
		console.log(errors);
		return errors;
	};

	const fieldTextComponent = (campo, texto, visib) => (
		<div style={{ display: visib ? 'none' : 'line' }}>
			<Field
				name={campo}
				render={({ input, meta }) => (
					<div className='p-field'>
						<span className='p-float-label'>
							<InputText
								id={campo}
								{...input}
								autoFocus
								className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
							/>
							<label
								htmlFor={campo}
								className={classNames({
									'p-error': isFormFieldValid('canthabitaciones'),
								})}
							>
								{texto}*
							</label>
						</span>
						{getFormErrorMessage(campo)}
					</div>
				)}
			/>
		</div>
	);
	const fieldNumberComponent = (campo, texto) => (
		<div className='p-col-12 p-md-4'>
			<Field
				name={campo}
				render={({ input, meta }) => (
					<div className='p-field'>
						<span className='p-float-label'>
							<InputNumber
								id={campo}
								value={input.value}
								onValueChange={(e) => input.onChange(e.value)}
								autoFocus
								className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
							/>
							<label
								htmlFor={campo}
								className={classNames({
									'p-error': isFormFieldValid('canthabitaciones'),
								})}
							>
								{texto}*
							</label>
						</span>
						{getFormErrorMessage(campo)}
					</div>
				)}
			/>
		</div>
	);

	function onDrop(picture) {
		setCargandoImages(true);
		setImages([]);
		let peticiones = [];
		picture.forEach((file, index) => {
			peticiones.push(getBase64(file));
		});
		Promise.all(peticiones).then((imagens) => {
			setCargandoImages(false);
			let response = [];
			imagens.forEach((imgn) => {
				response.push(imgn.split('data:image/jpeg;base64,')[1]);
			});
			setImages(response);
		});
	}

	const getBase64 = (file) => {
		let img = [];
		return new Promise((resolve) => {
			let baseURL = '';
			// Make new FileReader
			let reader = new FileReader();

			// Convert the file to base64 text
			reader.readAsDataURL(file);

			// on reader load somthing...
			reader.onload = () => {
				// Make a fileInfo Object
				//console.log("Called", reader);
				baseURL = reader.result;
				img.push(baseURL);
				//console.log(baseURL);
				resolve(baseURL);
			};
			//console.log(fileInfo);
		});
	};

	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			validate={validate}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit} className='p-fluid'>
					<TabView activeIndex={activeIndex} renderActiveOnly={false}>
						<TabPanel header='Imagenes'>
							<ImageUploader
								withIcon={true}
								withPreview={true}
								buttonText='Choose images'
								onChange={onDrop}
								imgExtension={['.jpg', '.gif', '.png', '.gif']}
								maxFileSize={5242880}
							/>
						</TabPanel>
						<TabPanel header='Header II'>
							<div className='flexWrap p-col-12'>
								<div className='p-col-12 p-md-4'>
									<Field
										name='nombre'
										render={({ input, meta }) => (
											<div className='p-field'>
												<span className='p-float-label'>
													<InputText
														id='nombre'
														{...input}
														autoFocus
														className={classNames({
															'p-invalid': isFormFieldValid(meta),
														})}
													/>
													<label
														htmlFor='nombre'
														className={classNames({
															'p-error': isFormFieldValid(meta),
														})}
													>
														Nombre*
													</label>
												</span>
												{getFormErrorMessage(meta)}
											</div>
										)}
									/>
								</div>
								<div className='p-col-12 p-md-4'>
									{fieldTextComponent('latitud', 'latitud', false)}
								</div>
								<div className='p-col-12 p-md-4'>
									{fieldTextComponent('longitud', 'longitud', false)}
								</div>
								{fieldTextComponent('idpiso', 'idpiso', true)}
								{fieldTextComponent('diasReservados', 'diasReservados', true)}
							</div>
							{fieldTextComponent('direccion', 'direccion', false)}
							{fieldTextComponent('descripcion', 'descripcion', false)}
							{fieldTextComponent('descripcionI', 'descripcionI', false)}
							<div className='flexWrap p-col-12'>
								{fieldNumberComponent('precio', 'precio', false)}
								{fieldNumberComponent(
									'canthabitaciones',
									'canthabitaciones',
									false
								)}
								{fieldNumberComponent('cantpersonas', 'cantpersonas', false)}
								{fieldNumberComponent('metroscuadrados', 'metroscuadrados', false)}
								{fieldNumberComponent('cantbannos', 'cantbannos', false)}
							</div>
						</TabPanel>

						<TabPanel header='Header III'>
							{fieldTextComponent(
								'serviciosAdicionales',
								'serviciosAdicionales',
								false
							)}
							{fieldTextComponent(
								'estacionamientoInstalaciones',
								'estacionamientoInstalaciones',
								false
							)}
							{fieldTextComponent('cocinaComedor', 'cocinaComedor', false)}
							{fieldTextComponent('internetOficina', 'internetOficina', false)}
							{fieldTextComponent('seguridadHogar', 'seguridadHogar', false)}
							{fieldTextComponent(
								'calefaccionRefrigeracion',
								'calefaccionRefrigeracion',
								false
							)}
							{fieldTextComponent('entretenimiento', 'entretenimiento', false)}
							{fieldTextComponent('paraFamilias', 'paraFamilias', false)}
							{fieldTextComponent('dormitorio', 'dormitorio', false)}
							{fieldTextComponent('banno', 'banno', false)}
						</TabPanel>
					</TabView>
					<Button
						type='submit'
						label='Submit'
						disabled={cargandoImagenes}
						className='p-button-text'
					/>
				</form>
			)}
		/>
	);
};
export default withTranslation('translations')(AdicionarForm);
