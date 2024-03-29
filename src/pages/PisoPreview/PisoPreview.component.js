import React, { Fragment } from 'react';
import { useState } from 'react';

import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';

import './pisoPreview.scss';
import { Carousel } from 'primereact/carousel';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import cargando from '../../assets/img/loading.gif';
import MyCardComponent from 'components/MyCard/MyCard.component';
import { withTranslation } from 'react-i18next';
import IndexNavbar from 'components/Navbars/IndexNavbar';

const PisoPreview = (props) => {
	const { t } = props;
	props.setCurrentNavBarColor(false);
	const [loadding, setLoadding] = useState(true);
	const [reload, setreload] = useState(true);
	const [pisos, setPisos] = useState([]);

	React.useEffect(() => {
		props.setCurrentNavBarColor(false);
	});
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

	async function getPiso() {
		setLoadding(true);
		const url = '/pisos?filter[where][iddestino]=' + props.currentDestino.id;
		try {
			const piso = await AxiosConexionConfig.get(url);
			setPisos(piso.data);
			setLoadding(false);
			setreload(!reload);
		} catch (e) {
			console.log(e);
			setLoadding(false);
		}
	}

	React.useEffect(() => {
		getPiso();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.currentDestino]);

	const responsiveOptions = [
		{
			breakpoint: '1024px',
			numVisible: 3,
			numScroll: 1,
		},
		{
			breakpoint: '600px',
			numVisible: 2,
			numScroll: 1,
		},
		{
			breakpoint: '480px',
			numVisible: 1,
			numScroll: 1,
		},
	];
	const destino = () => {
		return (
			<div className='pisoPrev'>
				<h1 className='h1 fontFamily'>{props.i18n.language === 'es'?props.currentDestino.nombre.toUpperCase():props.currentDestino.nombreI.toUpperCase()}</h1>
				<div className='p-col-12'>
					<div className='collection-preview'>
						{!loadding ? (
							pisos.length > 2 ? (
								<Carousel
									value={pisos}
									numVisible={3}
									numScroll={1}
									className='p-col-12 p-md-11 fontFamily'
									responsiveOptions={responsiveOptions}
									itemTemplate={MyCardComponent}
								/>
							) : pisos.length > 1 ? (
								<Carousel
									value={pisos}
									numVisible={2}
									numScroll={1}
									className='p-col-12 p-md-8 fontFamily'
									responsiveOptions={responsiveOptions}
									itemTemplate={MyCardComponent}
								/>
							) : pisos.length > 0 ? (
								<Carousel
									value={pisos}
									numVisible={1}
									numScroll={1}
									className='p-col-12 p-md-4 fontFamily'
									responsiveOptions={responsiveOptions}
									itemTemplate={MyCardComponent}
								/>
							) : (
								<Fragment>
									{t('Aun no hay pisos disponibles en este destino.')}
								</Fragment>
							)
						) : (
							<img src={cargando} alt='Cargando' />
						)}
					</div>
				</div>
			</div>
		);
	};

	const nodestino = () => {
		return (
			<div className='pisoPrev'>
				<h1 className='h1'>{'No hay destinos disponibles'.toUpperCase()}</h1>
			</div>
		);
	};

	return (
		<Fragment>
			<IndexNavbar />
			<div className='separador' />
			{props.currentDestino !== null ? destino() : nodestino()}
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
)(withTranslation('translations')(PisoPreview));
