import { ISchedule } from "../../store/types/schedule";
import { api } from "../api";

export class ScheduleService {
	async getSchedule(barbershopId: string){
		const schedule = await api.get(
			`/schedule/specific/barbershop/${barbershopId}`
		);
		return schedule.data
	}

	async createNewSchedule(schedule:ISchedule) {
		try {
			const scheduleData = await api.post(`/schedule`, schedule)

			return scheduleData
		} catch (error) {
			return error
		}
	}

	async getScheduleByIdUser(idUser : string):Promise<ISchedule[]>{
		const schedule = await api.get(
			`/schedule/specific/user/${idUser}`
		);
		console.log(idUser)
		return schedule.data
	}
}
