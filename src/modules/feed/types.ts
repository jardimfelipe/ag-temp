import { IBarbershop } from "../barbershop/types";

export type Coordinates = {
	latitude: number,
	longitude: number
}

export enum FeedQueryKeys {
    FEED = 'feed'
}

export interface IFeed {
	barbershop: IBarbershop;
	distanceKm: number;
}