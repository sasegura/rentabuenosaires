import React, { Fragment } from 'react';
import { useState } from 'react';

//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';

//CSS
import './pisoPreview.scss';
//Components
import MyCard from 'components/MyCard/MyCard.component';
import { Carousel } from 'primereact/carousel';
import CardPiso from './CardPiso';
//Conexion
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';
import cargando from '../../assets/img/loading.gif';
import MyCardComponent from 'components/MyCard/MyCard.component';
import { withTranslation } from 'react-i18next';

const PisoPreview = (props) => {
	const { t } = props;
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

	//console.log(props.currentDestino)
	React.useEffect(() => {
		//console.log(props.currentDestino)
		getPiso();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.currentDestino]);

	const responsiveOptions = [
		{
			breakpoint: '1024px',
			numVisible: 3,
			numScroll: 3,
		},
		{
			breakpoint: '600px',
			numVisible: 2,
			numScroll: 2,
		},
		{
			breakpoint: '480px',
			numVisible: 1,
			numScroll: 1,
		},
	];
	const destino = () => {
		// console.log(pisos.length)
		return (
			<div className='pisoPrev'>
				<h1 className='h1 fontFamily'>{props.currentDestino.nombre.toUpperCase()}</h1>
				{/*<img src={"data:image/png;base64," + img} />*/}
				<div className='p-col-12'>
					<div className='collection-preview'>
						{!loadding ? (
							pisos.length > 0 ? (
								<Carousel
									value={pisos}
									numVisible={3}
									numScroll={1}
									className='p-col-11 fontFamily'
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
