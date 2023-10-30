 
import { useQuery } from "react-query"

import { AxiosResponse } from "axios"

import { api } from "../../../services/api"
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