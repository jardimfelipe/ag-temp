import { useMutation } from "react-query"

import { AxiosResponse } from "axios";

import { api } from "../../../services/api";
import { CreateUserPayload, IUser } from "../types";

const useCreateUser = () => {
    return useMutation(
       async (params: CreateUserPayload) => {
            const {data}:AxiosResponse<IUser> = await api.post(`user/createUser`, params)
            return data
        },
      );
}

export default useCreateUser