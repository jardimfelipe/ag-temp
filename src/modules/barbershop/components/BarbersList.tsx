import { Close } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActionArea,
  CardHeader,
  Grid,
  IconButton,
  darken,
} from "@mui/material";

import useBarbersQuery from "../services/useBarbersQuery";

type Props = {
  barbershopId: string;
  selectedBarberId?: string;
  onSelect?: (barberId: string) => void;
};

const BarbersList = ({ barbershopId, selectedBarberId, onSelect }: Props) => {
  const { data: barbers = [] } = useBarbersQuery(barbershopId as string);

  const selectedBarber = selectedBarberId
    ? barbers.find((barber) => barber.id === selectedBarberId)
    : {};

  function stringAvatar(name: string) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <>
      {selectedBarberId ? (
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
            <Card sx={{ borderRadius: "20px" }}>
              <CardActionArea onClick={() => onSelect?.(barber.id)}>
                <CardHeader
                  title={barber.name}
                  avatar={<Avatar {...stringAvatar(barber.name)} />}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))
      )}
    </>
  );
};

export default BarbersList;
