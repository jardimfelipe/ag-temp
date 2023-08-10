import { api } from "../api";

export class ScheduleService {
	async getSchedule(barbershopId: string) {
		const schedule = await api.get(
			`/schedule/specific/barbershop/${barbershopId}`
		);
	}
}
