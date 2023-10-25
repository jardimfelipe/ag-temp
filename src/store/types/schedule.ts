import { IUser } from "../reducer/user.reducer";

export interface ISchedule {
	description: string;
	id?: string;
	title: string;
	start: Date;
	end: Date;
	withServicesBarberId: string;
	withUserClientId: string;
	withBarberId: string;
	withBarbershopId: string;
	withUserClient: IUser
}

export interface IScheduleModel extends Omit<ISchedule, "description" | "withUserClient">{}

export interface IStateSchedule {
	main: ISchedule;
	scheduleExternal: ISchedule[];
}
