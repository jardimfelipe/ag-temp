import {
  Box,
  Container,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NavLink, useSearchParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { LoginPayload } from "../modules/auth/types";
import useLogin from "../modules/auth/services/useLogin";
import { Lock, Phone } from "@mui/icons-material";
import { phoneSchema } from "../utils/schemaValidations";

const schema = yup.object({
  contactFormat: phoneSchema.required("Por favor, informe seu número"),
  password: yup.string().required("Insira sua senha"),
});

const Login = () => {
  const login = useLogin();
  const [searchParams] = useSearchParams();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      contactFormat: searchParams.get("phone") || "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginPayload> = (data) => {
    login.mutate(data);
  };

  return (
    <Container maxWidth="sm">
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <Box
          sx={{ mt: 1, width: "100%" }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={2}>
            <Typography variant="h5" textAlign="center">
              Entrar
            </Typography>
            <Controller
              name="contactFormat"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Seu telefone"
                  error={!!errors.contactFormat}
                  helperText={errors.contactFormat?.message}
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
                  loading={login.isLoading}
                  fullWidth
                  variant="contained"
                  type="submit"
                >
                  Entrar
                </LoadingButton>
                {login.isError ? (
                  <Typography color="error" variant="subtitle2">
                    Usuário ou senha inválido
                  </Typography>
                ) : null}
                <Typography>
                  Não tem uma conta?{" "}
                  <Link component={NavLink} to="/signup">
                    Crie agora!
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
