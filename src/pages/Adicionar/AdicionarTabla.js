import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import pisoservice from '../service/pisoservice';
import ImageUploader from 'react-images-upload';

import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Form, Field } from 'react-final-form';
import { SelectButton } from 'primereact/selectbutton';
import { TabView, TabPanel } from 'primereact/tabview';

import { withTranslation } from 'react-i18next';

import cargando from '../../assets/img/loading.gif';

import './Adicionar.style.scss';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import { amenitiesGeneralesTextConst } from 'configuracion/constantes';
import { amenitiesGeneralesConst } from 'configuracion/constantes';
import AdicionarForm from './AdicionarForm';

const AdicionarTabla = (props) => {
	const { t } = props;
	let emptypiso = {
		direccion: '',
		iddestino: 3,
		cantpersonas: 0,
		metroscuadrados: 0,
		wifi: true,
		tvcable: true,
		aireacondicionado: true,
		calefaccion: true,
		canthabitaciones: 0,
		cantbannos: 0,
		precio: 0,
		nombre: '',
		descripcion: '',
		imagen: '',
		diasReservados: '',
	};
	const getEmptyPiso = () => {
		amenitiesGeneralesConst.forEach((amenitie) => {
			emptypiso[amenitie] = true;
		});
		return emptypiso;
	};

	const options = ['Yes', 'No'];
	const [activeIndex, setActiveIndex] = useState(0);
	const [pisos, setpisos] = useState(null);
	const [loadingPisos, setloadingpisos] = useState(false);
	const [pisoDialog, setpisoDialog] = useState(false);
	const [deletepisoDialog, setDeletepisoDialog] = useState(false);
	const [piso, setpiso] = useState(emptypiso);
	const [selectedpisos, setSelectedpisos] = useState(null);
	// const [submitted, setSubmitted] = useState(false);
	const toast = useRef(null);
	const dt = useRef(null);
	const amenitiesGenerales = amenitiesGeneralesConst;
	const amenitiesGeneralesText = amenitiesGeneralesTextConst;
	const [images, setImages] = useState([]);
	const [cargandoImagenes, setCargandoImages] = useState(false);
	//const pisoservice = new pisoservice();

	useEffect(() => {
		getPiso();
		//pisoservice.getpisos().then(data => setpisos(data));
		// eslint-disable-line react-hooks/exhaustive-deps
	}, [props.destino]);

	async function getPiso() {
		// console.log(pisos)
		setpisos(null);
		setloadingpisos(true);
		const url = '/pisos?filter[where][iddestino]=' + props.destino.iddestino;
		const urlImagen = '/imagen?filter=';
		try {
			const pisos = await AxiosConexionConfig.get(url);
			let go = 0;
			pisos.data.forEach((piso, index) => {
				const uri = {
					where: {
						and: [{ portada: true }, { idpiso: piso.idpiso }],
					},
				};
				AxiosConexionConfig.get(urlImagen + encodeURI(JSON.stringify(uri))).then(
					(respuesta) => {
						piso.imagen = respuesta.data;
						go = go + 1;
						if (go === pisos.data.length) {
							setpisos(pisos.data);
							setloadingpisos(false);
						}
					}
				);
			});
			if (pisos.data.length === 0) {
				setloadingpisos(false);
			}
			//setImagenes(img1);
			//setpiso(pisos)
		} catch (e) {
			console.log(e);
		}
	}

	const openNew = () => {
		setpiso(getEmptyPiso());
		// setSubmitted(false);
		setpisoDialog(true);
	};

	const hideDialog = () => {
		// setSubmitted(false);
		setpisoDialog(false);
		setActiveIndex(0);
	};

	const hideDeletepisoDialog = () => {
		setDeletepisoDialog(false);
	};

	const editpiso = (piso) => {
		console.log(piso);
		setpiso({ ...piso });
		setpisoDialog(true);
	};

	const confirmDeletepiso = (piso) => {
		setpiso(piso);
		setDeletepisoDialog(true);
	};

	async function deletepiso() {
		setloadingpisos(true);
		const uri = '/imagen?filter=';
		const condicion = {
			where: {
				idpiso: piso.idpiso,
			},
		};
		try {
			AxiosConexionConfig.get(uri + JSON.stringify(condicion))
				.then((imagenData) => {
					// console.log(imagenData)
					if (imagenData.data.length === 0) {
						del();
					}
					imagenData.data.forEach((imData, index) => {
						AxiosConexionConfig.delete('/imagen/' + imData.id).then((e) => {
							// console.log(e)
							if (index === imagenData.data.length - 1) {
								del();
							}
						});
					});
				})
				.catch((e) => {
					console.log(e);
				});
		} catch (e) {
			console.log(e);
		}
		let _pisos = pisos.filter((val) => val.id !== piso.id);
		setpiso(_pisos);
		setDeletepisoDialog(false);
		setpiso(emptypiso);

		toast.current.show({
			severity: 'success',
			summary: 'Successful',
			detail: 'piso Deleted',
			life: 3000,
		});
	}

	const del = () => {
		const url = '/pisos/' + piso.idpiso;
		AxiosConexionConfig.delete(url).then((e) => {
			console.log(e.data);
			getPiso();
		});
	};

	const leftToolbarTemplate = () => {
		return (
			<React.Fragment>
				<Button
					label='New'
					icon='pi pi-plus'
					className='p-button-success p-mr-2'
					onClick={() => openNew()}
				/>
			</React.Fragment>
		);
	};

	const imageBodyTemplate = (row) => {
		let src = '';
		if (
			row.imagen !== undefined &&
			row.imagen[0] !== undefined &&
			row.imagen[0].imagen !== undefined
		) {
			src = 'data:image/png;base64,' + row.imagen[0].imagen;
		} else {
			src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png';
		}
		return <img src={src} alt='imagen' className='piso-image' />;
	};

	const actionBodyTemplate = (rowData) => {
		return (
			<React.Fragment>
				<Button
					icon='pi pi-pencil'
					className='p-button-rounded p-button-success p-mr-2'
					onClick={() => editpiso(rowData)}
				/>
				<Button
					icon='pi pi-trash'
					className='p-button-rounded p-button-warning'
					onClick={() => confirmDeletepiso(rowData)}
				/>
			</React.Fragment>
		);
	};

	const descripcionTemplate = (rowData) => {
		return (
			<React.Fragment>
				{rowData?.descripcion?.length > 25
					? rowData?.descripcion.substring(0, 24) + '...'
					: rowData.descripcion}
			</React.Fragment>
		);
	};

	const deletepisoDialogFooter = (
		<React.Fragment>
			<Button
				label='No'
				icon='pi pi-times'
				className='p-button-text'
				onClick={hideDeletepisoDialog}
			/>
			<Button label='Yes' icon='pi pi-check' className='p-button-text' onClick={deletepiso} />
		</React.Fragment>
	);

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
								getPiso();
							});
						});
					});
				} catch (e) {
					console.log(e);
				}
			}
			setpisoDialog(false);
			getPiso();
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

	const formik = useFormik({
		initialValues: {},

		onSubmit: (data) => {
			//savepiso()
			SavePiso(data);
			console.log(data);
			setpisoDialog(false);
			formik.resetForm();
		},
	});

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
	const elementoBoolean = (text, elemento, handleChange, valor) => {
		return (
			<div className='floatLeft p-field p-col-12 p-md-3'>
				<label className='p-mb-3'>{text}</label>
				<div className='p-formgrid p-grid'>
					<div className='p-field-radiobutton p-col-6'>
						<RadioButton
							inputId={elemento + '1'}
							name={elemento}
							value={true}
							onChange={handleChange}
							checked={valor === true}
						/>
						<label htmlFor={elemento + '1'}>Si</label>
					</div>
					<div className='p-field-radiobutton p-col-6'>
						<RadioButton
							inputId={elemento + '2'}
							name={elemento}
							value={false}
							onChange={handleChange}
							checked={valor === false}
						/>
						<label htmlFor={elemento + '2'}>No</label>
					</div>
				</div>
			</div>
		);
	};

	const elementoSelect = (text, elemento) => {
		return (
			<div className='floatLeft p-field p-col-12 p-md-3'>
				<Field
					name='accept'
					type='checkbox'
					render={({ input, meta }) => (
						<div className='p-field-checkbox'>
							<SelectButton
								inputId={elemento}
								{...input}
								value={options[0]}
								options={options}
								className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
							/>
							<label
								htmlFor={elemento}
								className={classNames({ 'p-error': isFormFieldValid(meta) })}
							>
								{text}*
							</label>
						</div>
					)}
				/>
			</div>
		);
	};

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

	const form = () => {
		return (
			<div className='p-d-flex p-jc-center'>
				<div className='card'>
					<Form
						onSubmit={onSubmit}
						initialValues={initialValues}
						validate={validate}
						render={({ handleSubmit }) => (
							<form onSubmit={handleSubmit} className='p-fluid'>
								<Dialog
									visible={pisoDialog}
									style={{ width: '80%', marginTop: '150px' }}
									header='Adicionar Piso'
									modal
									className='p-fluid'
									footer={
										<React.Fragment>
											<Button
												label='Cancel'
												icon='pi pi-times'
												className='p-button-text'
												onClick={hideDialog}
											/>
											,
											<Button
												type='submit'
												label='Submit'
												disabled={cargandoImagenes}
												className='p-button-text'
											/>
										</React.Fragment>
									}
									onHide={hideDialog}
								>
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
													{fieldTextComponent('nombre', 'nombre', false)}
												</div>
												<div className='p-col-12 p-md-4'>
													{fieldTextComponent(
														'latitud',
														'latitud',
														false
													)}
												</div>
												<div className='p-col-12 p-md-4'>
													{fieldTextComponent(
														'longitud',
														'longitud',
														false
													)}
												</div>
												{fieldTextComponent('idpiso', 'idpiso', true)}
												{fieldTextComponent(
													'diasReservados',
													'diasReservados',
													true
												)}
											</div>
											{fieldTextComponent('direccion', 'direccion', false)}
											{fieldTextComponent(
												'descripcion',
												'descripcion',
												false
											)}
											{fieldTextComponent(
												'descripcionI',
												'descripcionI',
												false
											)}
											<div className='flexWrap p-col-12'>
												{fieldNumberComponent('precio', 'precio', false)}
												{fieldNumberComponent(
													'canthabitaciones',
													'canthabitaciones',
													false
												)}
												{fieldNumberComponent(
													'cantpersonas',
													'cantpersonas',
													false
												)}
												{fieldNumberComponent(
													'metroscuadrados',
													'metroscuadrados',
													false
												)}
												{fieldNumberComponent(
													'cantbannos',
													'cantbannos',
													false
												)}
											</div>
										</TabPanel>
										<TabPanel header='Header III'>
											{elementoSelect(
												'Aire Acondicionado',
												'aireacondicionado',
												false
											)}
											<div>
												<div className='floatLeft'>
													{amenitiesGenerales.map((amenitie, index) => {
														return elementoBoolean(
															amenitiesGeneralesText[index],
															amenitie,
															formik.handleChange,
															formik.values[amenitie]
														);
													})}
												</div>
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
											{fieldTextComponent(
												'cocinaComedor',
												'cocinaComedor',
												false
											)}
											{fieldTextComponent(
												'internetOficina',
												'internetOficina',
												false
											)}
											{fieldTextComponent(
												'seguridadHogar',
												'seguridadHogar',
												false
											)}
											{fieldTextComponent(
												'calefaccionRefrigeracion',
												'calefaccionRefrigeracion',
												false
											)}
											{fieldTextComponent(
												'entretenimiento',
												'entretenimiento',
												false
											)}
											{fieldTextComponent(
												'paraFamilias',
												'paraFamilias',
												false
											)}
											{fieldTextComponent('dormitorio', 'dormitorio', false)}
											{fieldTextComponent('banno', 'banno', false)}
										</TabPanel>
									</TabView>
								</Dialog>
							</form>
						)}
					/>
				</div>
			</div>
		);
	};

	return (
		<div className='datatable-crud-demo'>
			<div className='card'>
				<Toast ref={toast} />
				<Button
					label={!pisoDialog ? 'Nuevo piso' : 'Cancelar'}
					icon='pi pi-plus'
					className='p-button-success p-mr-2'
					onClick={() => setpisoDialog(!pisoDialog)}
				/>
				{pisos === null ? (
					loadingPisos ? (
						<div className='p-col-12 p-text-center'>
							<img src={cargando} alt='cargando' />
						</div>
					) : (
						<div className='p-col-12 p-text-center'>
							<p>Sin datos</p>
						</div>
					)
				) : !pisoDialog ? (
					<DataTable
						ref={dt}
						value={pisos}
						selection={selectedpisos}
						onSelectionChange={(e) => setSelectedpisos(e.value)}
						dataKey='idpiso'
						paginator
						rows={10}
						rowsPerPageOptions={[5, 10, 25]}
						paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
						currentPageReportTemplate='Showing {first} to {last} of {totalRecords} pisos'
						//    header={header}
					>
						<Column
							field='idpiso'
							header='Id'
							sortable
							headerClassName='width-80px'
						></Column>
						<Column field='nombre' header='Nombre' sortable></Column>
						<Column body={descripcionTemplate} header='Descripción' sortable></Column>
						<Column field='direccion' header='Dirección' sortable></Column>
						<Column header='Imagen' body={(r) => imageBodyTemplate(r)}></Column>
						<Column
							field='precio'
							header='Precio'
							sortable
							headerClassName='width-120px'
						></Column>
						<Column field='cantpersonas' header='Cant. de personas' sortable></Column>
						<Column field='metroscuadrados' header='Metros Cuadrados' sortable></Column>
						<Column field='canthabitaciones' header='Habitaciones' sortable></Column>
						<Column field='cantbannos' header='Baños' sortable></Column>
						<Column body={actionBodyTemplate} headerClassName='width-120px'></Column>
					</DataTable>
				) : null}
			</div>
			{pisoDialog ? (
				<AdicionarForm
					dialogVisible={pisoDialog}
					setpisoDialog={(value) => setpisoDialog(value)}
					destino={props.destino}
					piso={piso}
					getPiso={() => getPiso()}
				/>
			) : null}

			<Dialog
				visible={deletepisoDialog}
				style={{ width: '450px' }}
				header='Confirm'
				modal
				footer={deletepisoDialogFooter}
				onHide={hideDeletepisoDialog}
			>
				<div className='confirmation-content'>
					<i className='pi pi-exclamation-triangle p-mr-3' style={{ fontSize: '2rem' }} />
					{piso && (
						<span>
							{t('Are you sure you want to delete')} <b>{piso.nombre}</b>?
						</span>
					)}
				</div>
			</Dialog>
		</div>
	);
};
export default withTranslation('translations')(AdicionarTabla);
