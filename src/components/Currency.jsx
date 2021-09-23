import { Tooltip } from 'primereact/tooltip';
import euro from 'assets/img/euroX.png';
import dollar from 'assets/img/dollar.png';
import peso from 'assets/img/peso.png';
export default function Currency(moneda, precio) {
	return (
		<>
			<Tooltip target='.usd' content={`USD`} />
			<Tooltip target='.euro' content={`Euro`} />
			<Tooltip target='.dollar-argentino' content={`Peso Argentino`} />
			{moneda === 'EU' ? (
				<>
					<img src={euro} style={{ width: '10px' }} />
					<span className='p-ml-1'>{precio}</span>
				</>
			) : moneda === 'USD' ? (
				<>
					<img src={dollar} style={{ width: '18px' }} />
					{precio}
				</>
			) : (
				<>
					<img src={peso} style={{ width: '12px' }} />
					{precio}
				</>
			)}
		</>
	);
}
