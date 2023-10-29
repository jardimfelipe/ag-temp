import { useContext, useState } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardMedia,
  Fab,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

import useBarbershopByIdQuery from "../modules/barbershop/services/useBarberShopByIdQuery";
import { AuthContext } from "../modules/auth/context/auth";
import { UserContextType } from "../modules/auth/types";
import Loader from "../components/Loader";
import {
  Add,
  AddPhotoAlternate,
  Favorite,
  Settings,
} from "@mui/icons-material";
import useUploadBarbershopAvatar from "../modules/barbershop/services/useUploadBarbershopAvatar";
import { toast } from "react-toastify";
import useCreatePost from "../modules/barbershop/services/useCreatePost";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LocationInfo from "../modules/barbershop/components/LocationInfo";
import VisuallyHiddenInput from "../components/HiddenInput";
import ContainedIconButton from "../components/ContainedIconButton";
import BarbershopDrawer from "../modules/barbershop/components/BarbershopDrawer";

dayjs.extend(relativeTime);

const BarbershopProfile = () => {
  const { user } = useContext(AuthContext) as UserContextType;
  const { barbershopId } = useParams<{ barbershopId: string }>();
  const { data: barbershop, isLoading } = useBarbershopByIdQuery(barbershopId);
  const uploadAvatar = useUploadBarbershopAvatar();
  const createPost = useCreatePost();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isBarbershopManager =
    user?.manager && user?.manager.barbershopId === barbershopId;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!barbershopId) return;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      uploadAvatar.mutate(
        { barbershopId, image: file },
        {
          onSuccess: () => {
            toast.success("Avatar alterado com sucesso!");
          },
        }
      );
    }
  };

  const handleCreatePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!barbershopId) return;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      createPost.mutate(
        { barbershopId, image: file },
        {
          onSuccess: () => {
            toast.success("Postado com sucesso!");
          },
        }
      );
    }
  };

  const loading = isLoading || uploadAvatar.isLoading || createPost.isLoading;

  return (
    <Grid container justifyContent="center">
      <Loader open={loading} />
      {isBarbershopManager ? (
        <>
          <Fab
            color="primary"
            component="label"
            sx={{
              position: "fixed",
              bottom: "70px",
              right: "10px",
            }}
          >
            <Add />
            <VisuallyHiddenInput
              onChange={handleCreatePost}
              accept=".png, .jpeg"
              type="file"
            />
          </Fab>
          <Grid px={2} xs={12} item display="flex" justifyContent="flex-end">
            <ContainedIconButton onClick={() => setIsDrawerOpen(true)}>
              <Settings />
            </ContainedIconButton>
          </Grid>
          <BarbershopDrawer
            open={isDrawerOpen}
            barbershopId={barbershopId as string}
            setOpen={(open) => setIsDrawerOpen(open)}
          />
        </>
      ) : null}
      {!barbershop ? null : (
        <>
          <Grid
            item
            xs={12}
            justifyContent="center"
            display="flex"
            sx={{ position: "relative" }}
          >
            <Avatar
              sx={{ width: "100px", height: "100px" }}
              src={barbershop.avatar_url}
            />
            {isBarbershopManager ? (
              <IconButton
                color="primary"
                component="label"
                sx={{ position: "absolute", top: 0, right: "101px" }}
              >
                <AddPhotoAlternate />
                <VisuallyHiddenInput
                  onChange={handleAvatarUpload}
                  accept=".png, .jpeg"
                  type="file"
                />
              </IconButton>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" color="text.primary" textAlign="center">
              {barbershop.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ px: 2, mt: 2 }}>
            <LocationInfo
              showAddress={!isBarbershopManager}
              barbershop={barbershop}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 4 }}>
            <Stack direction="row" justifyContent="center" spacing={4}>
              <Typography color="text.secondary">
                {barbershop.images.length} publicações
              </Typography>
              <Typography color="text.secondary">
                {barbershop.clientFollowBarbershopsId ?? 0} seguidores
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Stack spacing={2}>
              {barbershop.images.map((image, index) => (
                <Card key={index}>
                  <CardMedia
                    component="img"
                    image={image.url}
                    alt="post"
                    height="320"
                  />
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <Favorite />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">
                      Postado {dayjs(image.createdAt).fromNow()}
                    </Typography>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default BarbershopProfile;
