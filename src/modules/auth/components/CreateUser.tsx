import { Phone, Lock, Person } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useCreateUser from "../services/useCreateUser";
import { CreateUserPayload, IUser } from "../types";
import { toast } from "react-toastify";

type Props = {
  onSuccess: (user: IUser) => void;
};

const CreateUser = ({ onSuccess }: Props) => {
  const createUser = useCreateUser();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      contact: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<CreateUserPayload> = (data) => {
    createUser.mutate(data, {
      onSuccess: (response) => {
        toast.success("Usuário criado com sucesso");
        onSuccess(response);
      },
      onError: () => {
        toast.error(
          "Ocorreu um erro ao criar seu usuário, verifique os dados e tente novamente"
        );
      },
    });
  };
  return (
    <Grid container item xs={12}>
      <Box
        sx={{ mt: 1, width: "100%" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2}>
          <Typography variant="h5" textAlign="center">
            Crie seu usuário
          </Typography>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Precisamos do seu nome",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Seu nome"
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="contact"
            control={control}
            rules={{
              required: "Insira um telefone válido",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Seu telefone"
                error={!!errors.contact}
                helperText={errors.contact?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="password"
            rules={{
              required: "Por favor, informe sua senha",
            }}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.password}
                type="password"
                helperText={errors.password?.message}
                label="Sua senha"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Box sx={{ mt: 4 }}>
            <Stack alignItems="center" spacing={2}>
              <LoadingButton
                loading={createUser.isLoading}
                fullWidth
                variant="contained"
                type="submit"
              >
                Criar
              </LoadingButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
};

export default CreateUser;
