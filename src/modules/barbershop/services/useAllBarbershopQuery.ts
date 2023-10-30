 
import { useQuery } from "react-query"

import { AxiosResponse } from "axios"

import { api } from "../../../services/api"
import { BarbershopQueryKeys, IBarbershop } from "../types"

const useAllBarbershopQuery = () => {
    return useQuery([BarbershopQueryKeys.ALL], async () => {
        const {data}: AxiosResponse<IBarbershop[]>  =  await api.get(
            `/barbershop`
        )
				return data
    }, {
		})
}

export default useAllBarbershopQuery