import Cell from './Cell';
import { useState } from 'react'
import Months from './Months'

const daysOfWeek = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday"
];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getNumberOfCellsToAdd = function(dayOfWeek, pre = true) {
	if (pre)
		return dayOfWeek > 0 ? dayOfWeek - 1 : 6;

	return 7 - dayOfWeek;
}

const isToday = dateToCompare => {
	return (new Date().toDateString() == dateToCompare.toDateString());
}

const getFirstDate = function(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

const getEndDate = function(date) {
	const numberOfDays = getNumberOfDays(date);
	return new Date(date.getFullYear(), date.getMonth(), numberOfDays);
}

const getNumberOfDays = function(date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export default function Calendar({value = new Date(), onChange}) {
	const [displayDateMenu, setDisplayDateMenu] = useState(false); 

	const startDate = getFirstDate(value);
	const endDate = getEndDate(value);
	const numDays = getNumberOfDays(value);

	const startDayOfWeek = startDate.getDay();
	const lastDayOfWeek = endDate.getDay();

	const previousMonth = () => onChange(new Date(value.getFullYear(), value.getMonth(), 0));
	const nextMonth = () => onChange(new Date(value.getFullYear(), value.getMonth() + 2, 0));

	const changeMonth = month => {
		const month1 = months.indexOf(month) + 1;
		onChange(new Date(value.getFullYear(), month1, 0));
	}

	const changeYear = (year, month) => {
		const month1 = months.indexOf(month) + 1;
		onChange(new Date(year, month1, 0));
	}

	return (
		<div className='calendar'>
				{
					(() => {
						if (displayDateMenu)
							return (<Months setDisplayDateMenu={setDisplayDateMenu} changeMonth={changeMonth} changeYear={changeYear} yearCurrent={value.getFullYear()} />);
					})()
				}
			<div className='calendar--row calendar--menu'>
				<Cell specificClass='calendar--cell-menu'></Cell>
				<Cell onClick={previousMonth} specificClass='calendar--cell-menu calendar--cell-button'>{"<"}</Cell>
				<Cell onClick={setDisplayDateMenu} specificClass='calendar--cell-menu-month'>{value.toLocaleString('en-GB', { month: 'long', year: 'numeric' })}</Cell>
				<Cell onClick={nextMonth} specificClass='calendar--cell-menu calendar--cell-button'>{">"}</Cell>
				<Cell specificClass='calendar--cell-menu'></Cell>
			</div>
			<div className='calendar--row calendar--row-days'>
				{daysOfWeek.map(day => (<Cell key={day} specificClass='calendar--cell-weekday'>{day}</Cell>))}
			</div>

			<div className='calendar--days'>

			{
				(() => {
					const elements = [];
					const cellsToAdd = getNumberOfCellsToAdd(startDayOfWeek);
					let daysOfLastMonth = getNumberOfDays(new Date(value.getFullYear(), value.getMonth() - 1, 1)) - cellsToAdd;

					for (let i = 0; i < cellsToAdd; i++) {
						elements.push(<Cell onClick={previousMonth} specificClass="calendar--cell-off" key={"addedPre_" + i}>{daysOfLastMonth + (i + 1)}</Cell>)
					}

					return elements;
				})()
			}

			{Array.from({ length: numDays }).map((_, index) => {
				const date = index + 1;

				return (
					<Cell specificClass={isToday(new Date(value.getFullYear(), value.getMonth(), date)) ? 'cell-current-date' : ''} key={index}>{date}</Cell>
				);
			})}


			{
				(() => {
					const elements = [];

					for (let i = 0; i < getNumberOfCellsToAdd(lastDayOfWeek, false); i++) {
						elements.push(<Cell onClick={nextMonth} specificClass="calendar--cell-off" key={"addedAft_" + i}>{i + 1}</Cell>)
					}

					return elements;
				})()
			}

			</div>
		</div>
	);
}