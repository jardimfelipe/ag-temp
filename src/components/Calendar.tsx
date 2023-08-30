import React, { useState } from "react";
// import { getCalendar } from "../utils/DateForCalendar";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.style.css";

type Props = {};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function MyCalendar({}: Props) {
	// const arrayDate = getCalendar(dayjs().year());
	const [month, setmonth] = useState(dayjs().month());
	const [date, setDate] = useState<Value>(new Date());
	return (
		<div className="flex flex-col">
			<button onClick={() => setmonth(month + 1)}>proximo mes</button>
			<button onClick={() => setmonth(month - 1)}>mes anterior</button>
			{/* {arrayDate[month].name} */}
			{/* <div className="flex w-80 list-none">
				<span
					className={`flex flex-col mx-2 ${
						arrayDate[month].dayForWeek.sunday.length != 4
							? "mt-6"
							: undefined
					}`}
				>
					{arrayDate[month].dayForWeek.sunday.map((day) => {
						return (
							<button
								key={`sunday-${day}-${Math.random()}`}
								onClick={() => setDay(day)}
							>
								<li>{day}</li>
							</button>
						);
					})}
				</span>
				<span
					className={`flex flex-col mx-2 ${
						arrayDate[month].dayForWeek.monday.length == 4
							? "mt-6"
							: undefined
					}`}
				>
					{arrayDate[month].dayForWeek.monday.map((day) => {
						return (
							<button
								key={`monday-${day}-${Math.random()}-${Math.random()}`}
								onClick={() => setDay(day)}
							>
								<li>{day}</li>
							</button>
						);
					})}
				</span>
				<span
					className={`flex flex-col mx-2 ${
						arrayDate[month].dayForWeek.tuesday.length == 4
							? "mt-6"
							: undefined
					}`}
				>
					{arrayDate[month].dayForWeek.tuesday.map((day) => {
						return (
							<button
								key={`tuesday-${day}-${Math.random()}-${Math.random()}`}
								onClick={() => setDay(day)}
							>
								<li>{day}</li>
							</button>
						);
					})}
				</span>
				<span
					className={`flex flex-col mx-2 ${
						arrayDate[month].dayForWeek.wednesday.length == 4
							? "mt-6"
							: undefined
					}`}
				>
					{arrayDate[month].dayForWeek.wednesday.map((day) => {
						return (
							<button
								key={`wednesday-${day}-${Math.random()}-${Math.random()}`}
								onClick={() => setDay(day)}
							>
								<li>{day}</li>
							</button>
						);
					})}
				</span>
				<span
					className={`flex flex-col mx-2 ${
						arrayDate[month].dayForWeek.thursday.length == 4
							? "mt-6"
							: undefined
					}`}
				>
					{arrayDate[month].dayForWeek.thursday.map((day) => {
						return (
							<button
								key={`thursday-${day}-${Math.random()}-${Math.random()}`}
								onClick={() => setDay(day)}
							>
								<li>{day}</li>
							</button>
						);
					})}
				</span>
				<span
					className={`flex flex-col mx-2 ${
						arrayDate[month].dayForWeek.friday.length == 4
							? "mt-6"
							: undefined
					}`}
				>
					{arrayDate[month].dayForWeek.friday.map((day) => {
						return (
							<button
								key={`friday-${day}-${Math.random()}-${Math.random()}`}
								onClick={() => setDay(day)}
							>
								<li>{day}</li>
							</button>
						);
					})}
				</span>
				<span
					className={`flex flex-col mx-2 ${
						arrayDate[month].dayForWeek.saturday.length == 4
							? "mt-6"
							: undefined
					}`}
				>
					{arrayDate[month].dayForWeek.saturday.map((day) => {
						return (
							<button
								key={`saturday-${day}-${Math.random()}`}
								onClick={() => setDay(day)}
							>
								<li>{day}</li>
							</button>
						);
					})}
				</span>
			</div> */}
			<Calendar onChange={setDate} value={date} />
		</div>
	);
}
