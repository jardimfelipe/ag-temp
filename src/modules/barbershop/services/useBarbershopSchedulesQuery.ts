/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query"
import { api } from "../../../services/api"
import { AxiosResponse } from "axios"
import { BarbershopQueryKeys } from "../types"

const useBarberShopSchedulesQuery = (barbershopId:string) => {
    return useQuery([BarbershopQueryKeys.SERVICES, barbershopId], async () => {
        const {data}: AxiosResponse<any[]>  =  await api.get(
					`/schedule/specific/barbershop//${barbershopId}`
        )
				return data
    }, {
			enabled: !!barbershopId
		})
}

export default useBarberShopSchedulesQuery