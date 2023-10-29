import { useMutation } from "react-query"

import { IBarbershop, IBarbershopPayload } from "../types";
import { api } from "../../../services/api";
import { AxiosResponse } from "axios";

const useCreateBarbershop = () => {
    return useMutation(
       async  (params: IBarbershopPayload) => {
        const {userId, ...rest} = params
            const {data}:AxiosResponse<IBarbershop> =  await api.post("/barbershop", rest)
            await api.post("/manager", {userId, barbershopId: data.id})
        },
      );
}

export default useCreateBarbershop