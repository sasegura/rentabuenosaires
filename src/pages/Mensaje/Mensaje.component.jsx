import React, { useRef, useState } from 'react';

//redux
import { connect } from 'react-redux';
import { setCurrentNavBarColor } from 'redux/navBarColor/navBarColor.action';

//CSS
import './Mensaje.style.scss';

import { withTranslation } from 'react-i18next';
import Mensaje from './Mensaje';

const EnviarMensaje = (props) => {
	React.useEffect(() => {
		props.setCurrentNavBarColor(false);
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
