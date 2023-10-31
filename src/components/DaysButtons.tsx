import dayjs, { Dayjs } from "dayjs";

import { CalendarMonth, Close } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import "dayjs/locale/pt-br";
import { MobileDatePicker } from "@mui/x-date-pickers";

type Props = {
  days: Dayjs[];
  selectedDate?: Dayjs | null;
  onSelect: (date: Dayjs | null) => void;
};

dayjs.locale("pt-br");

const DaysButtons = ({ days, selectedDate, onSelect }: Props) => {
  const checkBarbershopAvailabity = (date: Dayjs) => {
    const daysAsIndex = days.map((day) => dayjs(day).day());
    return !daysAsIndex.includes(dayjs(date).day());
  };
  return (
    <List sx={{ display: "flex", flexWrap: "wrap" }}>
      {selectedDate !== null && selectedDate !== undefined ? (
        <ListItemButton
          sx={{ position: "relative", flex: "1", width: "50%" }}
          selected
        >
          <IconButton
            color="error"
            sx={{ position: "absolute", top: "-10px", right: "-10px" }}
            onClick={() => onSelect(null)}
          >
            <Close />
          </IconButton>
          <ListItemIcon>
            <CalendarMonth />
          </ListItemIcon>
          <ListItemText
            primary={dayjs(selectedDate).format("D, MMM")}
            secondary={dayjs(selectedDate).format("dddd")}
          />
        </ListItemButton>
      ) : (
        <>
          {days.map((day, index) => (
            <ListItemButton key={index} onClick={() => onSelect(day)}>
              <ListItemIcon>
                <CalendarMonth />
              </ListItemIcon>
              <ListItemText
                primary={dayjs(day).format("D, MMM")}
                secondary={dayjs(day).format("ddd")}
              />
            </ListItemButton>
          ))}
          <MobileDatePicker
            sx={{ mt: 1 }}
            onChange={onSelect}
            minDate={dayjs()}
            maxDate={dayjs().add(2, "months")}
            shouldDisableDate={checkBarbershopAvailabity}
            label="Selecionar data"
          />
        </>
      )}
    </List>
  );
};

export default DaysButtons;
