import { useState } from 'react'
import MonthMenu from './MonthMenu'
import Years from './Years'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Months({yearCurrent, setDisplayDateMenu, changeMonth, changeYear}) {
	const [year, setYear] = useState(yearCurrent);
	const [displayYearMenu, setDisplayYearMenu] = useState(false);

	const changeDate = month => {
		setDisplayDateMenu(false);
		changeMonth(month);
		changeYear(year, month);
	}

	return (
		<div className='months'>
			{
				(() => {
					if (displayYearMenu)
						return (<Years changeYear={ setYear } setDisplayYearMenu={ setDisplayYearMenu } year={ year } />);
				})()
			}
			<MonthMenu>
				<div onClick={() => { setYear(year - 1); }} className='months--menu-selector'>{"<"}</div>
				<div onClick={setDisplayYearMenu} className='months--current'>{ year }</div>
				<div onClick={() => { setYear(year + 1); }} className='months--menu-selector'>{">"}</div>
			</MonthMenu>
			<div className='months--container'>
			{
				(() => {
						return months.map(month => {
							const currentYear = new Date().getFullYear();
							const currentMonth = months[new Date().getMonth()];

							return (
								<div key={month} onClick={ () => changeDate(month) } className={ year == currentYear && month == currentMonth ? 'months--month date-today' : 'months--month'}>
									{month}
								</div>
							)
						});
				})()
			}
			</div>
		</div>
	);
}