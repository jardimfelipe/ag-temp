/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query"
import { api } from "../../../services/api"
import { AxiosResponse } from "axios"
import { BarbershopQueryKeys } from "../types"

const useBarbersQuery = (barbershopId:string) => {
    return useQuery([BarbershopQueryKeys.BARBERS, barbershopId], async () => {
        const {data}: AxiosResponse<any[]>  =  await api.get(
					`/barber/${barbershopId}`
        )
				const barberList = [];
				for (const barber of data) {
					const resp = await api.get(`user/${barber.userId}`)
					barberList.push(resp.data);
				}
				return barberList
    }, {
			enabled: !!barbershopId
		})
}

export default useBarbersQuery