import { toast } from "react-toastify";
import { api } from "../api";
import { ISchedule } from "../../store/types/schedule";

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
