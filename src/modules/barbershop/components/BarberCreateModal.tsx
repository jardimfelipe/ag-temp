import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  useMediaQuery,
} from "@mui/material";
import UsersSelect from "../../auth/components/UsersSelect";
import { theme } from "../../../theme";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { IUser } from "../../auth/types";
import { useParams } from "react-router-dom";
import useCreateBarber from "../services/useCreateBarber";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const BarberCreateModal = ({ open, onClose, onSuccess }: Props) => {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const { barbershopId } = useParams<{ barbershopId: string }>();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const createBarber = useCreateBarber();

  const handleCreateBarber = () => {
    if (!selectedUser || !barbershopId) return;
    const model = {
      barbershopId,
      userId: selectedUser.id,
    };

    createBarber.mutate(model, {
      onSuccess: () => {
        toast.success("Serviço criado com sucesso");
        onSuccess();
      },
    });
  };
  return (
    <Dialog fullScreen={!isDesktop} open={open} onClose={onClose}>
      <DialogTitle textAlign="center" justifyContent="center">
        Adicionar um novo barbeiro
      </DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          <UsersSelect value={selectedUser} onChange={setSelectedUser} />
          <Stack mt={4} direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={onClose}>Fechar</Button>
            <LoadingButton
              loading={createBarber.isLoading}
              onClick={handleCreateBarber}
              variant="contained"
            >
              Adicionar
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default BarberCreateModal;
