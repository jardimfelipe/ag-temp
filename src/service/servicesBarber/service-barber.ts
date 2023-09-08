import { api } from "../api";

export class ServiceBarbersService {
	async getAllService() {
		const service = await api
			.get(`/service`)
			.then((data) => data.data)
			.catch((err) => new Error(err));

		return service;
	}
}
