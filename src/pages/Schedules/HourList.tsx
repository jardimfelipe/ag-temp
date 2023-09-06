import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import dayjs from "dayjs";
import { ISchedule } from "../../store/types/schedule";
import { scheduleContext } from "../../store/context/schedules.context";
import Input from "../../components/Input";

type Props = {};

interface IScheduleListReleased {
	startDate: Date;
	occupied: boolean;
}

interface HourList {
	hour: number;
	min: number[];
	isOccupied: boolean;
	isMinOccupied: number | undefined;
}

interface ICondition {
	condition: boolean;
	numberCondition: number;
}

export function HourList({}: Props) {
	const scheduleList = useContext(scheduleContext);
	const [minSelected, setMinSelected] = useState(0);
	const [hourSelected, setHourSelected] = useState(0);
	function scheduleDateParse({ start, end }: ISchedule) {
		const dateParsed = { start: dayjs(start), end: dayjs(end) };
		const DateStarted = {
			day: dateParsed.start.date(),
			hour: dateParsed.start.hour(),
			minute: dateParsed.start.minute(),
		};

		const DateEnding = {
			day: dateParsed.end.date(),
			hour: dateParsed.end.hour(),
			minute: dateParsed.end.minute(),
		};

		return { start: DateStarted, end: DateEnding };
	}
	const dateScheduleList = scheduleList.map(scheduleDateParse);

	function fillSchedule(hourSelected: number) {
		const list: HourList[] = [];
		for (let hour = 7; hour <= 20; hour++) {
			list.push({
				hour,
				min: [0, 20, 40],
				isOccupied: false,
				isMinOccupied: undefined,
			});
		}

		dateScheduleList.forEach((data) => {
			list.map((date) => {
				if (data.start.hour === date.hour) {
					date.min.map((min) => {
						date.isOccupied = min === data.start.minute;
					});

					date.isOccupied = true;
					if (date.isOccupied) {
						date.isMinOccupied = data.start.minute;
					}
				}
			});
		});

		function setDateSelected(
			hour: number,
			min: number,
			opponent: ICondition
		) {
			if (opponent.condition && opponent.numberCondition !== min) {
				setHourSelected(hour);
				setMinSelected(min);
			} else if (opponent.numberCondition !== min) {
				setHourSelected(hour);
				setMinSelected(min);
			} else {
				return false;
			}
		}

		return (
			<div>
				{list.map((hours) => {
					return hours.min.map((min) => {
						return (
							<Button
								key={Math.random()}
								className={`flex justify-between w-72 my-2 ${
									hours.isOccupied &&
									hours.isMinOccupied === min
										? "opacity-25"
										: undefined
								}`}
								onClick={() =>
									setDateSelected(hours.hour, min, {
										condition: !hours.isOccupied,
										numberCondition: hours.isMinOccupied!,
									})
								}
							>
								{hours.hour.toString().length === 1
									? "0" + hours.hour.toString()
									: hours.hour}
								:
								{min.toString().length === 1
									? "0" + min.toString()
									: min}
							</Button>
						);
					});
				})}
			</div>
		);
	}

	return (
		<div className="p-4 w-80 rounded-lg bg-darkness-plus">
			{hourSelected} {minSelected}
			{fillSchedule(hourSelected)}
		</div>
	);
}
