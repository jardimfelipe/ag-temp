import { CalendarMonth, Close } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

type Props = {
  days: Dayjs[];
  selectedIndex?: number | null;
  onSelect: (index: number | null) => void;
};

dayjs.locale("pt-br");

const DaysButtons = ({ days, selectedIndex, onSelect }: Props) => {
  return (
    <List sx={{ display: "flex", flexWrap: "wrap" }}>
      {selectedIndex !== null && selectedIndex !== undefined ? (
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
            primary={dayjs(days[selectedIndex]).format("D, MMM")}
            secondary={dayjs(days[selectedIndex]).format("dddd")}
          />
        </ListItemButton>
      ) : (
        days.map((day, index) => (
          <ListItemButton key={index} onClick={() => onSelect(index)}>
            <ListItemIcon>
              <CalendarMonth />
            </ListItemIcon>
            <ListItemText
              primary={dayjs(day).format("D, MMM")}
              secondary={dayjs(day).format("ddd")}
            />
          </ListItemButton>
        ))
      )}
    </List>
  );
};

export default DaysButtons;
