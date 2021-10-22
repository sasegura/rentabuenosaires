import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import classNames from 'classnames';
//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

//reactstrap

import { withTranslation } from 'react-i18next';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import moment from 'moment';
import { apiPiso, apiReservaciones } from 'configuracion/constantes';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import getTips from 'pages/Reservaciones/getTips';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { SettingTwoTone } from '@ant-design/icons';

const Tips = (props) => {
	const toast = useRef(null);
	const [load, setload] = useState(false);
	const [reload, setreload] = useState(false);
	const [pisos, setPisos] = useState(null);
	const [tips, settips] = useState(null);
	const [selectedPiso, setSelectedPiso] = useState(null);
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [nombreI, setNombreI] = useState('');
	const [descripcionI, setDescripcionI] = useState('');
	const [tipDialog, settipDialog] = useState(false);
	const [newT, setNewT] = useState(false);

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

	useEffect(async () => {
		if (selectedPiso !== null) {
			setload(true);
			const allTips = await getTips(selectedPiso.idpiso);
			settips(allTips);
			if (allTips) setload(false);
		}
	}, [selectedPiso, reload]);

	const getData = () => {
		AxiosConexionConfig.get(apiPiso).then((respuesta) => {
			setPisos(respuesta.data);
		});
	};

	function deleteReser(data) {
		AxiosConexionConfig.delete(`/tips/${data.idtips}`)
			.then(() => {
				setreload(!reload);
				//getReservaciones();
			})
			.catch((e) => {
				console.log(e);
			});
	}

	const [tip, setTip] = useState(null);
	const actionBodyTemplate = (rowData) => {
		const s = new Date(rowData.fechaInicio) < new Date();
		return (
			<React.Fragment>
				<Button
					disabled={s}
					icon='pi pi-pencil'
					className='p-button-rounded p-button-success p-mr-2'
					onClick={() => {
						setTip(rowData);
						setNombre(rowData.nombre);
						setDescripcion(rowData.descripcion);
						setNombreI(rowData.nombreI);
						setDescripcionI(rowData.descripcionI);
						settipDialog(rowData);
					}}
				/>

				<Button
					icon='pi pi-trash'
					className='p-button-rounded p-button-warning'
					onClick={() => deleteReser(rowData)}
				/>
			</React.Fragment>
		);
	};

	const onPisosChange = (value) => {
		setSelectedPiso(value.value);
	};

	const destinoDialogFooter = (
		<React.Fragment>
			<Button
				label='Cancel'
				icon='pi pi-times'
				className='p-button-text'
				onClick={() => settipDialog(false)}
			/>
			<Button
				label='Save'
				icon='pi pi-check'
				className='p-button-text'
				onClick={() => saveTip(false)}
			/>
		</React.Fragment>
	);

	const dialog = () => {
		return (
			<Dialog
				visible={tipDialog}
				style={{ width: '450px' }}
				header='Editar destino'
				modal
				className='p-fluid'
				footer={destinoDialogFooter}
				onHide={() => settipDialog(false)}
			>
				<div className='p-field'>
					<label htmlFor='nombreTip'>Nombre</label>
					<InputText
						id='nombreTip'
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
						required
						autoFocus
						className={classNames({
							'p-invalid': !nombre,
						})}
					/>
					{!nombre && <small className='p-error'>Name is required.</small>}
				</div>
				<div className='p-field'>
					<label htmlFor='nombreTip'>Name</label>
					<InputText
						id='nombreTip'
						value={nombreI}
						onChange={(e) => setNombreI(e.target.value)}
						required
						autoFocus
						className={classNames({
							'p-invalid': !nombreI,
						})}
					/>
					{!nombreI && <small className='p-error'>Name in english is required.</small>}
				</div>
				<div className='p-field'>
					<label htmlFor='descripcion'>Descripción</label>
					<InputText
						id='descripcion'
						value={descripcion}
						onChange={(e) => {
							setDescripcion(e.target.value);
						}}
						required
						className={classNames({
							'p-invalid': !descripcion,
						})}
					/>
					{!descripcion && <small className='p-error'>Descripcion is required.</small>}
				</div>
				<div className='p-field'>
					<label htmlFor='descripcionI'>Description</label>
					<InputText
						id='descripcionI'
						value={descripcionI}
						onChange={(e) => {
							setDescripcionI(e.target.value);
						}}
						required
						className={classNames({
							'p-invalid': !descripcionI,
						})}
					/>
					{!descripcionI && (
						<small className='p-error'>Descripcion in english is required.</small>
					)}
				</div>
			</Dialog>
		);
	};

	async function saveTip() {
		setload(true);
		const valores = {
			nombre,
			descripcion,
			nombreI,
			descripcionI,
		};
		try {
			if (!newT) {
				await AxiosConexionConfig.patch('/tips/' + tip.idtips, valores);
			} else {
				valores.idpiso = selectedPiso.idpiso.toString();
				valores.idcoordenada = 1;
				await AxiosConexionConfig.post('/tips', valores);
				setNewT(false);
			}
		} catch (e) {
			console.log(e);
		}
		setload(false);
		settipDialog(false);
		setreload(!reload);
	}

	const headerColumnTemplate = (
		<div className='table-header'>
			<Button
				label='Add'
				icon='pi pi-plus'
				className='p-button-text'
				style={{ color: 'white' }}
				onClick={() => {
					setNewT(true);
					setNombre('');
					setDescripcion('');
					setNombreI('');
					setDescripcionI('');
					settipDialog(true);
				}}
			/>
		</div>
	);
	return (
		<>
			<IndexNavbar />
			<Toast baseZIndex={500} ref={toast} />
			<div className='section text-center text-center ml-auto mr-auto fontFamily'>
				<h2>Tips</h2>

				<Dropdown
					value={selectedPiso}
					options={pisos}
					onChange={onPisosChange}
					optionLabel='nombre'
					placeholder='Select a City'
					className='p-col-8'
				/>
				{selectedPiso && (
					<DataTable
						value={tips}
						loading={load}
						paginator
						paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
						currentPageReportTemplate='Showing {first} to {last} of {totalRecords}'
						rows={10}
						rowsPerPageOptions={[10, 20, 50]}
					>
						<Column field='idtips' header='idtips'></Column>
						<Column field='nombre' header='Nombre'></Column>
						<Column field='descripcion' header='Descripción'></Column>
						<Column field='idpiso' header='idpiso'></Column>

						<Column header={headerColumnTemplate} body={actionBodyTemplate}></Column>
					</DataTable>
				)}
			</div>
			{dialog()}
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setCurrentNavBarColor: (navBarColor) => dispatch(setCurrentNavBarColor(navBarColor)),
});

export default connect(null, mapDispatchToProps)(withTranslation('translations')(Tips));
