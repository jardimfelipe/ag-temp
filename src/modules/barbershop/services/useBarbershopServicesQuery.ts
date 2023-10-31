import { useQuery } from "react-query";

import { AxiosResponse } from "axios";

import { api } from "../../../services/api";
import { BarbershopQueryKeys, IBarbershopService } from "../types";

const useBarbershopServicesQuery = (barbershopId: string) => {
  return useQuery(
    [BarbershopQueryKeys.SERVICES, barbershopId],
    async () => {
      const { data }: AxiosResponse<IBarbershopService[]> = await api.get(
        `/service/barbershop/${barbershopId}`
      );
      return data;
    },
    {
      enabled: !!barbershopId,
    }
  );
};

export default useBarbershopServicesQuery;
