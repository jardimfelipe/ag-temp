import { useMutation, useQueryClient } from "react-query";

import { api } from "../../../services/api";
import { BarbershopQueryKeys, IBarbershopStatusPayload } from "../types";

const useChangeBarbershopStatus = () => {
  const cache = useQueryClient();
  return useMutation(
    async (params: IBarbershopStatusPayload) => {
      await api.patch(`/barbershop/status/${params.barbershopId}`, {
        isActive: params.isActive,
      });
    },
    {
      onSuccess: () => {
        cache.invalidateQueries(BarbershopQueryKeys.ALL);
      },
    }
  );
};

export default useChangeBarbershopStatus;
