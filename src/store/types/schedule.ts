export interface ISchedule {
	id: string;
	title: string;
	start: string;
	end: string;
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
