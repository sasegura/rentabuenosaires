import React, { useRef, useState } from 'react';

//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';

//CSS
import './Mensaje.style.scss';

import { withTranslation } from 'react-i18next';
import Mensaje from './Mensaje';

const EnviarMensaje = (props) => {
	return (
		<>
			<Mensaje consulta />
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setCurrentNavBarColor: (navBarColor) => dispatch(setCurrentNavBarColor(navBarColor)),
});

export default connect(null, mapDispatchToProps)(withTranslation('translations')(EnviarMensaje));
