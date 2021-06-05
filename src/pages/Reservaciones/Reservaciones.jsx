import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';
import { Button } from 'primereact/button';
//reactstrap

import { withTranslation } from 'react-i18next';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import moment from 'moment';
import { apiUsuario, apiDestinos, apiPiso, apiReservaciones } from 'configuracion/constantes';

const Reservaciones = (props) => {
	const { t } = props;
	const [load, setload] = useState(false);
	const [pisos, setPisos] = useState(null);
	const [destinos, setDestinos] = useState(null);
	const [usuarios, setUsuarios] = useState(null);
	const [reservaciones, setReservaciones] = useState([]);
	props.setCurrentNavBarColor(false);

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
			if (piso.id === id) {
				respuesta = piso;
			}
		});
		return respuesta;
	};
	const getUsuarioId = (id) => {
		let respuesta = null;
		usuarios.map((usuario) => {
			if (usuario.id === id) {
				respuesta = usuario;
			}
		});
		return respuesta;
	};
	const getDestinoId = (id) => {
		let respuesta = null;
		destinos.map((destino) => {
			if (destino.id === id) {
				respuesta = destino;
			}
		});
		return respuesta;
	};
	async function sendMailCitaConfirmada(datos) {
		console.log(datos);
		const url = '/sendMailCitaConfirmada';
		const piso = getPisoId(datos.idpiso);
		const usuario = getUsuarioId(datos.idusuario);
		const values = {
			correoCliente: usuario.email,
			correoAdmin: 'administrador@e-homeselect.com',
			fechaInicio: getDate(datos.fechaInicio),
			fechaFin: getDate(datos.fechaFin),
			cantidadPersonas: datos.cantPersonas,
			precio: datos.precio,
			pisoNombre: piso.nombre,
			clienteNombre: usuario.name,
			destino: getDestinoId(piso.iddestino).nombre,
			telefono: usuario.telefono,
			//texto: valorDialog.texto,
		};
		/*AxiosConexionConfig.post(url, JSON.stringify(values))
			.then((response) => {
				console.log(response);
				if (response.data) {
					toast.current.show({
						severity: 'success',
						summary: 'Success Message',
						detail: `Correo enviado al cliente.`,
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
			});*/
	}

	const getDate = (date) => {
		const temp = new Date(date);
		let respuesta = temp.getDay() + '/' + (temp.getMonth() + 1) + '/' + temp.getFullYear();
		return respuesta;
	};

	useEffect(() => {
		getReservaciones();
		AxiosConexionConfig.get(apiPiso).then((respuesta) => {
			setPisos(respuesta.data);
		});
		AxiosConexionConfig.get(apiUsuario).then((respuesta) => {
			setUsuarios(respuesta.data);
		});
		AxiosConexionConfig.get(apiDestinos).then((respuesta) => {
			setDestinos(respuesta.data);
		});
	}, []);

	const actionBodyTemplate = (rowData) => {
		return (
			<React.Fragment>
				<Button
					icon='pi pi-pencil'
					className='p-button-rounded p-button-success p-mr-2'
					onClick={() => sendMailCitaConfirmada(rowData)}
				/>
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
	return (
		<>
			<div className='section text-center text-center ml-auto mr-auto'>
				<h2>Reservaciones</h2>
				<DataTable value={reservaciones} loading={load}>
					<Column field='idpiso' header='idpiso'></Column>
					<Column field='idusuario' header='idusuario'></Column>
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
