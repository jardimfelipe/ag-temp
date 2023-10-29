import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ContentCut, PeopleAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  barbershopId: string;
};

const BarbershopDrawer = ({ open, setOpen, barbershopId }: Props) => {
  const navigate = useNavigate();
  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
  };

  const handleNavigate = (path: "barbeiros" | "serviços") => {
    navigate(`/barbearia/${path}/${barbershopId}`);
  };
  return (
    <Drawer open={open} anchor="right" onClose={toggleDrawer}>
      <List>
        <ListItem>
          <ListItemButton onClick={() => handleNavigate("serviços")}>
            <ListItemIcon>
              <ContentCut />
            </ListItemIcon>
            <ListItemText>Serviços</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={() => handleNavigate("barbeiros")}>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText>Barbeiros</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default BarbershopDrawer;
