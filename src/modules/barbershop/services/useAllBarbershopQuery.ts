/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query"
import { api } from "../../../services/api"
import { AxiosResponse } from "axios"
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