import { toast } from "react-toastify";
import { api } from "../api";
import { ISchedule } from "../../store/types/schedule";

export class ScheduleService {
	async getSchedule(barbershopId: string) {
		const schedule = await api
			.get(`/schedule/specific/barbershop/${barbershopId}`)
			.then((data) => data.data)
			.catch((err) => toast.error(err));

		return schedule;
	}

	async createNewSchedule(schedule: ISchedule) {
		const scheduleData = await api
			.post("/schedule", schedule)
			.then((shcedule) => {
				toast.success("Agendamento Feito!");
				return shcedule.data;
			})
			.catch((err) => toast.error(`Ocorreu um erro, ${err}`));

		return scheduleData;
	}
}
