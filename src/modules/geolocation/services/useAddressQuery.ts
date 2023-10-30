/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query"

import { AxiosResponse } from "axios"

import { api } from "../../../services/api"
import { Coordinates } from "../../feed/types"
import { GeolocationQueryKeys } from "../types"

const useAddressQuery = (coordinates:Coordinates) => {
    return useQuery([GeolocationQueryKeys.REVERSE, coordinates], async () => {
        const {latitude, longitude} = coordinates
        const {data}: AxiosResponse<any>  =  await api.get(
					`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
        )
				return data.address
    }, {
			enabled: coordinates.latitude !== 0 && coordinates.longitude !== 0
		})
}

export default useAddressQuery