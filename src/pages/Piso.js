import React from "react";

// reactstrap components
import { Carousel, CarouselItem, CarouselIndicators } from "reactstrap";
import img1 from "../assets/img/bg1.jpg"
import img3 from "../assets/img/bg3.jpg"
import img4 from "../assets/img/bg4.jpg"
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
  return (
    <>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {items.map(item => {
          return (
            <CarouselItem
              onExiting={onExiting}
              onExited={onExited}
              key={item.src}
            >
              <img src={item.src} alt={item.altText} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{item.caption}</h5>
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
    </>
  );
}

export default Piso;

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