import React, { Fragment, useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Carousel } from 'primereact/carousel';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Toast } from 'primereact/toast';
//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';
import imagenLoading from '../../assets/img/loading.gif';
import imagenTV from '../../assets/img/television.svg';
import imagenAire from '../../assets/img/air-conditioner.svg';
import imagencalefaccion from '../../assets/img/heating.svg';
import imagenWifi from '../../assets/img/wifi.svg';
import washingMachine from '../../assets/img/icon/washing-machine.svg';
import jacuzzi from '../../assets/img/icon/jacuzzi.svg';
// import elevator from '../../assets/img/icon/elevator.svg';
// import frigorifico from '../../assets/img/icon/frigorifico.svg';
import gym from '../../assets/img/icon/gym.svg';
// reactstrap components
import { Row } from 'reactstrap';

import './Piso.scss';

import parse from 'html-react-parser';

import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import { amenitiesGeneralesTextConst } from 'configuracion/constantes';
import { amenitiesGeneralesConst } from 'configuracion/constantes';
import Maps from './Map';
import DialogDemo from 'components/Dialog';
import { linkUsuario } from 'configuracion/constantes';
import { apiReservaciones } from 'configuracion/constantes';
import { apiPiso } from 'configuracion/constantes';
import moment from 'moment';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import Currency from 'components/Currency';

const Piso = (props) => {
	const { t } = props;
	const toast = useRef(null);
	const idPiso = props.history.location.search.split('?')[1];
	const [imagenes, setImagenes] = useState(null);
	const [loadImg, setLoadImg] = useState(false);
	const [loadData, setLoadData] = useState(false);
	const [data, setData] = useState(null);
	const [destino, setDestino] = useState(null);
	const [dateBegin, setDateBegin] = useState(null);
	const [dateEnd, setDateEnd] = useState(null);
	const [disabledDates, setddisabledDates] = useState([]);
	const [disabledEndDate, setdisabledEndDate] = useState(true);
	const [errorfecha, seterrorfecha] = useState('');
	const [minDate, setminDate] = useState(null);
	const [amenities, setAmenities] = useState(null);
	const [huesped, sethuesped] = useState(1);
	const [totalCalculo, settotalCalculo] = useState(0);
	const [calculo, setCalculo] = useState(false);
	let amenitiesGenerales = amenitiesGeneralesConst;
	let amenitiesGeneralesText = amenitiesGeneralesTextConst;
	const [activeIndex, setactiveIndex] = useState([]);
	const [reloadCarrusel, setReloadCarrusel] = useState(false);
	const [visibleDialog, setVisibleDialog] = useState(false);
	const [valorDialog, setValorDialog] = useState('');
	const [acept, setAcept] = useState(false);

	let today = new Date();
	addLocale('es', {
		firstDayOfWeek: 1,
		dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
		dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
		dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
		monthNames: [
			'enero',
			'febrero',
			'marzo',
			'abril',
			'mayo',
			'junio',
			'julio',
			'agosto',
			'septiembre',
			'octubre',
			'noviembre',
			'diciembre',
		],
		monthNamesShort: [
			'ene',
			'feb',
			'mar',
			'abr',
			'may',
			'jun',
			'jul',
			'ago',
			'sep',
			'oct',
			'nov',
			'dic',
		],
		today: 'Hoy',
		clear: 'Claro',
	});
	props.setCurrentNavBarColor(false);

	React.useEffect(() => {
		//setdisabledDays([2])
		//setddisabledDates([today])
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

	useEffect(() => {
		if (dateBegin) {
			setdisabledEndDate(false);
			let date = new Date(dateBegin);
			date.setDate(date.getDate() + 1);
			setminDate(date);
		}
	}, [dateBegin]);

	useEffect(() => {
		let begin = dateBegin?.getDate();
		let end = dateEnd?.getDate();
		if (BuscarEnIntervalo(dateBegin, dateEnd)) {
			seterrorfecha('En el intervalo seleccionado existen fechas reservadas previamente.');
			setCalculo(false);
		} else {
			if (end === begin && begin) {
				console.log(begin);
				seterrorfecha('Seleccione una fecha de salida válida.');
				setCalculo(false);
			} else {
				if (end > begin) {
					settotalCalculo(diffDates(dateBegin, dateEnd) * data.precio);
					setCalculo(true);
					seterrorfecha('');
				}
			}
		}
	}, [dateEnd, huesped]);

	async function getImagenes() {
		const url2 = '/imagen?filter=';
		let imagenesTemp = null;
		const valores = JSON.stringify({
			where: {
				and: [{ idpiso: idPiso }, { portada: true }],
			},
		});
		const valores2 = JSON.stringify({
			where: {
				and: [{ idpiso: idPiso }, { portada: false }],
			},
		});
		try {
			const respuesta = await AxiosConexionConfig.get(url2 + encodeURIComponent(valores));
			imagenesTemp = respuesta.data;
			setImagenes(imagenesTemp);
			setLoadImg(true);
		} catch (e) {
			console.log(e);
		}

		// const url = '/imagen?filter[where][idpiso]=' + idPiso;
		try {
			const imagen = await AxiosConexionConfig.get(url2 + encodeURIComponent(valores2));
			imagen.data.forEach((im) => imagenesTemp.push(im));
			setImagenes(imagenesTemp);
			setReloadCarrusel(!reloadCarrusel);
		} catch (e) {
			console.log(e);
		}
	}
	let datos = [];
	const amenitieForm = (imagen, text) => {
		amenitiesGeneralesText.forEach((pos, index) => {
			if (pos === text) {
				amenitiesGenerales.splice(index, 1);
				amenitiesGeneralesText.splice(index, 1);
			}
		});
		return (
			<div className='p-col-12 p-md-3 p-m-0'>
				<img src={imagen} alt='' width={'20px'} />
				<span className='marginLeft5px font-size-12'>{t(text)}</span>
			</div>
		);
	};
	const amenitiesList = (data) => {
		let a = [];
		if (data.wifi) {
			a.push(amenitieForm(imagenWifi, 'Wifi'));
		}
		if (data.lavadora) {
			a.push(amenitieForm(washingMachine, 'Lavadora'));
		}
		if (data.calefaccion) {
			a.push(amenitieForm(imagencalefaccion, 'calefaccion'));
			delete amenitiesGenerales.calefaccion;
		}
		if (data.aireacondicionado) {
			a.push(amenitieForm(imagenAire, 'aireacondicionado'));
		}
		if (data.tvcable) {
			a.push(amenitieForm(imagenTV, 'TV'));
			delete amenitiesGenerales.tv;
		}
		if (data.lavasecadora) {
			a.push(amenitieForm(washingMachine, 'Lavadora/Secadora'));
		}
		if (data.gimnasio) {
			a.push(amenitieForm(gym, 'Gimnasio'));
			delete amenitiesGenerales.gimnasio;
		}
		if (data.jacuzzi) {
			a.push(amenitieForm(jacuzzi, 'Jacuzzi'));
		}
		setAmenities(a);
	};
	async function getData() {
		const url = '/pisos/' + idPiso;
		try {
			const piso = await AxiosConexionConfig.get(url);
			// console.log(piso.data)
			setData(piso.data);
			amenitiesList(piso.data);
			getDestino(piso.data.iddestino);
			let temp = [];
			if (piso.data?.diasReservados !== '' && piso.data?.diasReservados !== null) {
				temp = piso.data?.diasReservados?.split(',');
				temp = temp.map((pos) => (pos = new Date(pos)));
			}
			setddisabledDates(temp);
			if (piso.data.wifi) {
				datos.push({ icon: 'pi-wifi' });
			}
			setLoadData(true);
		} catch (e) {
			console.log(e);
		}
	}
	async function getDestino(idDestino) {
		const url = '/destinos/' + idDestino;
		try {
			const piso = await AxiosConexionConfig.get(url);
			setDestino(piso.data);
		} catch (e) {
			console.log(e);
		}
	}

	React.useEffect(() => {
		getImagenes();
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (acept) {
			createUsuario();
			setAcept(false);
			setDateBegin(null);
			setDateEnd(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [acept]);

	const getDate = (date) => {
		const temp = new Date(date);
		let respuesta = temp.getFullYear() + '/' + temp.getMonth() + '/' + temp.getDay();
		return respuesta;
	};

	function createUsuario() {
		setCalculo(false);
		const values = {
			nombre: valorDialog.name,
			apellidos: '',
			correo: valorDialog.email,
			contrasenna: '',
			expiracion: new Date().toString(),
			rol: 2,
		};
		AxiosConexionConfig.post(linkUsuario, JSON.stringify(values))
			.then((response) => {
				sendMail();
				const reservacion = {
					idusuario: response.data.idusuario,
					idpiso: data.idpiso,
					fechaFin: moment(dateEnd).subtract(1, 'days'),
					fechaInicio: dateBegin,
					aceptada: false,
					cantPersonas: huesped,
					precio: totalCalculo,
				};
				let dias = [];
				const inicio = moment(dateBegin);
				const fin = moment(dateEnd);
				const dateB = new Date(dateBegin);
				let contador = fin.diff(inicio, 'days') - 1;
				dias.push(sumarDias(dateB, 0));
				while (contador > 0) {
					let a = new Date(dateBegin);
					dias.push(sumarDias(a, contador));
					contador--;
				}
				const diasReservados = dias.toString();
				AxiosConexionConfig.patch(
					`${apiPiso}/${data.idpiso}`,
					JSON.stringify({ diasReservados: diasReservados + ',' + data.diasReservados })
				).then(() => {
					getData();
				});
				AxiosConexionConfig.post(apiReservaciones, JSON.stringify(reservacion));
			})
			.catch((e) => {
				toast.current.show({
					severity: 'error',
					summary: 'Error Usuario',
					detail: e,
					life: 3000,
				});
				console.log(e);
			});
	}

	function sumarDias(fecha, dias) {
		fecha.setDate(fecha.getDate() + dias);
		return fecha;
	}

	async function sendMail() {
		const url = '/sendMailPreReserva';
		const values = {
			correoCliente: valorDialog.email,
			correoAdmin: 'administrador@e-homeselect.com',
			fechaInicio: moment(dateBegin).format('DD/MM/YYYY'),
			fechaFin: moment(dateEnd).format('DD/MM/YYYY'),
			cantidadPersonas: huesped,
			precio: data.precio,
			pisoNombre: data.nombre,
			clienteNombre: valorDialog.name,
			destino: destino.nombre,
			telefono: valorDialog.telefono,
			texto: valorDialog.texto,
		};
		AxiosConexionConfig.post(url, JSON.stringify(values))
			.then((response) => {
				if (response.data) {
					toast.current.show({
						severity: 'success',
						summary: 'Success Message',
						detail: `Correo enviado al administrador.`,
						life: 3000,
					});
				} else {
					toast.current.show({
						severity: 'warn',
						summary: 'Warning Message',
						detail: `El correo no se envió correctamente.`,
						life: 3000,
					});
				}
			})
			.catch((e) => {
				toast.current.show({
					severity: 'error',
					summary: 'Success Message',
					detail: e,
					life: 3000,
				});
				console.log(e);
			});
	}

	const productTemplate = (imagenes) => {
		return (
			<div className='product-item '>
				<div className='product-item-content '>
					<div className='p-mb-3 '>
						<img
							src={'data:image/png;base64,' + imagenes.imagen}
							alt='imagen'
							className='product-image height440px'
						/>
					</div>
				</div>
			</div>
		);
	};
	const carrusel = () => {
		return (
			<div className='carruselDiv' key={reloadCarrusel}>
				<Carousel
					value={imagenes}
					containerClassName=' '
					numVisible={1}
					numScroll={1}
					itemTemplate={productTemplate}
				/>
			</div>
		);
	};

	const BuscarEnIntervalo = (begin, end) => {
		let flag = false;
		disabledDates.forEach((pos) => {
			if (pos > begin && pos < end) {
				flag = true;
			}
		});
		return flag;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setVisibleDialog(true);
	};

	const headerTarjeta = () => {
		return (
			<div className=''>
				<i className='fa fa-user'></i>
				<span className='marginLeft5px amenitie'>{data.cantpersonas}</span>
				<span className='marginLeft10px'></span>
				{data.metroscuadrados}
				<span className='fa-exp amenitie'>
					m<sup>2</sup>
				</span>
				<span className='marginLeft10px'></span>
				<i className='fa fa-bath'></i>
				<span className='marginLeft5px amenitie'>{data.cantbannos}</span>
				<span className='marginLeft10px'></span>
				<i className='fa fa-bed'></i>
				<span className='marginLeft5px amenitie'>{data.canthabitaciones}</span>
				<span className='marginLeft10px'></span>
			</div>
		);
	};
	const diffDates = (beginDate, endDate) => moment(endDate).diff(moment(beginDate), 'days');
	const TarjetPiso = () => {
		return (
			<div className='fontFamily'>
				<div className='marginLeft20px'>
					<h4 style={{ fontFamily: 'playfair' }}>
						{props.i18n.language === 'es'
							? `${data.nombre.substr(0, 25)}${data.nombre.length > 26 ? '...' : ''}`
							: `${data.nombreI.substr(0, 25)}${
									data.nombreI.length > 26 ? '...' : ''
							  }`}
					</h4>
				</div>
				{headerTarjeta()}
				<hr />
				<div className='marginLeft20px'>
					{t('Desde')} {Currency(data.moneda)}
					<span className=''>{data.precio}</span> {t('por noche')}
				</div>
				<div className='p-field p-col-12 fontFamily '>
					<label className='marginLeft10px' htmlFor='calendar'>
						{t('Seleccione fechas')}
					</label>
					<div className='p-mr-1 p-ml-1'>
						<Calendar
							id='calendar'
							className={'p-col-12 p-md-6'}
							value={dateBegin}
							minDate={today}
							locale='es'
							placeholder='Check in'
							onChange={(e) => {
								setDateBegin(e.value);
								setDateEnd(e.value);
							}}
							disabledDates={disabledDates}
							baseZIndex={1000}
							readOnlyInput
							monthNavigator
							yearNavigator
							yearRange='2010:2100'
							dateFormat='dd/mm/yy'
						/>
						<Calendar
							id='calendarend'
							className={'p-col-12 p-md-6'}
							minDate={new Date(dateBegin)}
							viewDate={new Date(dateBegin)}
							value={dateEnd}
							locale='es'
							placeholder='Check out'
							disabled={disabledEndDate}
							onChange={(e) => setDateEnd(e.value)}
							disabledDates={disabledDates}
							baseZIndex={1000}
							readOnlyInput
							monthNavigator
							yearNavigator
							yearRange='2010:2100'
							dateFormat='dd/mm/yy'
						/>
					</div>
					<div className='p-ml-1 p-mr-1'>
						<div>
							<label htmlFor='minmax-buttons' className=''>
								{t('Guests')}
							</label>
						</div>
						<div className=''>
							<InputNumber
								id='minmax-buttons'
								className='p-col-12 p-p-0'
								value={huesped}
								onValueChange={(e) => sethuesped(e.value)}
								mode='decimal'
								showButtons
								min={1}
								size={2}
								max={data.cantpersonas}
							/>
						</div>
					</div>
					<div className='p-ml-1 p-mr-1'>
						{calculo ? (
							<Fragment>
								<div>
									{t('Estancia')}
									<span className='floatRigth'>
										{`( ${diffDates(dateBegin, dateEnd)})`}
										{t('noches')}
									</span>
								</div>
								<div>
									{t('Total')}:{' '}
									<div className='floatRigth'>
										{Currency(data.moneda, totalCalculo)}
									</div>
								</div>
							</Fragment>
						) : (
							<Fragment></Fragment>
						)}
					</div>
					<p className='p-error font-size-12'>{t(errorfecha)}</p>
				</div>
				<Button
					className='fontFamily'
					type='submit'
					color='primary'
					href='#pablo'
					disabled={!calculo}
					onClick={(e) => handleSubmit(e)}
				>
					{t('Pre-reserva')}
				</Button>
			</div>
		);
	};

	const [readMore, setReadMore] = useState(false);
	const DatosPiso = () => {
		return (
			<div className='p-col-12 flex'>
				<div className='p-col-12 p-md-1'></div>
				<div className='p-col-12 p-md-11 fontFamily'>
					<div>
						<h1 style={{ fontFamily: 'playfair' }}>
							{props.i18n.language === 'es' ? data.nombre : data.nombreI}
						</h1>
					</div>
					{headerTarjeta()}
					<div>
						<h5 className='description'>
							{props.i18n.language === 'en'
								? parse(data.descripcionI)
								: parse(data.descripcion)}
						</h5>
					</div>

					<Row>
						<b>{t('Comodidades')}</b>
					</Row>
					<Row>
						{amenities?.map((dato, index) => {
							return <Fragment key={index}>{dato}</Fragment>;
						})}
					</Row>
				</div>
			</div>
		);
	};
	const fila = (datosFila, texto) => {
		if (datosFila) {
			return (
				<AccordionTab header={t(texto)}>
					<Row>
						{datosFila.split(',').map((dato, index) => {
							return dato ? (
								<div key={index} className='p-col-12 p-md-3 p-sm-6'>
									{t(dato.trim())}
								</div>
							) : (
								''
							);
						})}
					</Row>
				</AccordionTab>
			);
		} else {
			return null;
		}
	};

	const acordion = () => {
		return data.banno ||
			data.dormitorio ||
			data.entretenimiento ||
			data.paraFamilias ||
			data.calefaccionRefrigeracion ||
			data.seguridadHogar ||
			data.internetOficina ||
			data.cocinaComedor ||
			data.estacionamientoInstalaciones ||
			data.serviciosAdicionales ? (
			<Accordion
				multiple
				activeIndex={activeIndex}
				headerClassName='seccion'
				onTabChange={(e) => setactiveIndex(e.index)}
			>
				{fila(data.banno, 'Baño')}
				{fila(data.dormitorio, 'Dormitorio')}
				{fila(data.entretenimiento, 'Entretenimiento')}
				{fila(data.paraFamilias, 'Para familias')}
				{fila(data.calefaccionRefrigeracion, 'Calefacción y refrigeración')}
				{fila(data.seguridadHogar, 'Seguridad en el hogar')}
				{fila(data.internetOficina, 'Internet y oficina')}
				{fila(data.cocinaComedor, 'Cocina y comedor')}
				{fila(data.estacionamientoInstalaciones, 'Estacionamiento e instalaciones')}
				{fila(data.serviciosAdicionales, 'Servicios adicionales con recargo')}
			</Accordion>
		) : (
			<div className='p-col-12'>-</div>
		);
	};
	return (
		<>
			<IndexNavbar />
			<DialogDemo
				acept={(e) => setAcept(e)}
				open={visibleDialog}
				setOpen={(e) => setVisibleDialog(e)}
				valor={valorDialog}
				setValor={(e) => setValorDialog(e)}
			/>
			{loadData ? (
				<div className='p-col-12'>
					<div className='center p-col-12 p-md-11 p-mt-4 p-d-flex p-flex-column p-flex-md-row'>
						<div className='p-md-9 p-col-12 '>
							<Toast baseZIndex={500} ref={toast} />
							{loadImg ? (
								carrusel()
							) : (
								<div className='loaddingCenter'>
									<img alt='imagen' src={imagenLoading} />
								</div>
							)}
						</div>
						<div className='p-md-3 p-col-12 p-p-0'>
							<div className='card fontFamily'>
								{loadData ? (
									TarjetPiso()
								) : (
									<div className='loaddingCenter'>
										<img alt='imagen' src={imagenLoading} />
									</div>
								)}
							</div>
						</div>
					</div>
					<div className=' p-col-12 '>
						<div className=' p-col-12 p-md-12 p-d-flex p-flex-column p-flex-md-row p-p-0 floatLeft fontFamily'>
							<div className=' p-col-12 p-md-8 p-p-0 floatLeft'>{DatosPiso()}</div>
							<div className='p-col-12 p-md-3 p-p-0 '>
								<Maps piso={data} />
							</div>
						</div>
					</div>
					{true ? <div className='p-col-12 '>{acordion()}</div> : null}
				</div>
			) : (
				<div className='loaddingCenter'>
					<img alt='imagen' src={imagenLoading} />
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	currentPiso: state.piso.currentPiso,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentNavBarColor: (navBarColor) => dispatch(setCurrentNavBarColor(navBarColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('translations')(Piso));
