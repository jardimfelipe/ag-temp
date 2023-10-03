import { api } from "../api";

export class ServiceBarbersService {
	async getAllService(barbershopId: string) {
		const service = await api
			.get(`/service/barbershop/${barbershopId}`)
			.then((data) => data.data)
			.catch((err) => new Error(err));

		return service;
	}
}
