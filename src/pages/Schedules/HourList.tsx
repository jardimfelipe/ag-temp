import React, { useState } from "react";
// import TimePicker from "react-time-picker";
// import "react-time-picker/dist/TimePicker.css";
// import "react-clock/dist/Clock.css";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Box, ThemeProvider } from "@mui/material";
import { IDate } from "../../components/Calendar";
import { themeCustom } from "../../materialStyling";

// interface IDateResponse {
// 	day: number;
// 	month: number;
// 	year: number;
// }

interface Props {
	calendarData: any;
	setDate: (data: IDate) => void;
}

interface IScheduleHour {
	hour: number | undefined;
	minute: number | undefined;
}
export function HourList({ setDate, calendarData }: Props) {
	const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
		dayjs()
	);
	const [isScheduled, setIsScheduled] = useState<IScheduleHour>(
		{} as IScheduleHour
	);

	const handleDateChange = (date: Dayjs | null) => {
		setSelectedDate(date);
		setDate({
			...calendarData,
			hour: date?.hour(),
			minute: date?.minute(),
		});
	};

	return (
		<ThemeProvider theme={themeCustom}>
			<Box className="py-5 rounded-lg bg-darkness-plus">
				{isScheduled.hour != undefined ? "true" : "false"}
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DigitalClock
						value={selectedDate}
						onChange={handleDateChange}
						timeStep={20}
					/>
				</LocalizationProvider>
			</Box>
		</ThemeProvider>
	);
}
