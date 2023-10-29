/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query"
import { api } from "../../../services/api"
import { AxiosResponse } from "axios"
import { UserPrivileges } from "../../auth/types"
import { SchedulesQueryKeys } from "../types"

const useSchedulesQuery = (id:string, privilege:UserPrivileges) => {
		const path = privilege === UserPrivileges.CLIENT ? `/schedule/specific/user/${id}`:`/schedule/specific/barbershop/${id}` 
    return useQuery([SchedulesQueryKeys.SCHEDULES, id, privilege], async () => {
        const {data}: AxiosResponse<any[]> = await api.get(path)
				return data
    }, {
			refetchOnMount: true,
			enabled:!!id
		})
}
export default useSchedulesQuery