import React, { useEffect, useState } from "react";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Box, ThemeProvider } from "@mui/material";
import { IDate } from "../../components/Calendar";
import { themeCustom } from "../../materialStyling";
import { toast } from "react-toastify";
import "dayjs/locale/pt-br";
import { ScheduleService } from "../../service/schedule";
import { useParams } from "react-router-dom";

dayjs.locale("pt-br");

interface Props {
	calendarData: any;
	setDate: (data: IDate) => void;
}

interface IScheduleHour {
	hours: number | undefined;
	minutes: number | undefined;
}

const service = new ScheduleService();

export function HourList({ setDate, calendarData }: Props) {
	const params = useParams();
	const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
		dayjs()
	);
	const [schedules, setSchedules] = useState<IScheduleHour[]>(
		[] as IScheduleHour[]
	);

	const [isScheduled, setIsScheduled] = useState<IScheduleHour>(
		{} as IScheduleHour
	);

	useEffect(() => {
		(async () => {
			const response = await service.getSchedule(params.barbershopId!);
			const scheduleDate = response.map((schedule: any) => {
				const hours = dayjs(schedule.start).hour();
				const minutes = dayjs(schedule.start).minute();
				return { hours, minutes };
			});

			setSchedules(scheduleDate);
		})();
	}, []);

	function checkSchedule(
		schedule: IScheduleHour[],
		data: IScheduleHour
	): boolean {
		for (let i = 0; i < schedule.length; i++) {
			let isEqual = true;
			if (
				schedule[i].hours !== data.hours &&
				schedule[i].minutes !== data.minutes
			) {
				isEqual = false;
			}
			if (isEqual) {
				return false;
			}
		}
		return true;
	}

	const handleDateChange = (date: Dayjs | null) => {
		console.log(schedules);
		setSelectedDate(date);
		setIsScheduled({ hours: date?.hour(), minutes: date?.minute() });
		if (checkSchedule(schedules, isScheduled)) {
			setDate({
				...calendarData,
				hour: date?.hour(),
				minute: date?.minute(),
			});
		} else {
			toast.warn("Este horário já está agendado para outra pessoa");
		}
	};

	return (
		<ThemeProvider theme={themeCustom}>
			<Box className="overflow-hidden rounded-lg bg-darkness-plus">
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DigitalClock
						className="py-5 px-2 scrollbar-thin scroll-m-2 scrollbar-track-darkness scrollbar-thumb-graydark hover:scrollbar-thumb-primary"
						defaultValue={dayjs()}
						value={selectedDate}
						onChange={handleDateChange}
						timeStep={20}
						minTime={dayjs().hour(9)}
						maxTime={dayjs().hour(21)}
						ampm={false}
					/>
				</LocalizationProvider>
			</Box>
		</ThemeProvider>
	);
}
