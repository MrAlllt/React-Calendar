import MonthMenu from './MonthMenu'
import Months from './Months'
import { useState } from 'react'

const getInitialRange = year => {
	const roundedYear = Math.floor(year / 10) * 10;
	return roundedYear % 4 == 0 ? roundedYear : roundedYear - 10;
}

export default function Years({year, setDisplayYearMenu, changeYear}) {
	const initialRange = getInitialRange(year);
	const [range, setRange] = useState([initialRange, initialRange + 20]);

	const decrementRange = () => {
		setRange([range[0] - 20, range[1] - 20]);
	}

	const incrementRange = () => {
		setRange([range[0] + 20, range[1] + 20]);
	}

	const changeDate = year => {
		setDisplayYearMenu(false);
		changeYear(year);
	}

	return (
		<div id="year--div" className='months'>
			<MonthMenu>
				<div onClick={decrementRange} className='months--menu-selector'>{"<"}</div>
				<div className='year--range'>{ range[0] + ' - ' + (range[1] - 1) }</div>
				<div onClick={incrementRange} className='months--menu-selector'>{">"}</div>
			</MonthMenu>
			<div className='months--container'>
				{
					(() => {
						const elements = [];

						for (let i = range[0]; i < range[1]; i++) {
							elements.push(<div key={i} onClick={() => changeDate(i)} className={ (i == new Date().getFullYear()) ? 'year-div date-today' : 'year-div'}>{i}</div>);
						}

						return elements;
					})()
				}
			</div>
		</div>
	);
}