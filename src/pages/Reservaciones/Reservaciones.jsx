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
import { apiReservaciones } from 'configuracion/constantes';
import { apiPiso } from 'configuracion/constantes';
import moment from 'moment';

const Reservaciones = (props) => {
	const { t } = props;
	const [load, setload] = useState(false);
	const [pisos, setPisos] = useState(null);
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
		//let temp = dateB;
		dias.push(sumarDias(dateB, 0));
		while (contador > 0) {
			//dias.push(new Date(dateBegin).setDate(new Date(dateBegin).getDate() + 1));
			let a = new Date(data.fechaInicio);
			dias.push(sumarDias(a, contador));
			console.log(dias);
			//temp.setDate(temp.getDate() + 1);
			//dias.push(new Date(dateBegin).getDate() + contador);
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

	useEffect(() => {
		getReservaciones();
		AxiosConexionConfig.get(apiPiso).then((respuesta) => {
			setPisos(respuesta.data);
		});
	}, []);

	const actionBodyTemplate = (rowData) => {
		return (
			<React.Fragment>
				<Button
					icon='pi pi-pencil'
					className='p-button-rounded p-button-success p-mr-2'
					onClick={() => deleteReservacion(rowData)}
				/>
				<Button
					icon='pi pi-trash'
					className='p-button-rounded p-button-warning'
					onClick={() => deleteReser(rowData)}
				/>
			</React.Fragment>
		);
	};

	const deleteReservacion = (rowData) => {
		console.log(rowData);
	};

	return (
		<>
			<div className='section section-contact-us text-center text-center ml-auto mr-auto col-md-8 col-lg-6'>
				<h2>Reservaciones</h2>
				<DataTable value={reservaciones} loading={load}>
					<Column field='idpiso' header='idpiso'></Column>
					<Column field='idusuario' header='idusuario'></Column>
					<Column field='fechaInicio' header='fecha Inicio'></Column>
					<Column field='fechaFin' header='fechaFin'></Column>
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
