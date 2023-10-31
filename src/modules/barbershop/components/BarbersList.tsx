import { useState } from "react";

import { Close, Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  darken,
} from "@mui/material";

import { IUser } from "../../auth/types";
import useBarbersQuery from "../services/useBarbersQuery";
import BarberDeleteModal, { DeleteBarberProps } from "./BarberDeleteModal";

type Props = {
  barbershopId: string;
  selectedBarberId?: string;
  onSelect?: (barberId: string) => void;
  showDeleteButton?: boolean;
};

const BarbersList = ({
  barbershopId,
  selectedBarberId,
  showDeleteButton = false,
  onSelect,
}: Props) => {
  const { data: barbers = [], isLoading } = useBarbersQuery(
    barbershopId as string
  );

  const [deleteDialogOptions, setDeleteDialogOptions] = useState<
    DeleteBarberProps["options"]
  >({ open: false, barber: null });

  const selectedBarber = selectedBarberId
    ? barbers.find((barber) => barber.id === selectedBarberId)
    : {};

  const handleDelete = (barber: IUser) => {
    setDeleteDialogOptions({ ...deleteDialogOptions, open: true, barber });
  };

  const handleClose = () => {
    setDeleteDialogOptions({
      ...deleteDialogOptions,
      open: false,
      barber: null,
    });
  };

  function stringAvatar(name: string) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <>
      <BarberDeleteModal options={deleteDialogOptions} onClose={handleClose} />
      {isLoading ? (
        [...new Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            sx={{ borderRadius: "20px", height: "6rem" }}
          />
        ))
      ) : selectedBarberId ? (
        <Grid item xs={12}>
          <Card
            sx={{
              position: "relative",
              borderRadius: "20px",
              backgroundColor: (theme) =>
                darken(theme.palette.primary.dark, 0.1),
            }}
          >
            <IconButton
              color="error"
              sx={{ position: "absolute", top: "-10px", right: "-10px" }}
              onClick={() => onSelect?.("")}
            >
              <Close />
            </IconButton>
            <CardHeader
              title={selectedBarber.name}
              avatar={<Avatar {...stringAvatar(selectedBarber.name)} />}
            />
          </Card>
        </Grid>
      ) : (
        barbers.map((barber) => (
          <Grid item xs={12} key={barber.id}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Card
                sx={{
                  borderRadius: "20px",
                  width: showDeleteButton ? "80%" : "100%",
                }}
              >
                <CardActionArea onClick={() => onSelect?.(barber.id)}>
                  <CardHeader
                    title={barber.name}
                    subheader={barber.contact}
                    avatar={<Avatar {...stringAvatar(barber.name)} />}
                  />
                </CardActionArea>
              </Card>

              {showDeleteButton ? (
                <Box>
                  <IconButton onClick={() => handleDelete(barber)}>
                    <Delete />
                  </IconButton>
                </Box>
              ) : null}
            </Stack>
          </Grid>
        ))
      )}
    </>
  );
};

export default BarbersList;
