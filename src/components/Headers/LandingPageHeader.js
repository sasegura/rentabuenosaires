import React from 'react';
import { withTranslation } from 'react-i18next';

// reactstrap components
import { Button, Container } from 'reactstrap';
import Banner1 from '../../assets/img/Banner.png';
import Banner from '../../assets/img/Banner.jpg';

// core components

function LandingPageHeader(props) {
	const { t } = props;
	let pageHeader = React.createRef();

	React.useEffect(() => {
		if (window.innerWidth > 991) {
			const updateScroll = () => {
				let windowScrollTop = window.pageYOffset / 3;

				pageHeader.current.style.transform = 'translate3d(0,' + windowScrollTop + 'px,0)';
			};
			window.addEventListener('scroll', updateScroll);
			return function cleanup() {
				window.removeEventListener('scroll', updateScroll);
			};
		}
	});
	return (
		<>
			<div className='page-header page-header-small'>
				<div
					className='page-header-image'
					style={{
						backgroundImage: 'url(' + Banner + ')',
					}}
					ref={pageHeader}
				></div>
				<div className='content-center'>
					<Container>
						<h1
							className=''
							style={{
								fontFamily: 'Playfair Display',
								fontStyle: 'normal',
								fontVariant: 'normal',
							}}
						>
							{t('Tu vida es única')}
							<br />
							<br />
							<br />
							<br />
							{t('Vive en un lugar extraordinario')}
						</h1>
					</Container>
				</div>
			</div>
		</>
	);
}

export default withTranslation('translations')(LandingPageHeader);
