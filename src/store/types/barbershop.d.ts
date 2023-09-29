export interface IBarbershopsListByFeed {
	barbershop: Barbershop;
	distanceKm: number;
}

export interface Barbershop {
	id: string;
	name: string;
	address: string;
	cep: string;
	longitude: string;
	latitude: string;
	clientFollowBarbershopsId: null | string;
	images: Image[];
}

export interface Image {
	id: string;
	url: string;
	createdAt: Date;
	barbershopId: string;
	servicesBarberId: null | any;
}
