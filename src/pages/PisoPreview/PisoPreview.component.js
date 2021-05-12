import React, { Fragment } from "react";
import { useState } from "react";

//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";

//CSS
import './pisoPreview.scss'
import {
  Card,
  CardImg,
  CardBody,
  Button,
} from "reactstrap";
//Components
import MyCard from "components/MyCard/MyCard.component";
import { Carousel } from 'primereact/carousel';
import CardPiso from "./CardPiso";
//Conexion
import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import cargando from '../../assets/img/loading.gif'
import MyCardComponent from "components/MyCard/MyCard.component";

const PisoPreview = (props) => {


  props.setCurrentNavBarColor(false);

  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);


  async function getPiso() {
    const url = '/pisos?filter[where][iddestino]=' + props.currentDestino.id;
    try {
      const piso = await AxiosConexionConfig.get(url);
      //console.log(piso.data)
      setPisos(piso.data);
    } catch (e) {
      console.log(e);
    }
  }

  const [pisos, setPisos] = useState(null);

  React.useEffect(() => {
    getPiso();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentDestino]);
  const productTemplate  = (product) => {
    return (
        <div className="product-item">
            <div className="product-item-content">
                <div className="imagenDiv">
                    {product.imagen!==null?
                      <CardImg className="image" alt={product.nombre} src={"data:image/png;base64," + product.imagen} top></CardImg>
                      :<CardImg className="cargando" alt={product.nombre} src={cargando} top></CardImg>
                    }
                  </div>
                <div className="p-mb-3">
                    <img src={`showcase/demo/images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.name} className="product-image" />
                </div>
                <div>
                    <h4 className="p-mb-1">{product.nombre}</h4>
                    
                    <div className="car-buttons p-mt-5">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
const responsiveOptions = [
  {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
  },
  {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 2
  },
  {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1
  }
];
  const destino = () => {
    return (<div className="pisoPrev">
      <h1 className="h1">{props.currentDestino.nombre.toUpperCase()}</h1>
      {/*<img src={"data:image/png;base64," + img} />*/}
      <div className="p-col-12">
          <div className="collection-preview">
              {pisos !== null ?
                  <Carousel value={pisos} numVisible={3} numScroll={1} className="p-col-11" responsiveOptions={responsiveOptions} itemTemplate={MyCardComponent} />
                  :<Fragment></Fragment>}
          </div>
      </div>
    </div>)
  }

  const nodestino = () => {
    return (<div className="pisoPrev">
      <h1 className="h1">{"No hay destinos disponibles".toUpperCase()}</h1>
    </div>)
  }

  return (
    <Fragment>
      <div className="separador" />
      {props.currentDestino !== null ?
        destino() :
        nodestino()
      }
      {/* <img src={"data:image/png;base64," + img} />*/}
    </Fragment>
  );
}

const mapStateToProps = state => ({
  currentDestino: state.destino.currentDestino
})

const mapDispatchToProps = dispatch => ({
  setCurrentNavBarColor: navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
})

export default connect(mapStateToProps, mapDispatchToProps)(PisoPreview);