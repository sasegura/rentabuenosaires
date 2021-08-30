// import MyCard from "components/MyCard/MyCard.component";
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';
import './css/pisoPreview.scss';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';

import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import { useState } from 'react';
import { withTranslation } from 'react-i18next';

const AdisionarPiso = (props) => {
	const { t } = props;

	const [loadPiso, setLoadPiso] = useState(false);
	const [piso, setPiso] = useState(null);
	const [aireacondicionado, setAireacondicionado] = useState(false);
	const [calefaccion, setcalefaccion] = useState(false);
	const [tvcable, settvcable] = useState(false);
	const [wifi, setwifi] = useState(false);

	React.useEffect(() => {
		if (props.idpiso !== null) {
			getPisoSelecionado();
		}
	}, [props.idpiso]);

	async function getPisoSelecionado() {
		setLoadPiso(false);
		const url = '/pisos?filter[where][idpiso]=' + props.idpiso;
		try {
			const respuesta = await AxiosConexionConfig.get(url);
			if (respuesta.data.length > 0) {
				setPiso(respuesta.data[0]);
				setAireacondicionado(respuesta.data[0].aireacondicionado);
				setcalefaccion(respuesta.data[0].calefaccion);
				settvcable(respuesta.data[0].tvcable);
				setwifi(respuesta.data[0].wifi);
				setLoadPiso(true);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function submitValues() {
		const url = '/pisos/' + piso.idpiso;
		const values = {
			tvcable: tvcable,
			aireacondicionado: aireacondicionado,
			calefaccion: calefaccion,
			wifi: wifi,
		};
		try {
			const respuesta = await AxiosConexionConfig.patch(url, JSON.stringify(values));
			console.log(respuesta);
		} catch (e) {
			console.log(e);
		}
	}
	const pisoSelecionado = () => {
		return (
			<div>
				<div>
					{t('piso')}
					{': ' + piso.idpiso}
				</div>
				<div>
					{t('aireacondicionado')}
					{': ' + piso.aireacondicionado}
					<InputSwitch
						checked={aireacondicionado}
						onChange={(e) => setAireacondicionado(e.value)}
					/>
				</div>
				<div>
					{t('calefaccion')}
					{': ' + piso.calefaccion}
					<InputSwitch checked={calefaccion} onChange={(e) => setcalefaccion(e.value)} />
				</div>
				<div>
					{t('cantbannos')}
					{': ' + piso.cantbannos}
				</div>
				<div>
					{t('cantpersonas')}
					{': ' + piso.cantpersonas}
				</div>
				<div>
					{t('direccion')}
					{': ' + piso.direccion}
				</div>
				<div>
					{t('metroscuadrados')}
					{': ' + piso.metroscuadrados}
				</div>
				<div>
					{t('tvcable')}
					{': ' + piso.tvcable}
					<InputSwitch checked={tvcable} onChange={(e) => settvcable(e.value)} />
				</div>
				<div>
					{t('wifi')}
					{': ' + piso.wifi}
					<InputSwitch checked={wifi} onChange={(e) => setwifi(e.value)} />
				</div>
			</div>
		);
	};

	return (
		<Fragment>
			<div className='p-col-12 fontFamily'>
				{loadPiso ? pisoSelecionado() : <Fragment></Fragment>}
			</div>
			<Button label='Submit' onClick={() => submitValues()} />
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	currentDestino: state.destino.currentDestino,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentNavBarColor: (navBarColor) => dispatch(setCurrentNavBarColor(navBarColor)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withTranslation('translations')(AdisionarPiso));
