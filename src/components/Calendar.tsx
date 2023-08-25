import React, { useState } from "react";
import { getCalendar } from "../utils/DateForCalendar";
import dayjs from "dayjs";

type Props = {};

export function Calendar({}: Props) {
	const arrayDate = getCalendar(dayjs().year());
	const [month, setmonth] = useState(dayjs().month());
	const [getDateForForm, setGetDateForForm] = useState(0);
	console.log(arrayDate);
	return (
		<div className="flex flex-col">
			<button onClick={() => setmonth(month + 1)}>proximo mes</button>
			<button onClick={() => setmonth(month - 1)}>mes anterior</button>
			{arrayDate[month].name}
			{arrayDate[month].dayForWeek.friday.map((day) => {
				return (
					<button
						key={`friday-${day}`}
						onClick={() => setGetDateForForm(day)}
					>
						<li>sexta {day}</li>
					</button>
				);
			})}
		</div>
	);
}
