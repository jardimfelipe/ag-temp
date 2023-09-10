import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.style.css";
import dayjs from "dayjs";

type Props = {
	onChange: (data: any) => void;
};

export interface IDate {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function MyCalendar({ onChange }: Props) {
	const [date, setDate] = useState<Value>(new Date());

	useEffect(() => {
		onChange({
			day: dayjs(date as Date).date(),
			month: dayjs(date as Date).month(),
			year: dayjs(date as Date).year(),
		});
	}, [date]);

	return (
		<div className="flex flex-col">
			{/* TODO o ano e as setas estão com estilizalação quebrada */}
			<Calendar className="my-4" onChange={setDate} value={date} />
		</div>
	);
}
