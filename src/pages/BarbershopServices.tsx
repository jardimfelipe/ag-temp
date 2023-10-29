import { Fab, Grid, Stack, Typography } from "@mui/material";
import { ServiceList } from "../modules/barbershop/components/ServiceList";
import { useContext, useState } from "react";
import { AuthContext } from "../modules/auth/context/auth";
import { UserContextType } from "../modules/auth/types";
import { Add, ChevronLeft } from "@mui/icons-material";
import CreateServiceModal from "../modules/barbershop/components/ServiceCreateModal";
import ContainedIconButton from "../components/ContainedIconButton";
import { useNavigate } from "react-router-dom";

const BarbershopServices = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext) as UserContextType;
  const [modalCreateService, setModalCreateService] = useState(false);

  const handleModal = () => {
    setModalCreateService(!modalCreateService);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!user) {
    return <></>;
  }
  return (
    <Grid container padding={2} gap={2}>
      <CreateServiceModal
        onSuccess={handleModal}
        open={modalCreateService}
        onClose={handleModal}
      />
      <Fab
        color="primary"
        onClick={handleModal}
        sx={{
          position: "fixed",
          bottom: "70px",
          right: "10px",
        }}
      >
        <Add />
      </Fab>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" gap={2}>
          <ContainedIconButton onClick={goBack}>
            <ChevronLeft />
          </ContainedIconButton>
          <Typography variant="h6">Serviços</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack gap={2}>
          <ServiceList barbershopId={user.manager.barbershopId} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BarbershopServices;
