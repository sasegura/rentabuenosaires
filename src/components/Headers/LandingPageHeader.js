import React from 'react';
import { withTranslation } from 'react-i18next';

// reactstrap components
import { Container } from 'reactstrap';
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
			<div className='page-header clear-filter  page-header-small'>
				<div
					className='page-header-image'
					style={{
						backgroundImage: `url(${Banner})`,
						width: '100%',
						height: '100%',
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
							<br />
							{t('Tu vida es única')}

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
