import { Accordion, AccordionTab } from "primereact/accordion";
import { useState } from "react";
import { withTranslation } from "react-i18next";
import { Row } from "reactstrap";

const Acordion = ({data,t}) => {
    const [activeIndex, setactiveIndex] = useState([]);
    const fila = (datosFila, texto) => {
		if (datosFila) {
			return (
				<AccordionTab header={t(texto)}>
					<Row>
						{datosFila.split(',').map((dato, index) => {
							return dato ? (
								<div key={index} className='p-col-12 p-md-3 p-sm-6'>
									{t(dato.trim())}
								</div>
							) : (
								''
							);
						})}
					</Row>
				</AccordionTab>
			);
		} else {
			return null;
		}
	};

	

    return data.banno ||
        data.dormitorio ||
        data.entretenimiento ||
        data.paraFamilias ||
        data.calefaccionRefrigeracion ||
        data.seguridadHogar ||
        data.internetOficina ||
        data.cocinaComedor ||
        data.estacionamientoInstalaciones ||
        data.serviciosAdicionales ? (
        <Accordion
            multiple
            activeIndex={activeIndex}
            headerClassName='seccion'
            onTabChange={(e) => setactiveIndex(e.index)}
        >
            {fila(data.banno, 'Baño')}
            {fila(data.dormitorio, 'Dormitorio')}
            {fila(data.entretenimiento, 'Entretenimiento')}
            {fila(data.paraFamilias, 'Para familias')}
            {fila(data.calefaccionRefrigeracion, 'Calefacción y refrigeración')}
            {fila(data.seguridadHogar, 'Seguridad en el hogar')}
            {fila(data.internetOficina, 'Internet y oficina')}
            {fila(data.cocinaComedor, 'Cocina y comedor')}
            {fila(data.estacionamientoInstalaciones, 'Estacionamiento e instalaciones')}
            {fila(data.serviciosAdicionales, 'Servicios adicionales con recargo')}
        </Accordion>
    ) : (
        <div className='p-col-12'>-</div>
    );
};
export default withTranslation('translations')(Acordion);