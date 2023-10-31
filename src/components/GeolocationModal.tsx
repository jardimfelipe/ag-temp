import { useEffect, useState } from "react";

import { AddLocation } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

type Props = {
  onAgree: (coords: Coordinates) => void;
};

const GeolocationModal = ({ onAgree }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    handleClose();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          onAgree({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function (error) {
          console.error("Error obtaining location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  };

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        handleAgree();
        console.log("Location permission has already been granted.");
      } else {
        setOpen(true);
      }
    });
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle textAlign="center" justifyContent="center">
        Precisamos da sua localização!
      </DialogTitle>
      <DialogContent>
        <Stack justifyContent="center" alignItems="center" gap={2}>
          <AddLocation sx={{ width: "100px", height: "100px" }} />
          <DialogContentText justifyContent="center" sx={{ mt: 2 }}>
            Para ver as barbearias mais próximas, precisamos saber a sua
            localização
          </DialogContentText>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleAgree} autoFocus>
          Aceitar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GeolocationModal;
