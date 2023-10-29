import { Skeleton, Stack, Typography } from "@mui/material";
import { AccessTime, LocationOn, Map } from "@mui/icons-material";

import { IBarbershop } from "../types";

type Props = {
  barbershop?: IBarbershop;
  showAddress?: boolean;
};

const LocationInfo = ({ barbershop, showAddress = true }: Props) => {
  return (
    <Stack spacing={2}>
      {!barbershop ? (
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      ) : (
        <>
          <Stack direction="row" justifyContent="space-between">
            <Stack spacing={1} direction="row" alignItems="center">
              <AccessTime color="disabled" />
              <Typography color="text.secondary" variant="caption">
                {barbershop.startTime} - {barbershop.endTime}
              </Typography>
            </Stack>

            <Stack spacing={1} direction="row" alignItems="center">
              <LocationOn color="disabled" />
              <Typography color="text.secondary" variant="caption">
                0.5km
              </Typography>
            </Stack>
          </Stack>
          {showAddress ? (
            <Stack direction="row" gap={2} alignItems="center">
              <Map color="disabled" />
              <Stack>
                <Typography color="text.disabled" variant="caption">
                  Endereço
                </Typography>
                <Typography variant="subtitle2">
                  {barbershop.address}
                </Typography>
              </Stack>
            </Stack>
          ) : null}
        </>
      )}
    </Stack>
  );
};

export default LocationInfo;
