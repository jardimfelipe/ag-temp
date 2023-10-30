import { Dayjs } from "dayjs";

export interface IBarbershop {
	id: string;
	name: string;
	address: string;
	cep: string;
	longitude: string;
	latitude: string;
	clientFollowBarbershopsId: null | string;
	avatar_url: string
	images: Image[];
	contact:string;
	daysOfWork: string;
	startTime: string;
	endTime: string
	isActive: boolean
}

export interface Image {
	id: string;
	url: string;
	createdAt: Date;
	barbershopId: string;
	servicesBarberId?: string;
}

export interface IBarbershopService {
	id: string;
	name: string;
	description?: string;
	duration: string;
	price: string;
}

export enum BarbershopQueryKeys {
	SERVICES = 'services',
	BARBERS = 'barbers',
	BARBERSHOP = 'barbershop',
	ALL = 'all'
}

export interface SchedulePayload {
	title: string,
	start: Dayjs,
	end: Dayjs,
	withServicesBarberId: string,
	withUserClientId: string,
	withBarberId: string,
	withBarbershopId: string
}

export interface UploadAvatarPayload {
	barbershopId: string
	image: File
}

export interface ServiceModel {
	name: string;
	description: string;
	duration: string | number;
	price: string;
  }

  export interface BarberModel {
	userId: string
	barbershopId: string
  }

  export interface IBarbershopPayload {
	name: string;
	address: string;
	cep: string;
	daysOfWork: string;
	startTime: string;
	endTime: string
	userId:string
}

export interface IBarbershopStatusPayload {
	barbershopId: string
	isActive: boolean
}