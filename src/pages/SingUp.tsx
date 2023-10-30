import { useNavigate, useSearchParams } from "react-router-dom";

import { ChevronLeft, PersonAddAlt, Storefront } from "@mui/icons-material";
import { Card, CardActionArea, Grid, Stack, Typography } from "@mui/material";

import ContainedIconButton from "../components/ContainedIconButton";
import CreateUser from "../modules/auth/components/CreateUser";
import { IUser } from "../modules/auth/types";
import CreateBarbershop from "../modules/barbershop/components/CreateBarbershop";

type UserTypes = "client" | "manager";

const SingUp = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const signUpStep = searchParams.get("signUpStep");
  const userType = searchParams.get("userType");

  const handleBack = () => {
    navigate("/login");
  };

  const handleUserTypeClick = (userType: UserTypes) => {
    searchParams.set("userType", userType);
    searchParams.set("signUpStep", "user");
    setSearchParams(searchParams);
  };

  const handleCreateUser = (user: IUser) => {
    if (userType === "client") {
      navigate({
        pathname: "/login",
        search: `?phone=${user.contact}`,
      });
      return;
    }
    searchParams.set("userId", user.id);
    searchParams.set("signUpStep", "barbershop");
    setSearchParams(searchParams);
  };

  return (
    <Grid container sx={{ p: 2 }} spacing={2}>
      <Grid item xs={12}>
        <ContainedIconButton onClick={handleBack}>
          <ChevronLeft />
        </ContainedIconButton>
      </Grid>
      {!signUpStep ? (
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Typography variant="h5" textAlign="center">
              Vamos começar!
            </Typography>
            <Card sx={{ borderRadius: "20px" }}>
              <CardActionArea
                onClick={() => handleUserTypeClick("client")}
                sx={{ py: 2 }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <PersonAddAlt
                    color="disabled"
                    sx={{ height: "60px", width: "80px" }}
                  />
                  <Typography>Quero achar uma barbearia!</Typography>
                </Stack>
              </CardActionArea>
            </Card>

            <Card sx={{ borderRadius: "20px" }}>
              <CardActionArea
                sx={{ py: 2 }}
                onClick={() => handleUserTypeClick("manager")}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Storefront
                    color="disabled"
                    sx={{ height: "60px", width: "80px" }}
                  />
                  <Typography>Sou dono de barbearia!</Typography>
                </Stack>
              </CardActionArea>
            </Card>
          </Stack>
        </Grid>
      ) : null}

      {signUpStep === "user" ? (
        <CreateUser onSuccess={handleCreateUser} />
      ) : null}

      {signUpStep === "barbershop" ? <CreateBarbershop /> : null}
    </Grid>
  );
};

export default SingUp;
