import { useNavigate, useParams } from "react-router-dom";
import { Fab, Grid, Stack, Typography } from "@mui/material";
import BarbersList from "../modules/barbershop/components/BarbersList";
import ContainedIconButton from "../components/ContainedIconButton";
import { Add, ChevronLeft } from "@mui/icons-material";
import { useState } from "react";
import BarberCreateModal from "../modules/barbershop/components/BarberCreateModal";

const Barbers = () => {
  const { barbershopId } = useParams<{ barbershopId: string }>();
  const navigate = useNavigate();

  const [modalCreateBarber, setModalCreateBarber] = useState(false);

  const handleToggleModal = () => {
    setModalCreateBarber(!modalCreateBarber);
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Grid container p={2} gap={2}>
      <BarberCreateModal
        open={modalCreateBarber}
        onSuccess={handleToggleModal}
        onClose={handleToggleModal}
      />
      <Fab
        color="primary"
        onClick={handleToggleModal}
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
          <Typography variant="h6">Barbeiros</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack gap={2}>
          <BarbersList barbershopId={barbershopId as string} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Barbers;
