import { toast } from "react-toastify";
import { api } from "../api";
import { IBarbershopsListByFeed } from "../../store/types/barbershop";

export class BarbershopService {
	async GetBarbershopsInLocation(
		latitude: string,
		longitude: string
	): Promise<IBarbershopsListByFeed[]> {
		const barbershops = await api
			.get(
				`/barbershop/nearby?latitude=${latitude}&longitude=${longitude}&maxDistanceKm=10`
			)
			.then((value) => value.data)
			.catch((err) => toast.error(err));

		return barbershops;
	}

	async GetSpecificBarbershop(barbershopId: string) {
		const barbershop = api
			.get(`/barbershop/${barbershopId}`)
			.catch((err) => toast.error(err));

		return barbershop;
	}
}
