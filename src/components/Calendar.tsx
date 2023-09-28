import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ThemeProvider } from "@emotion/react";
import { themeCustom } from "../materialStyling";
import { Box, Paper } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

type Props = {
	setCalendar: (date: any) => void;
};

export interface IDate {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
}

export function MyCalendar({ setCalendar }: Props) {
	const [calendarDays, setCalendarDays] = useState(dayjs());

	function setCalendarDaysInState(date: any) {
		setCalendarDays(date);
		setCalendar({
			day: date.date(),
			month: date.month(),
			year: date.year(),
		});
	}

	return (
		<ThemeProvider theme={themeCustom}>
			<Box>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Paper elevation={0}>
						<DateCalendar
							value={calendarDays}
							onChange={setCalendarDaysInState}
							minDate={dayjs()}
						/>
					</Paper>
				</LocalizationProvider>
			</Box>
		</ThemeProvider>
	);
}
