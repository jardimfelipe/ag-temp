import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { api } from "../../../services/api";
import { BarbershopQueryKeys } from "../types";

const useDeleteBarber = () => {
  const cache = useQueryClient();
  return useMutation((userId: string) => api.delete(`/barber/${userId}`), {
    onSuccess: () => {
      cache.invalidateQueries(BarbershopQueryKeys.BARBERS);
      toast.success("Barbeiro removido com sucesso");
    },
  });
};

export default useDeleteBarber;
