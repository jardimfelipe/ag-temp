export interface ISchedule {
	id: string;
	title: string;
	start: Date;
	end: Date;
	description: string;
	color: string;
	recurring: boolean;
	withServicesBarberId: string;
	withUserClientId: string;
	withBarberId: string;
	withBarbershopId: string;
}

export interface IStateSchedule {
	main: ISchedule;
	scheduleExternal: ISchedule[];
}
