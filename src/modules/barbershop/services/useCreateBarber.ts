import { useMutation, useQueryClient } from "react-query";

import { api } from "../../../services/api";
import { BarberModel, BarbershopQueryKeys } from "../types";

const useCreateBarber = () => {
  const cache = useQueryClient();
  return useMutation(
    async (params: BarberModel) => {
      await api.post("/barber", params);
    },
    {
      onSuccess: () => {
        cache.invalidateQueries(BarbershopQueryKeys.BARBERS);
      },
    }
  );
};

export default useCreateBarber;
