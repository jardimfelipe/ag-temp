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
	const [date, setDate] = useState<Value>(new Date());
	return (
		<div className="flex flex-col">
			<Calendar onChange={setDate} value={date} />
		</div>
	);
}
