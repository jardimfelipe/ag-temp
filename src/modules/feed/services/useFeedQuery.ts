 
import { useQuery } from "react-query"

import { AxiosResponse } from "axios"

import { api } from "../../../services/api"
import { Coordinates, FeedQueryKeys, IFeed } from "../types"

const useFeedQuery = (coordinates:Coordinates) => {
    return useQuery([FeedQueryKeys.FEED, coordinates], async () => {
        const {data}: AxiosResponse<IFeed[]>  =  await api.get(
            `/barbershop/nearby?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&maxDistanceKm=10`
        )
				return data
    }, {
			enabled: !!coordinates.latitude && !!coordinates.longitude
		})
}

export default useFeedQuery