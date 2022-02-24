import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

//reactstrap

import { withTranslation } from 'react-i18next';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import moment from 'moment';
import {
	apiUsuario,
	apiDestinos,
	apiPiso,
	apiReservaciones,
	apiSendMailCitaConfirmada,
	apisendMailCitaCancelada,
} from 'configuracion/constantes';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import './Reservaciones.scss';

const Reservaciones = (props) => {
	const toast = useRef(null);
	const [load, setload] = useState(false);
	const [pisos, setPisos] = useState(null);
	const [destinos, setDestinos] = useState(null);
	const [usuarios, setUsuarios] = useState(null);
	const [reservaciones, setReservaciones] = useState([]);

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

	useEffect(() => {
		setload(true);
		getData();
	}, []);

	const getData = () => {
		AxiosConexionConfig.get(apiPiso).then((respuesta) => {
			setPisos(respuesta.data);
			AxiosConexionConfig.get(apiUsuario).then((respuesta) => {
				setUsuarios(respuesta.data);
				AxiosConexionConfig.get(apiDestinos).then((respuesta) => {
					setDestinos(respuesta.data);

					getReservaciones();
				});
			});
		});
	};
	//Obtener reservaciones
	async function getReservaciones() {
		setload(true);
		AxiosConexionConfig.get(apiReservaciones)
			.then((response) => {
				setReservaciones(response.data);
				setload(false);
			})
			.catch((e) => {
				console.log(e);
				setload(false);
			});
	}

	function sumarDias(fecha, dias) {
		fecha.setDate(fecha.getDate() + dias);
		return fecha;
	}

	function deleteReser(data) {
		let dias = [];
		const inicio = moment(data.fechaInicio);
		const fin = moment(data.fechaFin);
		const dateB = new Date(data.fechaInicio);
		let contador = fin.diff(inicio, 'days');
		dias.push(sumarDias(dateB, 0));
		while (contador > 0) {
			let a = new Date(data.fechaInicio);
			dias.push(sumarDias(a, contador));
			console.log(dias);
			contador--;
			console.log(contador);
		}
		AxiosConexionConfig.delete(`${apiReservaciones}/${data.id}`)
			.then(() => {
				eliminarDias(data.fechaInicio, data.fechaFin, data.idpiso);
				//getReservaciones();
			})
			.catch((e) => {
				console.log(e);
			});
	}

	const eliminarDias = (fechaInicial, fechaFinal, idpiso) => {
		const pisoById = pisos.filter((piso) => piso.idpiso === idpiso);
		const reservedDays = [];
		pisoById[0]?.diasReservados?.split(',').forEach((day) => {
			if (
				moment(day).valueOf() < moment(fechaInicial).valueOf() ||
				moment(day).valueOf() > moment(fechaFinal).valueOf()
			) {
				reservedDays.push(day);
			}
		});

		let reservadosEntrada = [];
		let reservadosSalida = [];

		if (pisoById.diasReservadosEntrada) {
			const entrada = pisoById.diasReservadosEntrada.split('');
			const entradaIndex = entrada.findIndex((dia) => dia === fechaInicial);
			reservadosEntrada = entrada.splice(1, entradaIndex);
		}
		if (pisoById.diasReservadosSalida) {
			const salida = pisoById.diasReservadosSalida.split('');
			const salidaIndex = salida.findIndex((dia) => dia === fechaFinal);
			reservadosSalida = salida.splice(1, salidaIndex);
		}
		const diasReservados = reservedDays.length > 0 ? reservedDays.toString() : '';

		const diasReservadosEntrada = reservadosEntrada.toString();
		const diasReservadosSalida = reservadosSalida.toString();
		AxiosConexionConfig.patch(
			`${apiPiso}/${idpiso}`,
			JSON.stringify({ diasReservados, diasReservadosSalida, diasReservadosEntrada })
		).then((re) => {
			console.log(re);
			getData();
		});
	};

	const getPisoId = (id) => {
		let respuesta = null;
		pisos.forEach((piso) => {
			if (piso.idpiso === id) {
				respuesta = piso;
			}
		});
		return respuesta;
	};
	const getUsuarioId = (id) => {
		let respuesta = null;
		usuarios.forEach((usuario) => {
			if (usuario.idusuario === id) {
				respuesta = usuario;
			}
		});
		return respuesta;
	};
	const getDestinoId = (id) => {
		let respuesta = null;
		destinos.forEach((destino) => {
			if (destino.iddestino === id) {
				respuesta = destino;
			}
		});
		return respuesta;
	};

	const confirmarCancelar = (url, values, text) => {
		AxiosConexionConfig.post(url, JSON.stringify(values))
			.then((response) => {
				getReservaciones();
				if (response.data) {
					toast.current.show({
						severity: 'success',
						summary: 'Success Message',
						detail: text,
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
					summary: 'Error Message',
					detail: e,
					life: 3000,
				});
				console.log(e);
			});
	};

	async function sendMailCitaConfirmada(datos, acepted) {
		const piso = getPisoId(datos.idpiso);
		const usuario = getUsuarioId(datos.idusuario);
		const values = {
			correoCliente: usuario.correo,
			correoAdmin: 'administrador@e-homeselect.com',
			fechaInicio: getDate(datos.fechaInicio),
			fechaFin: moment(datos.fechaFin).add(0, 'days').format('DD/MM/YYYY'),
			cantidadPersonas: datos.cantPersonas,
			precio: datos.precio,
			pisoNombre: piso.nombre,
			pisoNombreI: piso.nombreI,
			clienteNombre: usuario.nombre,
			destino: getDestinoId(piso.iddestino).nombre,
			telefono: usuario.telefono,
			password: usuario.contrasenna,
		};
		const aceptada = {
			aceptada: acepted ? true : false,
		};
		const cancelada = {
			cancelada: acepted ? false : true,
		};
		if (acepted) {
			await AxiosConexionConfig.patch(
				`${apiReservaciones}/${datos.id}`,
				JSON.stringify(aceptada)
			);
			confirmarCancelar(
				apiSendMailCitaConfirmada,
				values,
				`Correo de confirmacion enviado al cliente.`
			);
		} else {
			await AxiosConexionConfig.patch(
				`${apiReservaciones}/${datos.id}`,
				JSON.stringify(cancelada)
			).then((data) => {
				eliminarDias(datos.fechaInicio, datos.fechaFin, datos.idpiso);
			});
			confirmarCancelar(
				apisendMailCitaCancelada,
				values,
				`Correo de cancelacion enviado al cliente.`
			);
		}
	}
	const getDate = (date) => {
		const temp = new Date(date);
		let respuesta = temp.getDate() + '/' + (temp.getMonth() + 1) + '/' + temp.getFullYear();
		return respuesta;
	};

	const actionBodyTemplate = (rowData) => {
		var date = new Date();
		date.setDate(date.getDate() - 1);
		const s = new Date(rowData.fechaInicio) < date;
		return (
			<React.Fragment>
				{!rowData.aceptada && !rowData.cancelada ? (
					<>
						<Button
							disabled={s}
							icon='pi pi-check'
							className='p-button-rounded p-button-success p-mr-2'
							onClick={() => sendMailCitaConfirmada(rowData, true)}
						/>
						<Button
							disabled={s}
							icon='pi pi-times'
							className='p-button-rounded p-button-danger p-mr-2'
							onClick={() => sendMailCitaConfirmada(rowData, false)}
						/>
					</>
				) : rowData.aceptada && !rowData.cancelada ? (
					<Button
						disabled={s}
						icon='pi pi-times'
						className='p-button-rounded p-button-danger p-mr-2'
						onClick={() => sendMailCitaConfirmada(rowData, false)}
					/>
				) : null}
				<Button
					icon='pi pi-trash'
					className='p-button-rounded p-button-warning'
					onClick={() => deleteReser(rowData)}
				/>
			</React.Fragment>
		);
	};

	const fechaBodyTemplate = (row) => {
		return getDate(row);
	};

	const aceptadaTemplate = (rowData) => {
		return <span>{rowData ? 'Si' : 'No'}</span>;
	};
	const columnTemplate = (rowData) => {
		return <span>{rowData}</span>;
	};
	const rowClass = (data) => {
		return {
			'row-accessories': data.cancelada === true,
		};
	};

	return (
		<>
			<IndexNavbar />
			<Toast baseZIndex={500} ref={toast} />
			<div className='section text-center text-center ml-auto mr-auto fontFamily'>
				<h2>Reservaciones</h2>
				<DataTable
					value={reservaciones}
					loading={load}
					paginator
					paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
					currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
					rows={10}
					rowClassName={rowClass}
					rowsPerPageOptions={[10, 20, 50]}
				>
					<Column
						field='aceptada'
						header='Confirmada'
						body={(row) => aceptadaTemplate(row.aceptada)}
					></Column>
					<Column
						field='idpiso'
						header='idpiso'
						body={(row) => columnTemplate(getPisoId(row.idpiso).nombre)}
					></Column>
					<Column
						field='idusuario'
						header='Usuario'
						body={(row) => columnTemplate(getUsuarioId(row.idusuario).nombre)}
					></Column>
					<Column field='precio' header='Precio'></Column>
					<Column
						field='fechaInicio'
						header='fecha Inicio'
						body={(row) => fechaBodyTemplate(row.fechaInicio)}
					></Column>
					<Column
						field='fechaFin'
						header='fechaFin'
						body={(row) => fechaBodyTemplate(row.fechaFin)}
					></Column>
					<Column field='cantPersonas' header='Cant Personas'></Column>

					<Column body={actionBodyTemplate}></Column>
				</DataTable>
			</div>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setCurrentNavBarColor: (navBarColor) => dispatch(setCurrentNavBarColor(navBarColor)),
});

export default connect(null, mapDispatchToProps)(withTranslation('translations')(Reservaciones));
