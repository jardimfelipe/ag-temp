import React from "react";
import Button from "../../components/Button";
import dayjs from "dayjs";
import { ISchedule } from "../../store/types/schedule";

type Props = {
	schedulesList: ISchedule[];
};

interface IScheduleListReleased {
	startDate: Date;
	occupied: boolean;
}

export function HourList({ schedulesList }: Props) {
	// function fillSchedule(): IScheduleListReleased[] {
	// 	const list: IScheduleListReleased[] = [];
	// 	const scheduleOccupied;
	// 	for (let hour = 0; hour <= 24; hour++) {
	// 		for (let min = 0; min <= 60; min + 20) {}
	// 	}
	// }

	return (
		<div className="p-4 w-80 rounded-lg bg-darkness-plus">
			{schedulesList.map((schedule, id) => {
				return (
					<Button
						key={`schedule-hour-${id}`}
						className="flex justify-between w-72 my-2"
						onClick={() => {}}
					>
						{schedule.title}
					</Button>
				);
			})}
		</div>
	);
}
