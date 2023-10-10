import { toast } from "react-toastify";
import { api } from "../api";
import {
	IBarbershop,
	IBarbershopsListByFeed,
} from "../../store/types/barbershop";

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
		const barbershop = await api
			.get<IBarbershop>(`/barbershop/${barbershopId}`)
			.catch((err) => toast.error(err));

		return barbershop;
	}

	async createNewPost(barbershopId: string, file: any) {
		const message = await api
			.post(`/images/barbershop/${barbershopId}`, {
				file,
			})
			.catch((err) => toast.error(err));

		return message;
	}

	async alterBarbershopAvatar(barbershopId: string, body: any) {
		const formData = new FormData();
		formData.append("file", body.newImage);

		const barbershop = await api
			.patch(`/barbershop/${barbershopId}`, formData, {
				headers: {
					"Content-Type": `multipart/form-data, boundary=${
						(formData as any)._boundary
					}`,
				},
			})
			.then((barbershop) => barbershop.data);

		return barbershop.data;
	}
}
