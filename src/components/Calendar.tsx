/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import dayjs from "dayjs";
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

const MyCalendar = ({ setCalendar }: Props) => {
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
  );
};

export default MyCalendar;
