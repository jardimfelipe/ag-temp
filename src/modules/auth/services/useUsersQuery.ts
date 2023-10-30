import { useQuery } from "react-query"

import { AxiosResponse } from "axios"

import { api } from "../../../services/api"
import { AuthQueryKeys, IUser } from "../../auth/types"

const useUsersQuery = () => {
    return useQuery([AuthQueryKeys.USERS], async () => {
        const {data}: AxiosResponse<IUser[]> = await api.get("/user")
				return data
    })
}
export default useUsersQuery