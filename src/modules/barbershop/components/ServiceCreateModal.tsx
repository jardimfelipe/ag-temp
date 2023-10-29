import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ServiceModel } from "../types";
import { useParams } from "react-router-dom";
import useCreateService from "../services/useCreateService";
import { LoadingButton } from "@mui/lab";
import { theme } from "../../../theme";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const CreateServiceModal = ({ open, onClose, onSuccess }: Props) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { barbershopId } = useParams<{ barbershopId: string }>();
  const createService = useCreateService();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      duration: "",
      price: "",
    },
  });

  const onSubmit: SubmitHandler<ServiceModel> = async (data) => {
    try {
      const model = {
        ...data,
        duration: +data.duration,
        price: +data.price,
        barbershopId: barbershopId as string,
      };

      createService.mutate(model, {
        onSuccess: () => {
          toast.success("Serviço criado com sucesso");
          reset();
          onSuccess();
        },
      });
    } catch (error) {
      toast.error("Ocorreu um erro, verifique os dados e tente novamente");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <Dialog fullScreen={!isDesktop} open={open} onClose={handleClose}>
      <DialogTitle textAlign="center" justifyContent="center">
        Criar um novo serviço
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Campo obrigatório",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome do serviço"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="description"
              rules={{
                required: "Campo obrigatório",
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  label="Descrição"
                />
              )}
            />

            <Controller
              name="duration"
              rules={{
                required: "Campo obrigatório",
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Duração em minutos"
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">min.</InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="price"
              rules={{
                required: "Campo obrigatório",
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Preço"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Box sx={{ mt: 4 }}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button onClick={handleClose}>Fechar</Button>
                <LoadingButton
                  loading={createService.isLoading}
                  variant="contained"
                  type="submit"
                >
                  Criar
                </LoadingButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServiceModal;
