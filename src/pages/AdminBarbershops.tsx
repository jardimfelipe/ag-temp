import { Grid, Typography } from "@mui/material";
import AllBarbershopsList from "../modules/barbershop/components/AllBarbershopsList";

const AdminBarbershops = () => {
  return (
    <Grid container px={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Administração</Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
        <AllBarbershopsList />
      </Grid>
    </Grid>
  );
};

export default AdminBarbershops;
