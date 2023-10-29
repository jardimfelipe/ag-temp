/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query"
import { api } from "../../../services/api"
import { AxiosResponse } from "axios"
import { BarbershopQueryKeys, IBarbershopService } from "../types"

const useBarbershopServicesQuery = (barbershopId:string) => {
    return useQuery([BarbershopQueryKeys.SERVICES, barbershopId], async () => {
        const {data}: AxiosResponse<IBarbershopService[]>  =  await api.get(
					`/service/barbershop/${barbershopId}`
        )
				return data
    }, {
			enabled: !!barbershopId
		})
}

export default useBarbershopServicesQuery