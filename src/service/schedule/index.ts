import { api } from "../api";

export class ScheduleService {
	async getSchedule(barbershopId: string) {
		const schedule = await api.get(
			`/schedule/specific/barbershop/${barbershopId}`
		);
		return schedule.data
	}

	async getScheduleByIdUser(idUser : string){
		const schedule = await api.get(
			`/schedule/specific/user/${idUser}`
		);
		console.log(idUser)
		return schedule.data
	}
}
