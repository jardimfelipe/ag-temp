import { toast } from "react-toastify";

import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { IUser } from "../../auth/types";
import useDeleteBarber from "../services/useDeleteBarber";

export type DeleteBarberProps = {
  options: {
    barber: IUser | null;
    open: boolean;
  };
  onClose: () => void;
};

const BarberDeleteModal = ({ options, onClose }: DeleteBarberProps) => {
  const deleteBarber = useDeleteBarber();

  const confirm = () => {
    if (!options.barber) {
      toast.error("Selecione o barbeiro para remover");
      return;
    }
    deleteBarber.mutate(options.barber.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Dialog open={options.open} onClose={onClose}>
      <DialogTitle>
        Tem certeza que deseja excluir o {options.barber?.name}?
      </DialogTitle>
      <DialogContent>Essa ação não pode ser desfeita!</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <LoadingButton
          loading={deleteBarber.isLoading}
          variant="contained"
          onClick={confirm}
        >
          Excluir
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default BarberDeleteModal;
