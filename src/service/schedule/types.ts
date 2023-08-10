export interface IBarberServices {
	id: string;
	name: string;
	description?: string;
	duration: string;
	price: string;
}

export interface IScheduling {
	id: string;
	description?: string;
	service: IBarberServices;
	startHour: Date;
	endHour: Date;
}

export interface IBarber {
	id: string;
	name: string;
	servicesInDay: IScheduling[];
}
