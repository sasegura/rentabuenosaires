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

const AdicionarForm = (props) => {
	const [savingPisos, setSavingPisos] = useState(false);
	const { piso } = props;
	const [images, setImages] = useState([]);
	const [cargandoImagenes, setCargandoImages] = useState(false);

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

	useEffect(() => {
		setserviciosAdicionales(servicios.serviciosAdicionales);
		setCocinaComedor(servicios.cocinaComedor);
		setEstacionamientoInstalaciones(servicios.estacionamientoInstalaciones);
		setinternetOficina(servicios.internetOficina);
		setseguridadHogar(servicios.seguridadHogar);
		setcalefaccionRefrigeracion(servicios.calefaccionRefrigeracion);
		setparaFamilias(servicios.paraFamilias);
		setentretenimiento(servicios.entretenimiento);
		setDormitorio(servicios.Dormitorio);
		setbanno(servicios.banno);
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
			errors.descripcion = 'descripcion es requerida.';
		}
		if (!data.descripcionI || data.descripcionI === '') {
			errors.descripcionI = 'descripcion en inglés es requerida.';
		}
		if (!data.latitud || data.latitud === '') {
			errors.latitud = 'latitud es requerida.';
		}
		if (!data.longitud || data.longitud === '') {
			errors.longitud = 'longitud es requerida.';
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
								'p-error': isFormFieldValid('canthabitaciones'),
							})}
						>
							{texto}*
						</label>
						<InputText
							id={campo}
							{...input}
							className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
						/>

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
						<label
							htmlFor={campo}
							className={classNames({
								'p-error': isFormFieldValid('canthabitaciones'),
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
									'Dormitorio',
									selectedDormitorio,
									setSelectedDormitorio,
									filteredDormitorio,
									searchDormitorio
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
							<div className='p-d-flex p-flex-column p-flex-md-row'>
								{autocompleteElement(
									'Internet y oficina',
									selectedinternetOficina,
									setSelectedinternetOficina,
									filteredinternetOficina,
									searchinternetOficina
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
