import React, { Fragment, useRef, useState } from 'react';
import classNames from 'classnames';
//Redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';

//PrimeReact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

//CSS
import '../PisoPreview/pisoPreview.scss';
import './Adicionar.style.scss';

//Conexion
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';

//Componente
import AdicionarTabla from './AdicionarTabla';
import { Col, Container, InputGroup, Row } from 'reactstrap';
import IndexNavbar from 'components/Navbars/IndexNavbar';

const Adicionar = (props) => {
	props.setCurrentNavBarColor(false);

	const [destinos, setDestinos] = useState(null);
	const [selectedDestino, setSelectesDestino] = useState(null);
	const [carga, setCarga] = useState(true);
	const [nombreDestino, setNombreDestino] = useState('');
	const [emptyNombreDestino, setEmptyNombreDestino] = useState('');
	const [destinoDialog, setDestinoDialog] = useState(false);
	const [destinoDeleteDialog, setDestinoDeleteDialog] = useState(false);
	const [destino, setDestino] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	let emptydestino = { nombre: '' };
	const toast = useRef(null);

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
	React.useEffect(() => {
		getDestinos();
	}, [carga]);

	React.useEffect(() => {
		if (selectedDestino !== null) {
			//getPiso();
		}
	}, [selectedDestino]);

	//Obtener destinos
	async function getDestinos() {
		const url = '/destinos';
		try {
			const destino = await AxiosConexionConfig.get(url);
			setDestinos(destino.data);
		} catch (e) {
			console.log(e);
		}
	}

	async function addDestino(e) {
		e.preventDefault();
		const url = '/destinos';
		let destino = {
			nombre: nombreDestino,
		};
		if (nombreDestino !== '') {
			AxiosConexionConfig.post(url, destino)
				.then((respuesta) => {
					setCarga(!carga);
					setNombreDestino('');
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			setEmptyNombreDestino('El nombre no puede ser vacio');
		}
	}

	const setSelectedDestino = (valor) => {
		setSelectesDestino(valor);
	};

	const AdicionarDestno = () => {
		return (
			<Container>
				<h2 className='title'>Adicionar Destino</h2>
				<Row>
					<Col className='text-center ml-auto mr-auto' lg='6' md='8'>
						<InputGroup>
							<InputText
								value={nombreDestino}
								className='borderradius30'
								onChange={(e) => setNombreDestino(e.target.value)}
							/>
						</InputGroup>
						<small className='p-error'>{emptyNombreDestino}</small>
						<div className='send-button'>
							<Button
								block
								className='btn-round'
								color='info'
								href='#pablo'
								onClick={(e) => addDestino(e)}
								size='lg'
							>
								Adicionar
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		);
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

	const editpiso = (piso) => {
		setDestino({ ...piso });
		setDestinoDialog(true);
	};

	const hideDialog = () => {
		setSubmitted(false);
		setDestinoDialog(false);
	};

	const hideDeleteDialog = () => {
		setSubmitted(false);
		setDestinoDeleteDialog(false);
	};

	const confirmDeletepiso = (piso) => {
		setDestino(piso);
		setDestinoDeleteDialog(true);
	};

	const hideDeletepisosDialog = () => {
		setDestinoDeleteDialog(false);
	};

	async function deletepiso() {
		const url = '/destinos/' + destino.iddestino;
		AxiosConexionConfig.delete(url).then(() => {
			setCarga(!carga);
		});
		setDestinoDeleteDialog(false);
		setDestino(emptydestino);
		toast.current.show({
			severity: 'success',
			summary: 'Successful',
			detail: 'Destino Deleted',
			life: 3000,
		});
	}

	const pisoDialogFooter = (
		<React.Fragment>
			<Button
				label='Cancel'
				icon='pi pi-times'
				className='p-button-text'
				onClick={hideDialog}
			/>
			<Button
				label='Save'
				icon='pi pi-check'
				className='p-button-text'
				onClick={savedestino}
			/>
		</React.Fragment>
	);
	const deletepisosDialogFooter = (
		<React.Fragment>
			<Button
				label='No'
				icon='pi pi-times'
				className='p-button-text'
				onClick={hideDeleteDialog}
			/>
			<Button label='Yes' icon='pi pi-check' className='p-button-text' onClick={deletepiso} />
		</React.Fragment>
	);
	async function savedestino() {
		setSubmitted(true);
		const url = '/destinos';
		try {
			await AxiosConexionConfig.patch(url + '/' + destino.iddestino, destino);
		} catch (e) {
			console.log(e);
		}
		setDestinoDialog(false);
		setCarga(!carga);
	}

	const onInputChange = (e, nombre) => {
		const val = (e.target && e.target.value) || '';
		let _piso = { ...destino };
		_piso[`${nombre}`] = val;
		setDestino(_piso);
	};

	const getDestino = () => {
		return (
			<>
				<IndexNavbar />
				<div className='section datatable-responsive-demo p-mb-6'>
					<Toast ref={toast} />
					<div className='p-md-6 p-col-12 floatLeft'>
						<div className={'p-md-6 p-col-12 floatLeft'}>{AdicionarDestno()}</div>
					</div>
					<DataTable
						className='p-datatable-responsive-demo roboto p-col-12 p-md-6 floatLeft'
						value={destinos}
						selection={selectedDestino}
						selectionMode='single'
						onSelectionChange={(e) => setSelectedDestino(e.value)}
						dataKey='iddestino'
					>
						<Column field='nombre' header='Destinos'></Column>
						<Column body={actionBodyTemplate}></Column>
					</DataTable>
					<Dialog
						visible={destinoDialog}
						style={{ width: '450px' }}
						header='Adicionar Piso'
						modal
						className='p-fluid'
						footer={pisoDialogFooter}
						onHide={hideDialog}
					>
						<div className='p-field'>
							<label htmlFor='nombredestino'>Nombre</label>
							<InputText
								id='nombredestino'
								value={destino?.nombre}
								onChange={(e) => onInputChange(e, 'nombre')}
								required
								autoFocus
								className={classNames({
									'p-invalid': submitted && !destino.nombre,
								})}
							/>
							{submitted && !destino?.nombre && (
								<small className='p-error'>Name is required.</small>
							)}
						</div>
					</Dialog>
					<Dialog
						visible={destinoDeleteDialog}
						style={{ width: '450px' }}
						header='Confirm'
						modal
						footer={deletepisosDialogFooter}
						onHide={hideDeletepisosDialog}
					>
						<div className='confirmation-content'>
							<i
								className='pi pi-exclamation-triangle p-mr-3'
								style={{ fontSize: '2rem' }}
							/>
							{destino && (
								<span>Are you sure you want to delete the selected pisos?</span>
							)}
						</div>
					</Dialog>
					{selectedDestino !== null ? (
						<AdicionarTabla destino={selectedDestino} />
					) : (
						<Fragment></Fragment>
					)}
				</div>
			</>
		);
	};

	return (
		<Fragment>
			{getDestino()}
			{
				//pisosDestinoSeleccionado()
			}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	currentDestino: state.destino.currentDestino,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentNavBarColor: (navBarColor) => dispatch(setCurrentNavBarColor(navBarColor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Adicionar);
