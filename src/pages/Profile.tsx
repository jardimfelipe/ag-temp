import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  AssignmentInd,
  ElderlyOutlined,
  Email,
  PersonOutline,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AuthContext } from "../modules/auth/context/auth";
import useUpdateUser from "../modules/auth/services/useUpdateUser";
import { UserContextType, UserPayload } from "../modules/auth/types";


const Profile = () => {
  const navigate = useNavigate();

  const { user, insertUser } = useContext(AuthContext) as UserContextType;
  const updateUser = useUpdateUser();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: user?.name as unknown as string,
      age: user?.age as unknown as string,
      email: user?.email as unknown as string,
      cpf: user?.cpf || "Não informado",
      id: user?.id as unknown as string,
    },
  });

  function stringAvatar(name: string) {
    const nameParts = name.split(" ");
    const firstNameInitial = nameParts[0][0];
    const lastNameInitial = nameParts.length > 1 ? nameParts[1][0] : "";

    return {
      children: `${firstNameInitial}${lastNameInitial}`,
    };
  }

  const onSubmit: SubmitHandler<UserPayload> = (data) => {
    if (!user) return;
    updateUser.mutate(
      { ...data, age: +data.age, id: user.id },
      {
        onSuccess: () => {
          toast.success("Dados alterados com sucesso");
        },
      }
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    insertUser(null);
    navigate("/login");
  };

  if (!user) return;
  return (
    <Grid container padding={2} gap={2} sx={{ position: "relative" }}>
      <Grid item xs={12}>
        <Stack justifyContent="center" alignItems="center" gap={1}>
          <Avatar
            sx={{ width: "100px", height: "100px" }}
            {...stringAvatar(user.name)}
          />
          <Typography>{user.name}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Idade"
                  error={!!errors.age}
                  helperText={errors.age?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ElderlyOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="CPF"
                  error={!!errors.cpf}
                  helperText={errors.cpf?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentInd />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <LoadingButton
              loading={updateUser.isLoading}
              fullWidth
              variant="contained"
              type="submit"
            >
              Alterar dados
            </LoadingButton>
            <Button
              onClick={handleLogout}
              fullWidth
              color="error"
              variant="contained"
            >
              sair
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
