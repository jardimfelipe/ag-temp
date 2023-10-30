import { useMutation } from "react-query"

import { AxiosResponse } from "axios";

import { api } from "../../../services/api";
import { IBarbershop, IBarbershopPayload } from "../types";

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