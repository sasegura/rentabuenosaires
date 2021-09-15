import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
//import pisoservice from '../service/pisoservice';
import ImageUploader from 'react-images-upload';

import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
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

const AdicionarForm = (props) => {
	const [savingPisos, setSavingPisos] = useState(false);
	const { piso } = props;
	const [images, setImages] = useState([]);
	const [cargandoImagenes, setCargandoImages] = useState(false);
	const amenitiesGenerales = amenitiesGeneralesConst;
	const amenitiesGeneralesText = amenitiesGeneralesTextConst;

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
		console.log(pisoData);
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
		//pisoData.cocinaComedor = cocinaComedor.join();
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
					console.log('modificar');
					const pisoDatos = await AxiosConexionConfig.patch(url + '/' + id, pisoData);
					console.log(pisoDatos.data);
					props.getPiso();
				} catch (e) {
					console.log(e);
				}
			} else {
				try {
					console.log('crear');
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
								console.log(data);
							});
						});
					});
					setSavingPisos(false);
					props.getPiso();
				} catch (e) {
					console.log(e);
					setSavingPisos(false);
				}
			}
			props.setpisoDialog(false);
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
		aireacondicionado: false,
		tendederoRopa: piso?.tendederoRopa ? piso?.tendederoRopa : false,
		patioBalcon: piso?.patioBalcon ? piso?.patioBalcon : false,
		gimnasio: piso?.gimnasio ? piso?.gimnasio : false,
		productosLimpieza: piso?.productosLimpieza ? piso?.productosLimpieza : false,
		sauna: piso?.sauna ? piso?.sauna : false,
		plancha: piso?.plancha ? piso?.plancha : false,
		lavasecadora: piso?.lavasecadora ? piso?.lavasecadora : false,
		lavadora: piso?.lavadora ? piso?.lavadora : false,
		tv: piso?.tv ? piso?.tv : false,
		piscina: piso?.piscina ? piso?.piscina : false,
		cocina: piso?.cocina ? piso?.cocina : false,
		jacuzzi: piso?.jacuzzi ? piso?.jacuzzi : false,
		secadorPelo: piso?.secadorPelo ? piso?.secadorPelo : false,
		utensiliosCocina: piso?.utensiliosCocina ? piso?.utensiliosCocina : false,
		zonaTrabajar: piso?.zonaTrabajar ? piso?.zonaTrabajar : false,
		platosCubiertos: piso?.platosCubiertos ? piso?.platosCubiertos : false,
		wifi: piso?.wifi ? piso?.wifi : false,
		tvcable: piso?.tvcable ? piso?.tvcable : false,
		calefaccion: piso?.calefaccion ? piso?.calefaccion : false,

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
		serviciosAdicionales: piso.serviciosAdicionales ? piso.serviciosAdicionales : '',
	};

	const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
	const getFormErrorMessage = (meta) => {
		return isFormFieldValid(meta) && <small className='p-error'>{meta.error}</small>;
	};

	const onSubmit = (data, form) => {
		props.setpisoDialog(false);
		SavePiso(data);
		form.restart();
	};
	const validate = (data) => {
		let errors = {};
		if (!data.nombre || data.nombre === '') {
			errors.nombre = 'Nombre es requerido.';
		}
		if (!data.descripcion || data.descripcion === '') {
			errors.descripcion = 'La descripcion es requerida.';
		}
		if (!data.direccion || data.direccion === '') {
			errors.direccion = 'La descripcion es requerida.';
		}
		if (!data.descripcionI || data.descripcionI === '') {
			errors.descripcionI = 'La descripcion en inglés es requerida.';
		}
		if (!data.latitud || data.latitud === '') {
			errors.latitud = 'latitud requerida.';
		} else if (data.latitud > 180 || data.latitud < -180) {
			errors.latitud = 'Valor permitido entre 180 y -180.';
		}
		if (!data.longitud || data.longitud === '') {
			errors.longitud = 'longitud requerida.';
		} else if (data.longitud > 90 || data.longitud < -90) {
			errors.longitud = 'Valor permitido entre 90 y -90.';
		}
		if (!data.cantpersonas || data.cantpersonas === '') {
			errors.cantpersonas = 'cant de personas es requerida.';
		}
		if (!data.metroscuadrados || data.metroscuadrados === '') {
			errors.metroscuadrados = 'metros cuadrados es requerido.';
		}
		if (!data.canthabitaciones || data.canthabitaciones === '') {
			errors.canthabitaciones = 'cant de habitaciones es requerida.';
		}
		if (!data.cantbannos || data.cantbannos === '') {
			errors.cantbannos = 'cant de baños es requerido.';
		}
		if (!data.precio || data.precio === '') {
			errors.precio = 'precio es requerido.';
		}
		/*else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }*/
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
		<div className='p-col-12 p-md-4	'>
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

	const elementoBoolean = (text, elemento, valor) => {
		return (
			<div className='floatLeft p-field p-col-12 p-md-3'>
				<label className='p-mb-3'>{text}</label>
				<div className='p-formgrid p-grid'>
					<div className='p-field-radiobutton p-col-6'>
						<RadioButton
							inputId={elemento + '1'}
							name={elemento}
							value={true}
							checked={valor === true}
						/>
						<label htmlFor={elemento + '1'}>Si</label>
					</div>
					<div className='p-field-radiobutton p-col-6'>
						<RadioButton
							inputId={elemento + '2'}
							name={elemento}
							value={false}
							checked={valor === false}
						/>
						<label htmlFor={elemento + '2'}>No</label>
					</div>
				</div>
			</div>
		);
	};

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
								<div className='p-col-12 p-md-4'>
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
								{fieldLatLongComponent('latitud', 'Latitud')}
								{fieldLatLongComponent('longitud', 'Longitud')}
							</div>
							{fieldTextComponent('idpiso', 'idpiso', true)}
							{fieldTextComponent('diasReservados', 'diasReservados', true)}

							{fieldTextComponent('direccion', 'Dirección', false)}
							{fieldTextComponent('descripcion', 'Descripción', false)}
							{fieldTextComponent('descripcionI', 'Description(Inglés)', false)}
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
								{elementoCheck('sauna', 'sauna')}
								{elementoCheck('tendederoRopa', 'Tendedero de Ropa')}
								{elementoCheck('patioBalcon', 'Patio Balcon')}
								{elementoCheck('gimnasio', 'Gimnasio')}
							</div>
							<div className='p-col-12 p-d-flex p-flex-column p-flex-md-row '>
								{elementoCheck('productosLimpieza', 'Productos de Limpieza')}
								{elementoCheck('plancha', 'Plancha')}
								{elementoCheck('lavasecadora', 'Lavadora/Secadora')}
								{elementoCheck('tv', 'tv')}
							</div>
							<div className='p-col-12 p-d-flex p-flex-column p-flex-md-row '>
								{elementoCheck('piscina', 'Piscina')}
								{elementoCheck('cocina', 'Cocina')}
								{elementoCheck('jacuzzi', 'Jacuzzi')}
								{elementoCheck('secadorPelo', 'Secador de Pelo')}
							</div>
							<div className='p-col-12 p-d-flex p-flex-column p-flex-md-row '>
								{elementoCheck('utensiliosCocina', 'Utensilios de Cocina')}
								{elementoCheck('zonaTrabajar', 'Zona para Trabajar')}
								{elementoCheck('platosCubiertos', 'Platos y Cubiertos')}
								{elementoCheck('calefaccion', 'Calefaccion')}
							</div>
							<div className='p-col-12 p-d-flex p-flex-column p-flex-md-row '>
								{elementoCheck('wifi', 'Wifi')}
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
