import { api } from "../api";

export class ServiceBarbersService {
	async getService(id: string) {
		const service = await api
			.get(`/service/barber/${id}`)
			.then((data) => data.data)
			.catch((err) => new Error(err));

		return await service;
	}
}
