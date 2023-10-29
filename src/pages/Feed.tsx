import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { AccessTime, LocationOff, Share } from "@mui/icons-material";

import GeolocationModal from "../components/GeolocationModal";
import { Coordinates } from "../modules/feed/types";
import { useState } from "react";
import useFeedQuery from "../modules/feed/services/useFeedQuery";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ContactButton from "../components/ContactButton";
import AddressCard from "../modules/geolocation/components/AddressCard";

const Feed = () => {
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });

  const { data: feed = [], isLoading: isFeedLoading } =
    useFeedQuery(coordinates);

  const isLoading = coordinates.latitude === 0 || isFeedLoading;
  const handleAgree = (coordinates: Coordinates) => {
    setCoordinates(coordinates);
  };

  const handleScheduleClick = (id: string) => {
    navigate(`/agendamento/${id}`);
  };

  const handleProfileClick = (id: string) => {
    navigate(`/barbearia/${id}`);
  };

  return (
    <Grid container gap={2}>
      <GeolocationModal onAgree={handleAgree} />
      <Loader open={isLoading} />
      <Grid xs={12} item sx={{ px: 2 }}>
        <AddressCard coordinates={coordinates} />
      </Grid>
      {!isLoading && !feed.length ? (
        <Grid item xs={12}>
          <Stack
            spacing={2}
            height="80vh"
            alignItems="center"
            justifyContent="center"
          >
            <LocationOff
              color="disabled"
              sx={{ width: "100px", height: "100px" }}
            />
            <Typography color="text.secondary" textAlign="center">
              Não encontramos barbearia perto. Mas fique atento, estamos sempre
              adicionando novos estabelecimentos!
            </Typography>
          </Stack>
        </Grid>
      ) : (
        feed.map((item) => {
          return (
            <Grid key={item.barbershop.id} item xs={12}>
              <Card>
                <CardActionArea
                  onClick={() => handleProfileClick(item.barbershop.id)}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pr: 2,
                  }}
                >
                  <CardHeader
                    title={item.barbershop.name}
                    subheader={`${item.distanceKm.toString().split(".")[0]} km`}
                    avatar={<Avatar src={item.barbershop.avatar_url} />}
                  />
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScheduleClick(item.barbershop.id);
                    }}
                    startIcon={<AccessTime />}
                  >
                    Agendar
                  </Button>
                </CardActionArea>
                <CardMedia
                  component="img"
                  height="320"
                  image={
                    item.barbershop.images[item.barbershop.images.length - 1]
                      ?.url ||
                    "https://spamasculino.net/wp-content/uploads/2019/05/barbearia-spa.jpg"
                  }
                  alt="feed"
                />

                <CardActions
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                  }}
                >
                  <IconButton aria-label="compartilhar">
                    <Share />
                  </IconButton>
                  <ContactButton phone={item.barbershop.contact} />
                </CardActions>
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default Feed;
