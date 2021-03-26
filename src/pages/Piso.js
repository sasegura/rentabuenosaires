import imageToBase64 from "image-to-base64";
import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';

// reactstrap components
import { Carousel, CarouselItem, CarouselIndicators, Container, Row, Col } from "reactstrap";
import './Piso.scss'

import AxiosConexionConfig from "conexion/AxiosConexionConfig";
import { setCurrentNavBarColor } from "redux/navBarColor/navBarColor.action";

// core components

const Piso = (props) => {
  console.log("lo que sea")
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


  async function getImagenes() {
    const url = '/imagen?filter[where][idpiso]=1';
    try {
      const imagen = await AxiosConexionConfig.get(url);
      setImagenes(imagen.data);
    } catch (e) {
      console.log(e);
    }
  }

  const [imagenes, setImagenes] = useState(null);

  React.useEffect(() => {
    getImagenes()
  }, []);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === imagenes.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? imagenes.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };


  const carrusel = () => {
    return (
      <Carousel className="col-xs-12 col-sm-8 carrusel" activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={imagenes}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {

          imagenes.map((imagen, index) => {
            return (
              <CarouselItem
                onExiting={onExiting}
                onExited={onExited}
                key={index}
              >
                <img src={"data:image/png;base64," + imagen.imagen} alt="jjj" className="jjj" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>fff</h5>
                </div>
              </CarouselItem>
            );
          })}

        <a
          className="carousel-control-prev"
          data-slide="prev"
          href="#pablo"
          onClick={e => {
            e.preventDefault();
            previous();
          }}
          role="button"
        >
          <i className="now-ui-icons arrows-1_minimal-left"></i>
        </a>
        <a
          className="carousel-control-next"
          data-slide="next"
          href="#pablo"
          onClick={e => {
            e.preventDefault();
            next();
          }}
          role="button"
        >
          <i className="now-ui-icons arrows-1_minimal-right"></i>
        </a>
      </Carousel>
    )
  }


  return (
    <>
      <div className="separador" />
      <div class="carruselRoot">
        <div className="col-xs-12 col-sm-12 carruselDiv">
          {imagenes !== null ?
            carrusel() : <Fragment />}

        </div>
      </div>
      <Container>
        <h4>Descripción</h4>
        <Row>
          <Col md="4">

          </Col>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = state => ({
  currentPiso: state.piso.currentPiso
})

const mapDispatchToProps = dispatch => ({
  setCurrentNavBarColor: navBarColor => dispatch(setCurrentNavBarColor(navBarColor))
})

export default connect(mapStateToProps, mapDispatchToProps)(Piso);

/**import React from "react";

// reactstrap components
import { Carousel } from 'primereact/carousel';
//import { Carousel, CarouselItem, CarouselIndicators } from "reactstrap";
import img1 from "../assets/img/bg1.jpg"
import img3 from "../assets/img/bg3.jpg"
import img4 from "../assets/img/bg4.jpg"
import { Button } from "reactstrap";
// core components
const items = [
  {
    src: img1,
    altText: "Nature, United States",
    caption: "Nature, United States"
  },
  {
    src: img3,
    altText: "Somewhere Beyond, United States",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: img4,
    altText: "Yellowstone National Park, United States",
    caption: "Yellowstone National Park, United States"
  }
];

function Piso(){
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
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
const productTemplate = (product) => {
  return (
      <div className="product-item">
          <div className="product-item-content">
              <div className="p-mb-3">
                  <img src={`${product.src}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.name} className="product-image" />
              </div>
              <div>
                  <h4 className="p-mb-1">{product.name}</h4>
                  <h6 className="p-mt-0 p-mb-3">${product.price}</h6>
                  <span className={`product-badge status-${product.altText.toLowerCase()}`}>{product.altText}</span>
                  <div className="car-buttons p-mt-5">
                      <Button icon="pi pi-search" className="p-button p-button-rounded p-mr-2" />
                      <Button icon="pi pi-star" className="p-button-success p-button-rounded p-mr-2" />
                      <Button icon="pi pi-cog" className="p-button-help p-button-rounded" />
                  </div>
              </div>
          </div>
      </div>
  );
}
  return (
    <>
    <div className="carousel-demo">
            <div className="card">
                <Carousel value={items} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions}
                    itemTemplate={productTemplate} header={<h5>Basic</h5>} />
            </div>


        </div>

    </>
  );
}

export default Piso; */