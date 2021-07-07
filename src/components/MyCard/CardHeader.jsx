import React, { Fragment, useEffect, useRef, useState } from 'react';

const CardHeader = (props) => {
	return (
		<div>
			{props.metroscuadrados}
			<span className='fa-exp amenitie'>
				m<sup>2</sup>
			</span>
			<span className={props.margin ? 'marginLeft10px' : ''}></span>
			<i className='fa fa-user'></i>
			<span className='marginLeft5px amenitie'>{props.cantpersonas}</span>
			<span className={props.margin ? 'marginLeft10px' : ''}></span>

			<span className={props.margin ? 'marginLeft10px' : ''}></span>
			<i className='fa fa-bath'></i>
			<span className='marginLeft5px amenitie'>{props.cantbannos}</span>
			<span className={props.margin ? 'marginLeft10px' : ''}></span>
			<i className='fa fa-bed'></i>
			<span className='marginLeft5px amenitie'>{props.canthabitaciones}</span>
			<span className={props.margin ? 'marginLeft10px' : ''}></span>
		</div>
	);
};
export default CardHeader;
