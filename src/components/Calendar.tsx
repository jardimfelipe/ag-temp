import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.style.css";

type Props = {};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function MyCalendar({}: Props) {
	const [date, setDate] = useState<Value>(new Date());
	return (
		<div className="flex flex-col">
			<Calendar className="my-4" onChange={setDate} value={date} />
		</div>
	);
}
