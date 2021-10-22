import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
// reactstrap components
import { Card, CardImg, CardBody, Button } from 'reactstrap';
import { Tooltip } from 'primereact/tooltip';
import './MyCard.style.scss';
import { useHistory, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import AxiosConexionConfig from 'conexion/AxiosConexionConfig';

import cargando from '../../assets/img/loading.gif';
import noImagenDisponible from '../../assets/img/Imagen-no-disponible.png';
import CardHeader from './CardHeader';
import Currency from 'components/Currency';
// core components

function MyCard(props, { match, destino, link, history, cantHab, nombre }) {
	const [noImagen, setNoImagen] = useState(false);
	const historyy = useHistory();
	React.useEffect(() => {
		getImagen();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		historyy.push('/piso?' + props.idpiso);
	};

	async function getImagen() {
		const idPiso = props.idpiso;

		const url =
			'/imagen?filter[where][and][0][idpiso]=' +
			idPiso +
			'&filter[where][and][1][portada]=true';
		const urlNoPortada = '/imagen?filter[where][idpiso]=' + idPiso;

		try {
			const imagen = await AxiosConexionConfig.get(url);
			if (imagen.data[0].imagen === null) {
				setNoImagen(true);
			} else {
				if (imagen.data.length === 0) {
					const imagen1 = await AxiosConexionConfig.get(urlNoPortada);
					console.log(imagen1.data[0]);
					if (imagen1.data.length !== 0) {
						setImagen(imagen1.data[0].imagen);
					} else {
						setNoImagen(true);
					}
				} else {
					imagen.data[0].imagen && setImagen(imagen.data[0].imagen);
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	const [imagen, setImagen] = useState(null);

	const { t } = useTranslation();

	return (
		<>
			<Card className='card1' style={{ width: '90%' }}>
				<div className='imagenDiv'>
					{imagen !== null ? (
						<CardImg
							className='image'
							alt={nombre}
							src={'data:image/png;base64,' + imagen}
							top
						></CardImg>
					) : !noImagen ? (
						<CardImg className='cargando' alt={nombre} src={cargando} top></CardImg>
					) : (
						<CardImg
							className='cargando'
							alt={nombre}
							src={noImagenDisponible}
							top
						></CardImg>
					)}
				</div>
				<CardBody className='cardbody col-12 '>
					<div className='flex p-col-12 padding0'>
						<div className=' p-col-12 p-md-7 padding0'>
							<h5 className='p-mb-0'>
								{props.i18n.language === 'en'
									? `${props.nombreI.substr(0, 25)} ${
											props.nombreI.length > 26 ? '...' : null
									  }`
									: `${props.nombre.substr(0, 25)} ${
											props.nombre.length > 26 ? '...' : null
									  }`}
							</h5>
							<p className='card-location margin-bottom0'>{props.destino}</p>
						</div>
						<div className=' p-col-12 p-md-4 padding0'>
							<span className='textdecorationunderline fontweightbold'>
								{t('desde')}
							</span>
							<div>
								<span className='fontweightbold'>{props.precio}</span>
								<span className='marginLeft5px'></span>
								{Currency(props.moneda)}
							</div>
							<span className='marginLeft10px'></span>
							{t('la noche')}
						</div>
					</div>
					<div className='flex p-col-12 padding-top0'>
						<div className=' p-col-12 p-md-7 padding0'>
							<CardHeader
								margin={false}
								cantpersonas={props.cantpersonas}
								metroscuadrados={props.metroscuadrados}
								cantbannos={props.cantbannos}
								canthabitaciones={props.canthabitaciones}
							/>
							{/*<span className="fa-exp"><span className="fontweightbold">{props.metroscuadrados}</span>
                  <span className="marginLeft5px"></span>
                  m<sup>2</sup></span>
                  <span className="marginLeft10px"></span>
                  <i className="pi pi-user"></i><span className="marginLeft5px"></span>
                  <span className="fontweightbold">{props.cantpersonas}</span>
                  <span className="marginLeft10px"></span> */}
						</div>
						<div className=' p-col-12 p-md-5'>
							<Button
								color='primary'
								className='margin0 p-pb-1 p-pt-1 p-pl-2 p-pr-2'
								onClick={(e) => handleSubmit(e)}
							>
								{t('Ver detalles')}
							</Button>
						</div>
					</div>
				</CardBody>
			</Card>
		</>
	);
}

const mapStateToProps = (state) => ({
	currentDestino: state.destino.currentDestino,
});

export default withRouter(connect(mapStateToProps)(withTranslation('translations')(MyCard)));
