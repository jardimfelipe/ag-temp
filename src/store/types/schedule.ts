export interface ISchedule {
	id?: string;
	title: string;
	start: Date;
	end: Date;
	withServicesBarberId: string;
	withUserClientId: string;
	withBarberId: string;
	withBarbershopId: string;
}

export interface IStateSchedule {
	main: ISchedule;
	scheduleExternal: ISchedule[];
}
