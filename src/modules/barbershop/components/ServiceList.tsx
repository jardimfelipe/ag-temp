import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import useBarbershopServicesQuery from "../services/useBarbershopServicesQuery";
import { AccessTime, Paid } from "@mui/icons-material";

type Props = {
  barbershopId: string;
  onServiceSelect?: (serviceId: string) => void;
};

export const ServiceList = ({ barbershopId, onServiceSelect }: Props) => {
  const { data: services = [] } = useBarbershopServicesQuery(
    barbershopId as string
  );
  return (
    <>
      {services.map((service) => (
        <Grid key={service.id} item xs={12}>
          <Card sx={{ borderRadius: "20px" }}>
            <CardActionArea onClick={() => onServiceSelect?.(service.id)}>
              <CardContent>
                <Typography variant="body1">{service.name}</Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {service.description}
                </Typography>
                <Stack direction="row" sx={{ mt: 2 }} spacing={2}>
                  <Chip icon={<Paid />} label={`R$${service.price}`} />
                  <Chip
                    icon={<AccessTime />}
                    label={`${service.duration} mins`}
                  />
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </>
  );
};
