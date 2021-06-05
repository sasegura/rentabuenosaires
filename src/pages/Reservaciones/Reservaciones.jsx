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

const Reservaciones = (props) => {
	const { t } = props;
	const toast = useRef(null);
	const [load, setload] = useState(false);
	const [pisos, setPisos] = useState(null);
	const [destinos, setDestinos] = useState(null);
	const [usuarios, setUsuarios] = useState(null);
	const [reservaciones, setReservaciones] = useState([]);
	props.setCurrentNavBarColor(false);

	useEffect(() => {
		setload(true);
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
	}, []);

	//Obtener reservaciones
	async function getReservaciones() {
		setload(true);
		AxiosConexionConfig.get(apiReservaciones)
			.then((response) => {
				setReservaciones(response.data);
				console.log(response.data);
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
			.then((response) => {
				getReservaciones();
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	const getPisoId = (id) => {
		let respuesta = null;
		pisos.map((piso) => {
			if (piso.idpiso === id) {
				respuesta = piso;
			}
		});
		return respuesta;
	};
	const getUsuarioId = (id) => {
		let respuesta = null;
		usuarios.map((usuario) => {
			if (usuario.idusuario === id) {
				respuesta = usuario;
			}
		});
		return respuesta;
	};
	const getDestinoId = (id) => {
		let respuesta = null;
		destinos.map((destino) => {
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
	async function sendMailCitaConfirmada(datos) {
		const piso = getPisoId(datos.idpiso);
		const usuario = getUsuarioId(datos.idusuario);
		const values = {
			correoCliente: usuario.correo,
			correoAdmin: 'administrador@e-homeselect.com',
			fechaInicio: getDate(datos.fechaInicio),
			fechaFin: getDate(datos.fechaFin),
			cantidadPersonas: datos.cantPersonas,
			precio: datos.precio,
			pisoNombre: piso.nombre,
			clienteNombre: usuario.nombre,
			destino: getDestinoId(piso.iddestino).nombre,
			telefono: usuario.telefono,
		};
		const aceptada = {
			aceptada: !datos.aceptada,
		};
		if (datos.aceptada) {
			AxiosConexionConfig.patch(`${apiReservaciones}/${datos.id}`, JSON.stringify(aceptada));
			confirmarCancelar(
				apisendMailCitaCancelada,
				values,
				`Correo de cancelacion enviado al cliente.`
			);
		} else {
			AxiosConexionConfig.patch(`${apiReservaciones}/${datos.id}`, JSON.stringify(aceptada));
			confirmarCancelar(
				apiSendMailCitaConfirmada,
				values,
				`Correo de confirmacion enviado al cliente.`
			);
		}
	}
	const getDate = (date) => {
		const temp = new Date(date);
		let respuesta = temp.getDate() + '/' + (temp.getMonth() + 1) + '/' + temp.getFullYear();
		return respuesta;
	};

	const actionBodyTemplate = (rowData) => {
		return (
			<React.Fragment>
				{!rowData.aceptada ? (
					<Button
						icon='pi pi-check'
						className='p-button-rounded p-button-success p-mr-2'
						onClick={() => sendMailCitaConfirmada(rowData)}
					/>
				) : (
					<Button
						icon='pi pi-times'
						className='p-button-rounded p-button-danger p-mr-2'
						onClick={() => sendMailCitaConfirmada(rowData)}
					/>
				)}
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
	return (
		<>
			<Toast baseZIndex={500} ref={toast} />
			<div className='section text-center text-center ml-auto mr-auto'>
				<h2>Reservaciones</h2>
				<DataTable value={reservaciones} loading={load}>
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
