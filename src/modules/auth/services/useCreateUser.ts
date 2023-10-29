import { useMutation } from "react-query"

import { CreateUserPayload, IUser } from "../types";
import { api } from "../../../services/api";
import { AxiosResponse } from "axios";

const useCreateUser = () => {
    return useMutation(
       async (params: CreateUserPayload) => {
            const {data}:AxiosResponse<IUser> = await api.post(`user/createUser`, params)
            return data
        },
      );
}

export default useCreateUser