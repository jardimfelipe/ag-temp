import { useQuery } from "react-query"
import { api } from "../../../services/api"
import { AxiosResponse } from "axios"
import { AuthQueryKeys, IUser } from "../../auth/types"

const useUsersQuery = () => {
    return useQuery([AuthQueryKeys.USERS], async () => {
        const {data}: AxiosResponse<IUser[]> = await api.get("/user")
				return data
    })
}
export default useUsersQuery