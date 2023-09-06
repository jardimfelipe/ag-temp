import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.style.css";
import dayjs from "dayjs";

type Props = {
	onChange: any;
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function MyCalendar({ onChange }: Props) {
	const [date, setDate] = useState<Value>(new Date());

	useEffect(() => {
		onChange(dayjs(date as Date).date());
	}, [date]);

	return (
		<div className="flex flex-col">
			{/* TODO o ano e as setas estão com estilizalação quebrada */}
			<Calendar className="my-4" onChange={setDate} value={date} />
		</div>
	);
}
