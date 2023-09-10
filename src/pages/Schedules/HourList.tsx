import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import dayjs from "dayjs";
import { ISchedule } from "../../store/types/schedule";
import { scheduleContext } from "../../store/context/schedules.context";
import Input from "../../components/Input";
import { IDate } from "../../components/Calendar";

interface IDateResponse {
	day: number;
	month: number;
	year: number;
}

type Props = {
	dateSelected: IDateResponse;
	setDate: (data: IDate) => void;
};

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

export function HourList({ dateSelected, setDate }: Props) {
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

		useEffect(() => {
			dateScheduleList.forEach((data) => {
				if (data.start.day === dateSelected.day) {
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
				}
			});
		}, [dateSelected]);

		function setDateSelected(
			hour: number,
			min: number,
			opponent: ICondition
		) {
			if (opponent.condition && opponent.numberCondition !== min) {
				setHourSelected(hour);
				setMinSelected(min);
				setDate({
					...dateSelected,
					minute: minSelected,
					hour: hourSelected,
				});
			} else if (opponent.numberCondition !== min) {
				setHourSelected(hour);
				setMinSelected(min);
				setDate({
					...dateSelected,
					minute: minSelected,
					hour: hourSelected,
				});
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
								className={`flex justify-center base-an w-72 my-2 bg-darkness hover:bg-graydark ${
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
		<div className="p-4 w-80 rounded-lg h-80 overflow-hidden scrollbar-thin scrollbar-rounded-lg scrollbar-thumb-graydark scrollbar-track-darkness overflow-y-scroll bg-darkness-plus">
			<div className="flex flex-col">
				<strong>Escolha um horário</strong>
				{hourSelected === 0 && minSelected === 0 ? (
					<div className="my-1">horário não informado</div>
				) : (
					<span className="flex p-2 py-1 base-an rounded-lg hover:bg-graydark">
						<div className="mr-2">Horário escolhido:</div>
						<div>
							{hourSelected.toString().length === 1
								? "0" + hourSelected.toString()
								: hourSelected}
							{":"}
							{minSelected.toString().length === 1
								? "0" + minSelected.toString()
								: minSelected}
						</div>
					</span>
				)}
			</div>
			<span className="">{fillSchedule(hourSelected)}</span>
		</div>
	);
}
