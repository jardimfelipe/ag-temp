/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query"
import { api } from "../../../services/api"
import { AxiosResponse } from "axios"
import { BarbershopQueryKeys, IBarbershop } from "../types"

const useBarbershopByIdQuery = (barbershopId?:string) => {
    return useQuery([BarbershopQueryKeys.BARBERSHOP, barbershopId], async () => {
        const {data}: AxiosResponse<IBarbershop>  =  await api.get(
					`/barbershop/${barbershopId}`
        )
				return data
    }, {
			enabled: !!barbershopId
		})
}

export default useBarbershopByIdQuery