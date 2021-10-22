import React, { Fragment, useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Carousel } from 'primereact/carousel';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

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
import gym from '../../assets/img/icon/gym.svg';
import { CardImg, Row } from 'reactstrap';

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
import noImagenDisponible from '../../assets/img/Imagen-no-disponible.png';
import getUsuario from './getUsuario';
import getTips from 'pages/Reservaciones/getTips';
import Acordion from './Acordion';

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
	const [disabledDatesEntrada, setddisabledDatesEntrada] = useState([]);
	const [disabledDatesSalida, setddisabledDatesSalida] = useState([]);
	const [disabledEndDate, setdisabledEndDate] = useState(true);
	const [errorfecha, seterrorfecha] = useState('');
	const [amenities, setAmenities] = useState(null);
	const [huesped, sethuesped] = useState(1);
	const [totalCalculo, settotalCalculo] = useState(0);
	const [calculo, setCalculo] = useState(false);
	let amenitiesGenerales = amenitiesGeneralesConst;
	let amenitiesGeneralesText = amenitiesGeneralesTextConst;
	
	const [reloadCarrusel, setReloadCarrusel] = useState(false);
	const [visibleDialog, setVisibleDialog] = useState(false);
	const [valorDialog, setValorDialog] = useState('');
	const [acept, setAcept] = useState(false);
	const [piso,setPiso]=useState(null)
	const [tips, setTips]=useState(null)

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

	
	React.useEffect(async () => {
		if(props.currentUsuario!=='' && idPiso) setTips(await getTips(idPiso))
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
		if (piso) {
			amenitiesList(piso.data)
		}
	}, [props.i18n.language]);

	useEffect(() => {
		if (dateBegin) {
			setdisabledEndDate(false);
			let date = new Date(dateBegin);
			date.setDate(date.getDate() + 1);
		}
	}, [dateBegin]);

	useEffect(() => {
		let begin = new Date(dateBegin).getTime();
		let end = new Date(dateEnd).getTime();
		if (BuscarEnIntervalo(dateBegin, dateEnd)) {
			seterrorfecha('En el intervalo seleccionado existen fechas reservadas previamente.');
			setCalculo(false);
		} else {
			if (end === begin && begin) {
				seterrorfecha('Seleccione una fecha de salida válida.');
				setCalculo(false);
			} else {
				if (end > begin) {
					settotalCalculo(diffDates(dateBegin, dateEnd) * data.precio);
					setCalculo(true);
					seterrorfecha('');
				}else{
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
			if(imagenesTemp[0].imagen!==null){
				setImagenes(imagenesTemp);
			}			
			setLoadImg(true);
		} catch (e) {
			console.log(e);
		}

		if (imagenesTemp[0].imagen!==null){
			try {
			const imagen = await AxiosConexionConfig.get(url2 + encodeURIComponent(valores2));
			imagen.data.forEach((im) => imagenesTemp.push(im));
			setImagenes(imagenesTemp);
			setReloadCarrusel(!reloadCarrusel);
		} catch (e) {
			console.log(e);
		}}
		else{
			setImagenes([])
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
			setData(piso.data);
			setPiso(piso)
			amenitiesList(piso.data);
			getDestino(piso.data.iddestino);
			let temp = [];
			if (piso.data?.diasReservados !== '' && piso.data?.diasReservados !== null) {
				temp = piso.data?.diasReservados?.split(',');
				temp = temp.map((pos) => (pos = new Date(pos)));
			}
			let tempSalida = [];
			if (piso.data?.diasReservadosSalida !== '' && piso.data?.diasReservadosSalida !== null) {
				tempSalida = piso.data?.diasReservadosSalida?.split(',');
				tempSalida = tempSalida.map((pos) => (pos = new Date(pos)));
			}
			let tempEntrada = [];
			if (piso.data?.diasReservadosEntrada !== '' && piso.data?.diasReservadosEntrada !== null) {
				tempEntrada = piso.data?.diasReservadosEntrada?.split(',');
				tempEntrada = tempEntrada.map((pos) => (pos = new Date(pos)));
			}
			setddisabledDates(temp);
			setddisabledDatesEntrada(tempEntrada);
			setddisabledDatesSalida(tempSalida);
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

	async function createUsuario() {
		setCalculo(false);
		const usuarioFromMail=await getUsuario(valorDialog.email);
		const values = {
			nombre: valorDialog.name,
			apellidos: '',
			correo: valorDialog.email,
			contrasenna: generatePassword(10),
			expiracion: new Date().toString(),
			rol: 2,
		};
		if(usuarioFromMail.length===0){			
			AxiosConexionConfig.post(linkUsuario, JSON.stringify(values))
				.then((response) => {				
					const diasReservados=cantDias()
					createReservation(response.data.idusuario,diasReservados)
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
		}else{			
			const diasReservados=cantDias()
			createReservation(usuarioFromMail[0].idusuario,diasReservados)
		}		
	}

	const cantDias=()=>{
		let dias = [];
		const inicio = moment(dateBegin);
		const fin = moment(dateEnd);
		const dateB = new Date(dateBegin);
		let contador = fin.diff(inicio, 'days') - 1;
		// if(contador<1) dias.push(sumarDias(dateB, 0));
		while (contador > 0) {
			let a = new Date(dateBegin);
			dias.push(sumarDias(a, contador));
			contador--;
		}
		const diasReservados = dias.toString();
		return diasReservados;
	}

	const createReservation=(idUsuario,diasReservados)=>{
		const reservacion = {
			idusuario: idUsuario,
			idpiso: data.idpiso,
			fechaFin: dateEnd,
			fechaInicio: dateBegin,
			aceptada: false,
			cantPersonas: huesped,
			precio: totalCalculo,
		};		
		AxiosConexionConfig.post(apiReservaciones, JSON.stringify(reservacion))
		.then(() => {
			AxiosConexionConfig.patch(`${apiPiso}/${data.idpiso}`,
				JSON.stringify({ diasReservados: diasReservados + ',' + data.diasReservados, 
					diasReservadosEntrada: new Date(dateBegin) + ',' + data.diasReservadosEntrada, 
					diasReservadosSalida:  new Date(dateEnd)+ ',' + data.diasReservadosSalida }))
				.then(() => {
				getData();
				sendMail();
			});
		});
	}

	const generatePassword=(length)=>{
		let pass='';
		const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*/&%"
		for (let i=0; i < length; i++){
			pass += characters.charAt(Math.floor(Math.random()*characters.length));			
		}
		return pass;
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
			pisoNombre: props.i18n.language === 'es'?data.nombre :data.nombreI,
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
				{imagenes?.length>0?
				<Carousel
					value={imagenes}
					containerClassName=' '
					numVisible={1}
					numScroll={1}
					itemTemplate={productTemplate}
				/>:
				<CardImg
							className='cargando'
							style={{height: "200px",width: "200px"}}
							src={noImagenDisponible}
							top
						></CardImg>}
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
							disabledDates={disabledDates.concat(disabledDatesEntrada)}
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
							disabledDates={disabledDates.concat(disabledDatesSalida)}
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
					<Row >
						{amenities?.map((dato, index) => {
							return <Fragment key={index}>{dato}</Fragment>;
						})}
					</Row>
				</div>
			</div>
		);
	};
	

	const showTips=()=>{		
		if(props.currentUsuario!=='' && tips!==null){
			const res=tips.map((tip, index)=>(
				<div className='p-d-flex p-col-12' key={index}>
					<div className='p-col-3 p-text-bold' >
						{props.i18n.language === 'es'?tip.nombre :tip.nombreI}:
					</div>
					<div className='p-col-9'>
						{props.i18n.language === 'es'?tip.descripcion :tip.descripcionI}
					</div>
				</div>
			))
			return (
				<div className='p-col-12 p-md-8'>
					<div>
						<b>{t('Información relevante')}:</b>
					</div>
					<div>
						{res}
					</div>
				</div>)
		}
	}
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
							<div className=' p-col-12 p-p-0 floatLeft'>{DatosPiso()}</div>
							
						</div>
					</div>
					<div className='p-col-12 p-d-flex p-flex-column p-flex-md-row'>
						<div className='p-col-12 p-md-1'></div>
						<div className='p-col-12 p-md-10'>
							<Acordion data={data}/>
						</div>
					</div>
					<div className=' p-col-12 p-d-flex p-flex-column p-flex-md-row'>
					<div className='p-col-12 p-md-1'></div>
						<div className=' p-col-12 p-md-10 p-d-flex p-flex-column p-flex-md-row p-p-0  fontFamily'>
							{tips!==null && tips?.length!==0 ? 
							(
								<>
									{showTips()}
									<div className={`p-col-12 p-md-4 p-p-0`}>
										<Maps piso={data} />
									</div>
								</>
							)
							:
							<div className={`p-col-12  p-p-0`}>
								<Maps piso={data} />
							</div>}
						</div>
					</div>
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
	currentUsuario: state.usuario.currentUsuario
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentNavBarColor: (navBarColor) => dispatch(setCurrentNavBarColor(navBarColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('translations')(Piso));
