import { Tooltip } from 'primereact/tooltip';
export default function Currency(moneda, precio) {
	return (
		<>
			<Tooltip target='.usd' content={`USD`} />
			<Tooltip target='.euro' content={`Euro`} />
			<Tooltip target='.dollar-argentino' content={`Peso Argentino`} />
			{moneda === 'EU' ? (
				<i className='pi pi-euro euro'>
					<span className='p-ml-2'>{precio}</span>
				</i>
			) : moneda === 'USD' ? (
				<i className='pi pi-dollar usd'>
					<span className='p-ml-2'>{precio}</span>
				</i>
			) : (
				<i className='pi pi-dollar dollar-argentino'>
					ARS<span className='p-ml-2'>{precio}</span>
				</i>
			)}
		</>
	);
}
