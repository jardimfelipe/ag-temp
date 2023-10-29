import { useMutation, useQueryClient } from "react-query"

import { api } from "../../../services/api";
import { BarbershopQueryKeys, ServiceModel } from "../types";

const useCreateService = () => {
  const cache = useQueryClient();
    return useMutation(
        async (params: ServiceModel) => {
          await api.post('/service', params)
        },
        {onSuccess: () => {
          cache.invalidateQueries(BarbershopQueryKeys.SERVICES)
        }}
      );
}

export default useCreateService