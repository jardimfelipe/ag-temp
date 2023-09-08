import { toast } from "react-toastify";
import { api } from "../api";
import { UserService } from "../user/count-profile";

export interface IBarber {
	id: string;
	userId: string;
	cpf: string;
	barbershopId: string;
}

export interface IBarberResponse {
	name: string;
	id: string;
	email: string;
	cpf: string;
}
export class BarberService {
	async getBarber(barbershopId: string) {
		const barbers = await api
			.get(`barber/${barbershopId}`)
			.then(async (value) => {
				if (value.data === undefined) {
					throw new Error("n'ao foi retornado nenhum Barber");
				} else {
					return value.data;
				}
			})
			.catch((err) => toast.error(`ocorreu um erro ${err}`));

		return barbers;
	}
}
