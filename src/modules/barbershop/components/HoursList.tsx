import dayjs, { Dayjs } from "dayjs";

import { DigitalClock, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.locale("pt-br");

type Props = {
  onChange: (hour: Dayjs | null) => void;
  startTime?: number;
  endTime?: number;
};
const HoursList = ({ onChange, startTime = 9, endTime = 21 }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DigitalClock
        defaultValue={dayjs()}
        timeStep={20}
        onChange={onChange}
        minTime={dayjs().hour(startTime)}
        maxTime={dayjs().hour(endTime)}
        ampm={false}
        skipDisabled
      />
    </LocalizationProvider>
  );
};

export default HoursList;
