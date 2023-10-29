import { Box, Card, Skeleton, Typography } from "@mui/material";
import { Coordinates } from "../../feed/types";
import useAddressQuery from "../services/useAddressQuery";
import { LocationOn } from "@mui/icons-material";

type Props = {
  coordinates: Coordinates;
};

const AddressCard = ({ coordinates }: Props) => {
  const { data: address, isLoading: isAddressLoading } =
    useAddressQuery(coordinates);

  const isLoading = isAddressLoading || coordinates.latitude === 0;
  return (
    <>
      {isLoading ? (
        <Skeleton variant="text" sx={{ fontSize: "4rem", width: "200px" }} />
      ) : (
        <Card
          sx={{
            maxWidth: "200px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1,
          }}
        >
          <LocationOn
            sx={{ maxidth: "30px", height: "30px" }}
            color="disabled"
          />
          <Box>
            <Typography
              fontSize={10}
              color="text.secondary"
              variant="subtitle2"
            >
              Próximos a
            </Typography>
            <Typography fontSize={14}>{address?.road}</Typography>
          </Box>
        </Card>
      )}
    </>
  );
};

export default AddressCard;
