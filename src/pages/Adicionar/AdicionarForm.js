import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
//import pisoservice from '../service/pisoservice';
import ImageUploader from 'react-images-upload';

import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Form, Field } from 'react-final-form';
import { AutoComplete } from 'primereact/autocomplete';

import { withTranslation } from 'react-i18next';

import './Adicionar.style.scss';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import cargando from '../../assets/img/loading.gif';
import servicios from '../../configuracion/servicios.json';
import { amenitiesGeneralesConst } from 'configuracion/constantes';
import { amenitiesGeneralesTextConst } from 'configuracion/constantes';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';

const AdicionarForm = (props) => {
	const [savingPisos, setSavingPisos] = useState(false);
	const { piso } = props;
	const [images, setImages] = useState([]);
	const [cargandoImagenes, setCargandoImages] = useState(false);
	const { t } = props;
	const [serviciosAdicionales, setserviciosAdicionales] = useState([]);
	const [selectedserviciosAdicionales, setSelectedserviciosAdicionales] = useState(null);
	const [filteredserviciosAdicionales, setFilteredserviciosAdicionales] = useState(null);

	const [cocinaComedor, setCocinaComedor] = useState([]);
	const [selectedCocinaComedor, setSelectedCocinaComedor] = useState(null);
	const [filteredCocinaComedor, setFilteredCocinaComedor] = useState(null);

	const [estacionamientoInstalaciones, setEstacionamientoInstalaciones] = useState([]);
	const [selectedEstacionamientoInstalaciones, setSelectedEstacionamientoInstalaciones] =
		useState(null);
	const [filteredEstacionamientoInstalaciones, setFilteredEstacionamientoInstalaciones] =
		useState(null);

	const [internetOficina, setinternetOficina] = useState([]);
	const [selectedinternetOficina, setSelectedinternetOficina] = useState(null);
	const [filteredinternetOficina, setFilteredinternetOficina] = useState(null);

	const [seguridadHogar, setseguridadHogar] = useState([]);
	const [selectedseguridadHogar, setSelectedseguridadHogar] = useState(null);
	const [filteredseguridadHogar, setFilteredseguridadHogar] = useState(null);

	const [calefaccionRefrigeracion, setcalefaccionRefrigeracion] = useState([]);
	const [selectedcalefaccionRefrigeracion, setSelectedcalefaccionRefrigeracion] = useState(null);
	const [filteredcalefaccionRefrigeracion, setFilteredcalefaccionRefrigeracion] = useState(null);

	const [paraFamilias, setparaFamilias] = useState([]);
	const [selectedparaFamilias, setSelectedparaFamilias] = useState(null);
	const [filteredparaFamilias, setFilteredparaFamilias] = useState(null);

	const [entretenimiento, setentretenimiento] = useState([]);
	const [selectedentretenimiento, setSelectedentretenimiento] = useState(null);
	const [filteredentretenimiento, setFilteredentretenimiento] = useState(null);

	const [Dormitorio, setDormitorio] = useState([]);
	const [selectedDormitorio, setSelectedDormitorio] = useState(null);
	const [filteredDormitorio, setFilteredDormitorio] = useState(null);

	const [banno, setbanno] = useState([]);
	const [selectedbanno, setSelectedbanno] = useState(null);
	const [filteredbanno, setFilteredbanno] = useState(null);

	const currencies = [
		{ label: 'Us Dolar', value: 'USD' },
		{ label: 'Peso Argentino', value: 'PA' },
		{ label: 'Euro', value: 'EU' },
	];

	const serviciosFilter = (listText, listObject) => {
		let fil = [];
		listText.forEach((text) => {
			fil.push(
				listObject.filter((country) => {
					return country.name.toLowerCase().startsWith(text.toLowerCase());
				})[0]
			);
		});
		return fil;
	};
	useEffect(() => {
		setserviciosAdicionales(servicios.serviciosAdicionales);
		setCocinaComedor(servicios.cocinaComedor);
		setEstacionamientoInstalaciones(servicios.estacionamientoInstalaciones);
		setinternetOficina(servicios.internetOficina);
		setseguridadHogar(servicios.seguridadHogar);
		setcalefaccionRefrigeracion(servicios.calefaccionRefrigeracion);
		setparaFamilias(servicios.paraFamilias);
		setentretenimiento(servicios.entretenimiento);
		setDormitorio(servicios.dormitorio);
		setbanno(servicios.banno);
		setSelectedserviciosAdicionales(
			piso?.serviciosAdicionales?.length > 0
				? serviciosFilter(
						piso.serviciosAdicionales.split(','),
						servicios.serviciosAdicionales
				  )
				: null
		);
		setSelectedCocinaComedor(
			piso?.cocinaComedor?.length > 0
				? serviciosFilter(piso.cocinaComedor.split(','), servicios.cocinaComedor)
				: null
		);
		setSelectedEstacionamientoInstalaciones(
			piso?.estacionamientoInstalaciones?.length > 0
				? serviciosFilter(
						piso.estacionamientoInstalaciones.split(','),
						servicios.estacionamientoInstalaciones
				  )
				: null
		);
		setSelectedinternetOficina(
			piso?.internetOficina?.length > 0
				? serviciosFilter(piso.internetOficina.split(','), servicios.internetOficina)
				: null
		);
		setSelectedseguridadHogar(
			piso?.seguridadHogar?.length > 0
				? serviciosFilter(piso.seguridadHogar.split(','), servicios.seguridadHogar)
				: null
		);
		setSelectedcalefaccionRefrigeracion(
			piso?.calefaccionRefrigeracion?.length > 0
				? serviciosFilter(
						piso.calefaccionRefrigeracion.split(','),
						servicios.calefaccionRefrigeracion
				  )
				: null
		);
		setSelectedparaFamilias(
			piso?.paraFamilias?.length > 0
				? serviciosFilter(piso.paraFamilias.split(','), servicios.paraFamilias)
				: null
		);
		setSelectedentretenimiento(
			piso?.entretenimiento?.length > 0
				? serviciosFilter(piso.entretenimiento.split(','), servicios.entretenimiento)
				: null
		);
		setSelectedDormitorio(
			piso?.dormitorio?.length > 0
				? serviciosFilter(piso.dormitorio.split(','), servicios.dormitorio)
				: null
		);
		setSelectedbanno(
			piso?.banno?.length > 0 ? serviciosFilter(piso.banno.split(','), servicios.banno) : null
		);
	}, []);

	async function SavePiso(pisoData) {
		pisoData.cocinaComedor = selectedCocinaComedor
			? selectedCocinaComedor.map((v) => v.name).join(',')
			: '';
		pisoData.entretenimiento = selectedentretenimiento
			? selectedentretenimiento.map((v) => v.name).join(',')
			: '';
		pisoData.paraFamilias = selectedparaFamilias
			? selectedparaFamilias.map((v) => v.name).join(',')
			: '';
		pisoData.dormitorio = selectedDormitorio
			? selectedDormitorio.map((v) => v.name).join(',')
			: '';
		pisoData.banno = selectedbanno ? selectedbanno.map((v) => v.name).join(',') : '';
		pisoData.calefaccionRefrigeracion = selectedcalefaccionRefrigeracion
			? selectedcalefaccionRefrigeracion.map((v) => v.name).join(',')
			: '';
		pisoData.seguridadHogar = selectedseguridadHogar
			? selectedseguridadHogar.map((v) => v.name).join(',')
			: '';
		pisoData.internetOficina = selectedinternetOficina
			? selectedinternetOficina.map((v) => v.name).join(',')
			: '';
		pisoData.estacionamientoInstalaciones = selectedEstacionamientoInstalaciones
			? selectedEstacionamientoInstalaciones.map((v) => v.name).join(',')
			: '';
		pisoData.serviciosAdicionales = selectedserviciosAdicionales
			? selectedserviciosAdicionales.map((v) => v.name).join(',')
			: '';
		pisoData.iddestino = props.destino.iddestino;
		pisoData.longitud = pisoData.longitud.toString();
		pisoData.latitud = pisoData.latitud.toString();
		setSavingPisos(true);
		let modificar = false;
		let id = 0;
		if (pisoData.nombre.trim()) {
			if (pisoData.idpiso) {
				id = pisoData.idpiso;
				modificar = true;
				delete pisoData.idpiso;
			}
			if (pisoData.imagen) {
				delete pisoData.imagen;
			}
			const url = '/pisos';
			if (modificar) {
				try {
					const pisoDatos = await AxiosConexionConfig.patch(url + '/' + id, pisoData);
					props.getPiso();
					props.setpisoDialog(false);
				} catch (e) {
					console.log(e);
					props.setpisoDialog(false);
				}
			} else {
				try {
					console.log('crear');
					AxiosConexionConfig.post(url, pisoData).then((data) => {
						console.log(images);
						const { idpiso } = data.data;
						saveImages(idpiso, images, true);
					});
				} catch (e) {
					console.log(e);
					setSavingPisos(false);
					props.setpisoDialog(false);
				}
			}
		}
	}

	const saveImages = (idpiso, imagenesArray, portada) => {
		let uri = '/imagen';
		const imagenData = {
			idpiso,
			imagen: imagenesArray[0],
			portada,
		};
		AxiosConexionConfig.post(uri, imagenData)
			.then((data) => {
				console.log(data);
				imagenesArray.splice(0, 1);
				console.log(imagenesArray.length);
				if (imagenesArray.length > 0) {
					saveImages(idpiso, imagenesArray, false);
				} else {
					setSavingPisos(false);
					props.getPiso();
					props.setpisoDialog(false);
				}
			})
			.catch((e) => console.log(e));
	};

	const initialValues = {
		// Tab2
		idpiso: piso.idpiso,
		diasReservados: piso?.diasReservados || '',
		nombre: piso.nombre || '',
		nombreI: piso.nombreI || '',
		latitud: piso?.latitud || '',
		longitud: piso?.longitud || '',
		direccion: piso?.direccion || '',
		descripcion: piso?.descripcion || '',
		descripcionI: piso?.descripcionI || '',
		precio: piso?.precio || '',
		moneda: piso?.moneda || '',
		canthabitaciones: piso?.canthabitaciones || '',
		cantpersonas: piso?.cantpersonas || '',
		metroscuadrados: piso?.metroscuadrados || '',
		cantbannos: piso?.cantbannos || '',

		iddestino: piso?.iddestino || '',

		// Tab3
		aireacondicionado: piso?.aireacondicionado || false,
		gimnasio: piso?.gimnasio || false,
		lavasecadora: piso?.lavasecadora || false,
		lavadora: piso?.lavadora || false,
		tv: piso?.tv || false,
		jacuzzi: piso?.jacuzzi || false,
		wifi: piso?.wifi || false,
		calefaccion: piso?.calefaccion || false,
		pool:piso?.pool || false,
		barbecue:piso?.barbecue || false,
		// Tab4
		serviciosAdicionales: piso?.serviciosAdicionales || '',
		estacionamientoInstalaciones: piso?.estacionamientoInstalaciones || '',
		cocinaComedor: piso?.cocinaComedor || '',
		internetOficina: piso?.internetOficina || '',
		seguridadHogar: piso?.seguridadHogar || '',
		calefaccionRefrigeracion: piso?.calefaccionRefrigeracion || '',
		entretenimiento: piso?.entretenimiento || '',
		paraFamilias: piso?.paraFamilias || '',
		dormitorio: piso?.dormitorio || '',
		banno: piso?.banno || '',
		serviciosAdicionales: piso.serviciosAdicionales || '',
	};

	const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
	const getFormErrorMessage = (meta) => {
		return isFormFieldValid(meta) && <small className='p-error'>{meta.error}</small>;
	};

	const onSubmit = (data, form) => {
		console.log(data)
		SavePiso(data);
		form.restart();
	};
	const validate = (data) => {
		console.log(data);
		let errors = {};
		if (!data.moneda || data.moneda === '') {
			errors.moneda = t('Moneda es requerido.');
		}
		if (!data.nombre || data.nombre === '') {
			errors.nombre = t('Nombre es requerido.');
		}
		if (!data.nombreI || data.nombreI === '') {
			errors.nombreI = t('Nombre en Inglés es requerido.');
		}
		if (!data.descripcion || data.descripcion === '') {
			errors.descripcion = t('La descripción es requerida.');
		}
		if (!data.direccion || data.direccion === '') {
			errors.direccion = t('La dirección es requerida.');
		}
		if (!data.descripcionI || data.descripcionI === '') {
			errors.descripcionI = t('La descripción en inglés es requerida.');
		}
		if (!data.latitud || data.latitud === '') {
			errors.latitud = t('Latitud requerida.');
		} else if (data.latitud > 180 || data.latitud < -180) {
			errors.latitud = t('Valor permitido entre 180 y -180.');
		}
		if (!data.longitud || data.longitud === '') {
			errors.longitud = t('Longitud requerida.');
		} else if (data.longitud > 90 || data.longitud < -90) {
			errors.longitud = t('Valor permitido entre 90 y -90.');
		}
		if (!data.cantpersonas || data.cantpersonas === '') {
			errors.cantpersonas = t('Cant de personas es requerida.');
		}
		if (!data.metroscuadrados || data.metroscuadrados === '') {
			errors.metroscuadrados = t('Metros cuadrados es requerido.');
		}		
		if (!data.cantbannos || data.cantbannos === '') {
			errors.cantbannos = t('Cant de baños es requerido.');
		}
		if (!data.precio || data.precio === '') {
			errors.precio = t('precio es requerido.');
		}
		return errors;
	};

	const fieldTextComponent = (campo, texto, visib) => (
		<div style={{ display: visib ? 'none' : 'line' }} className='p-col-12'>
			<Field
				name={campo}
				render={({ input, meta }) => (
					<div className='p-field'>
						<label
							htmlFor={campo}
							className={classNames({
								'p-error': isFormFieldValid(meta),
							})}
						>
							{texto}*
						</label>
						<InputText
							id={campo}
							{...input}
							className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
						/>
						{getFormErrorMessage(meta)}
					</div>
				)}
			/>
		</div>
	);
	const fieldEditorComponent = (campo, texto) => (
		<div className='p-col-12'>
			<Field
				name={campo}
				render={({ input, meta }) => (
					<div className='p-field'>
						<label
							htmlFor={campo}
							className={classNames({
								'p-error': isFormFieldValid(meta),
							})}
						>
							{texto}*
						</label>
						<Editor
							id={campo}
							{...input}
							style={{ height: '320px' }}
							onTextChange={(e) => input.onChange(e.htmlValue)}
							className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
						/>
						{getFormErrorMessage(meta)}
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
						<label
							htmlFor={campo}
							className={classNames({
								'p-error': isFormFieldValid(meta),
							})}
						>
							{texto}*
						</label>
						<InputNumber
							id={campo}
							value={input.value}
							showButtons
							min={0}
							onValueChange={(e) => input.onChange(e.value)}
							className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
						/>

						{getFormErrorMessage(meta)}
					</div>
				)}
			/>
		</div>
	);
	const fieldLatLongComponent = (campo, texto) => (
		<div className='p-col-12 p-md-3	'>
			<Field
				name={campo}
				render={({ input, meta }) => (
					<div className='p-field'>
						<label
							htmlFor={campo}
							className={classNames({
								'p-error': isFormFieldValid(meta),
							})}
						>
							{texto}*
						</label>
						<InputNumber
							id={campo}
							value={input.value}
							mode='decimal'
							minFractionDigits={2}
							maxFractionDigits={7}
							onValueChange={(e) => input.onChange(e.value)}
							className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
						/>

						{getFormErrorMessage(meta)}
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
				baseURL = reader.result;
				img.push(baseURL);
				resolve(baseURL);
			};
		});
	};

	const searchserviciosAdicionales = (event) => {
		setTimeout(() => {
			let _filteredCountries;
			if (!event.query.trim().length) {
				_filteredCountries = [...serviciosAdicionales];
			} else {
				_filteredCountries = serviciosAdicionales.filter((country) => {
					return country.name.toLowerCase().startsWith(event.query.toLowerCase());
				});
			}

			setFilteredserviciosAdicionales(_filteredCountries);
		}, 250);
	};

	const searchCocinaComedor = (event) => {
		setTimeout(() => {
			let _filteredCountries;
			if (!event.query.trim().length) {
				_filteredCountries = [...cocinaComedor];
			} else {
				_filteredCountries = cocinaComedor.filter((country) => {
					return country.name.toLowerCase().startsWith(event.query.toLowerCase());
				});
			}

			setFilteredCocinaComedor(_filteredCountries);
		}, 250);
	};

	const searchEstacionamientoInstalaciones = (event) => {
		setTimeout(() => {
			let _filteredCountries;
			if (!event.query.trim().length) {
				_filteredCountries = [...estacionamientoInstalaciones];
			} else {
				_filteredCountries = estacionamientoInstalaciones.filter((country) => {
					return country.name.toLowerCase().startsWith(event.query.toLowerCase());
				});
			}
			setFilteredEstacionamientoInstalaciones(_filteredCountries);
		}, 250);
	};

	const searchbanno = (event) => {
		setTimeout(() => {
			let _filteredCountries;
			if (!event.query.trim().length) {
				_filteredCountries = [...banno];
			} else {
				_filteredCountries = banno.filter((country) => {
					return country.name.toLowerCase().startsWith(event.query.toLowerCase());
				});
			}
			setFilteredbanno(_filteredCountries);
		}, 250);
	};

	const searchDormitorio = (event) => {
		setTimeout(() => {
			let _filteredCountries;
			if (!event.query.trim().length) {
				_filteredCountries = [...Dormitorio];
			} else {
				_filteredCountries = Dormitorio.filter((country) => {
					return country.name.toLowerCase().startsWith(event.query.toLowerCase());
				});
			}
			setFilteredDormitorio(_filteredCountries);
		}, 250);
	};

	const searchentretenimiento = (event) => {
		setTimeout(() => {
			let _filteredCountries;
			if (!event.query.trim().length) {
				_filteredCountries = [...entretenimiento];
			} else {
				_filteredCountries = entretenimiento.filter((country) => {
					return country.name.toLowerCase().startsWith(event.query.toLowerCase());
				});
			}
			setFilteredentretenimiento(_filteredCountries);
		}, 250);
	};

	const searchparaFamilias = (event) => {
		setTimeout(() => {
			let _filteredCountries;
			if (!event.query.trim().length) {
				_filteredCountries = [...paraFamilias];
			} else {
				_filteredCountries = paraFamilias.filter((country) => {
					return country.name.toLowerCase().startsWith(event.query.toLowerCase());
				});
			}
			setFilteredparaFamilias(_filteredCountries);
		}, 250);
	};

	const searchcalefaccionRefrigeracion = (event) => {
		setTimeout(() => {
			let _filteredCountries;
			if (!event.query.trim().length) {
				_filteredCountries = [...calefaccionRefrigeracion];
			} else {
				_filteredCountries = calefaccionRefrigeracion.filter((country) => {
					return country.name.toLowerCase().startsWith(event.query.toLowerCase());
				});
			}
			setFilteredcalefaccionRefrigeracion(_filteredCountries);
		}, 250);
	};

	const searchseguridadHogar = (event) => {
		setTimeout(() => {
			let _filteredCountries;
			if (!event.query.trim().length) {
				_filteredCountries = [...seguridadHogar];
			} else {
				_filteredCountries = seguridadHogar.filter((country) => {
					return country.name.toLowerCase().startsWith(event.query.toLowerCase());
				});
			}
			setFilteredseguridadHogar(_filteredCountries);
		}, 250);
	};
	const searchinternetOficina = (event) => {
		setTimeout(() => {
			let _filteredCountries;
			if (!event.query.trim().length) {
				_filteredCountries = [...internetOficina];
			} else {
				_filteredCountries = internetOficina.filter((country) => {
					return country.name.toLowerCase().startsWith(event.query.toLowerCase());
				});
			}
			setFilteredinternetOficina(_filteredCountries);
		}, 250);
	};

	const autocompleteElement = (text, valores, SetValores, valoresFiltrados, metodoCompletar) => (
		<div className='p-col-12 p-md-4'>
			<span className='p-fluid'>
				<h5>{text}</h5>
				<AutoComplete
					value={valores}
					suggestions={valoresFiltrados}
					completeMethod={metodoCompletar}
					field='name'
					multiple
					dropdown
					onChange={(e) => SetValores(e.value)}
				/>
			</span>
		</div>
	);

	const autocompleteElement100 = (
		text,
		valores,
		SetValores,
		valoresFiltrados,
		metodoCompletar
	) => (
		<div className='p-col-12'>
			<span className='p-fluid'>
				<h5>{text}</h5>
				<AutoComplete
					value={valores}
					suggestions={valoresFiltrados}
					completeMethod={metodoCompletar}
					field='name'
					multiple
					dropdown
					onChange={(e) => SetValores(e.value)}
				/>
			</span>
		</div>
	);

	const elementoCheck = (name, text) => {
		return (
			<div className='p-col-12 p-md-3 floatLeft'>
				<Field
					name={name}
					type='checkbox'
					render={({ input, meta }) => (
						<div className='p-field-checkbox'>
							<Checkbox
								inputId={name}
								{...input}
								className={classNames({
									'p-invalid': isFormFieldValid(meta),
								})}
							/>
							<label
								htmlFor={name}
								className={classNames({
									'p-error': isFormFieldValid(meta),
								})}
							>
								{text}
							</label>
						</div>
					)}
				/>
			</div>
		);
	};

	return (
		<>
			{!savingPisos ? (
				<Form
					onSubmit={onSubmit}
					initialValues={initialValues}
					validate={validate}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit} className='p-fluid'>
							<ImageUploader
								withIcon={true}
								withPreview={true}
								buttonText='Choose images'
								onChange={onDrop}
								imgExtension={['.jpg', '.gif', '.png', '.gif']}
								maxFileSize={5242880}
							/>
							<div className='flexWrap p-col-12'>
								<div className='p-col-12 p-md-4 p-p-3'>
									<Field
										name='nombre'
										render={({ input, meta }) => (
											<div className='p-field'>
												<label
													htmlFor='nombre'
													className={classNames({
														'p-error': isFormFieldValid(meta),
													})}
												>
													Nombre*
												</label>
												<InputText
													id='nombre'
													{...input}
													className={classNames({
														'p-invalid': isFormFieldValid(meta),
													})}
												/>
												{getFormErrorMessage(meta)}
											</div>
										)}
									/>
								</div>
								<div className='p-col-12 p-md-4 p-p-3'>
									<Field
										name='nombreI'
										render={({ input, meta }) => (
											<div className='p-field'>
												<label
													htmlFor='nombreI'
													className={classNames({
														'p-error': isFormFieldValid(meta),
													})}
												>
													Nombre en Inglés*
												</label>
												<InputText
													id='nombreI'
													{...input}
													className={classNames({
														'p-invalid': isFormFieldValid(meta),
													})}
												/>
												{getFormErrorMessage(meta)}
											</div>
										)}
									/>
								</div>
								{fieldLatLongComponent('latitud', 'Latitud')}
								{fieldLatLongComponent('longitud', 'Longitud')}
								<div className='p-col-12 p-md-2'>
									<Field
										name='moneda'
										render={({ input, meta }) => (
											<div className='p-field'>
												<label
													htmlFor='moneda'
													className={classNames({
														'p-error': isFormFieldValid(meta),
													})}
												>
													Moneda*
												</label>
												<Dropdown
													id='moneda'
													{...input}
													options={currencies}
													optionLabel='label'
													className={classNames({
														'p-invalid': isFormFieldValid(meta),
													})}
												/>

												{getFormErrorMessage(meta)}
											</div>
										)}
									/>
								</div>
							</div>
							{fieldTextComponent('idpiso', 'idpiso', true)}
							{fieldTextComponent('diasReservados', 'diasReservados', true)}

							{fieldTextComponent('direccion', 'Dirección', false)}
							{fieldEditorComponent('descripcion', 'Descripción')}
							{fieldEditorComponent('descripcionI', 'Description(Inglés)')}
							<div className='flexWrap p-col-12'>
								{fieldNumberComponent('precio', 'Precio', false)}
								{fieldNumberComponent(
									'canthabitaciones',
									'canthabitaciones',
									false
								)}
								{fieldNumberComponent('cantpersonas', 'Cant. personas', false)}
								{fieldNumberComponent('metroscuadrados', 'Metros cuadrados', false)}
								{fieldNumberComponent('cantbannos', 'Cant bannos', false)}
							</div>
							<div className='p-col-12 p-d-flex p-flex-column p-flex-md-row '>
								{elementoCheck('wifi', 'Wifi')}
								{elementoCheck('tv', 'tv')}
								{elementoCheck('gimnasio', 'Gimnasio')}
								{elementoCheck('lavasecadora', 'Lavadora/Secadora')}
							</div>
							<div className='p-col-12 p-d-flex p-flex-column p-flex-md-row '>
								{elementoCheck('calefaccion', 'Calefaccion')}
								{elementoCheck('lavadora', 'Lavadora')}
								{elementoCheck('jacuzzi', 'Jacuzzi')}
								{elementoCheck('aireacondicionado', 'Aire Acondicionado')}
							</div>
							<div className='p-col-12 p-d-flex p-flex-column p-flex-md-row '>
								{elementoCheck('pool', 'Piscina')}
								{elementoCheck('barbecue', 'Barbecue')}
								
							</div>

							<div className='p-d-flex p-flex-column p-flex-md-row'>
								{autocompleteElement(
									'Servicios Adicionales',
									selectedserviciosAdicionales,
									setSelectedserviciosAdicionales,
									filteredserviciosAdicionales,
									searchserviciosAdicionales
								)}

								{autocompleteElement(
									'Cocina y comedor',
									selectedCocinaComedor,
									setSelectedCocinaComedor,
									filteredCocinaComedor,
									searchCocinaComedor
								)}
								{autocompleteElement(
									'Estacionamiento e instalaciones',
									selectedEstacionamientoInstalaciones,
									setSelectedEstacionamientoInstalaciones,
									filteredEstacionamientoInstalaciones,
									searchEstacionamientoInstalaciones
								)}
							</div>
							<div className='p-d-flex p-flex-column p-flex-md-row'>
								{autocompleteElement(
									'Baño',
									selectedbanno,
									setSelectedbanno,
									filteredbanno,
									searchbanno
								)}
								{autocompleteElement(
									'Internet y oficina',
									selectedinternetOficina,
									setSelectedinternetOficina,
									filteredinternetOficina,
									searchinternetOficina
								)}
								{autocompleteElement(
									'Entretenimiento',
									selectedentretenimiento,
									setSelectedentretenimiento,
									filteredentretenimiento,
									searchentretenimiento
								)}
							</div>

							<div className='p-d-flex p-flex-column p-flex-md-row'>
								{autocompleteElement(
									'para Familias',
									selectedparaFamilias,
									setSelectedparaFamilias,
									filteredparaFamilias,
									searchparaFamilias
								)}
								{autocompleteElement(
									'Calefacción y refrigeración',
									selectedcalefaccionRefrigeracion,
									setSelectedcalefaccionRefrigeracion,
									filteredcalefaccionRefrigeracion,
									searchcalefaccionRefrigeracion
								)}
								{autocompleteElement(
									'Seguridad Hogar',
									selectedseguridadHogar,
									setSelectedseguridadHogar,
									filteredseguridadHogar,
									searchseguridadHogar
								)}
							</div>
							<div>
								{autocompleteElement100(
									'Dormitorio',
									selectedDormitorio,
									setSelectedDormitorio,
									filteredDormitorio,
									searchDormitorio
								)}
							</div>
							<Button
								type='submit'
								label='Submit'
								disabled={cargandoImagenes}
								className='p-button-text'
							/>
						</form>
					)}
				/>
			) : (
				<div className='p-col-12 p-text-center'>
					<img src={cargando} alt='cargando' />
				</div>
			)}
		</>
	);
};
export default withTranslation('translations')(AdicionarForm);
