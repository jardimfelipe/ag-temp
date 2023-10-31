import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import dayjs from "dayjs";

import { LocationOn, Storefront } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import useCreateBarbershop from "../services/useCreateBarbershop";
import { IBarbershopPayload } from "../types";

export const WEEKDAYS = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

interface FormModel extends Omit<IBarbershopPayload, "daysOfWork" | "userId"> {
  daysOfWork: string[];
}

const CreateBarbershop = () => {
  const createBarbershop = useCreateBarbershop();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      cep: "",
      address: "",
      daysOfWork: [],
      startTime: "",
      endTime: "",
      avatar_url: "",
    },
  });

  const onSubmit: SubmitHandler<FormModel> = (data) => {
    const userId = searchParams.get("userId");
    if (!userId) return;
    const weekdays = data.daysOfWork
      .map((day) => WEEKDAYS.findIndex((x) => x === day))
      .join();
    const model = {
      ...data,
      daysOfWork: weekdays,
      startTime: dayjs(data.startTime).format("HH:mm"),
      endTime: dayjs(data.endTime).format("HH:mm"),
      userId,
    };
    createBarbershop.mutate(model, {
      onSuccess: () => {
        toast.success(
          "Sua barbearia foi criada! Agora, entre com seu celular e senha!"
        );
        navigate("/login");
      },
    });
  };
  return (
    <Grid container item xs={12}>
      <Box
        component="form"
        sx={{ mt: 1, width: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2}>
          <Typography variant="h5" textAlign="center">
            Agora, vamos cadastrar sua barbearia!
          </Typography>

          <Controller
            name="name"
            control={control}
            rules={{
              required: "Precisamos do nome pra divulgar o seu negócio!",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome da barbearia"
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Storefront />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{
              required:
                "Precisamos do endereço para achar os clientes mais próximos!",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Endereço"
                error={!!errors.address}
                helperText={
                  errors.address?.message ||
                  "Não esqueça do número. Ex: Rua Alegre, 1"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="cep"
            control={control}
            rules={{
              required:
                "Precisamos do cep para achar os clientes mais próximos!",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="CEP"
                error={!!errors.cep}
                helperText={errors.cep?.message || "Somente números"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="daysOfWork"
            control={control}
            rules={{
              required:
                "Precisamos do cep para achar os clientes mais próximos!",
            }}
            render={({ field }) => (
              <FormControl>
                <InputLabel size="small">Dias aberto</InputLabel>
                <Select
                  multiple
                  {...field}
                  input={<OutlinedInput label="Dias aberto" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {WEEKDAYS.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Stack direction="row" justifyContent="space-between" gap={1}>
            <Controller
              name="startTime"
              control={control}
              rules={{
                required: "Campo obrigatório",
              }}
              render={({ field }) => (
                <TimePicker
                  format="HH:mm"
                  closeOnSelect
                  ampm={false}
                  label="Hora de abertura"
                  {...field}
                />
              )}
            />

            <Controller
              name="endTime"
              control={control}
              rules={{
                required: "Campo obrigatório",
              }}
              render={({ field }) => (
                <TimePicker
                  closeOnSelect
                  ampm={false}
                  format="HH:mm"
                  label="Hora de fechamento"
                  {...field}
                />
              )}
            />
          </Stack>
          <LoadingButton
            loading={createBarbershop.isLoading}
            fullWidth
            variant="contained"
            type="submit"
          >
            Criar
          </LoadingButton>
        </Stack>
      </Box>
    </Grid>
  );
};

export default CreateBarbershop;
