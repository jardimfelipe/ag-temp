import { api } from "../api";

export class ImageBarbershopService {
	async postImage(barbershopId: string, image: any) {
		const formData = new FormData();
		formData.append("file", image);

		const message = await api.post(
			`/barbershop/post/${barbershopId}`,
			formData,
			
		);

		return message;
	}

	async changeAvatar(barbershopId: string, image: any) {
		const formData = new FormData();
		formData.append("file", image);

		const message = await api.patch(
			`/barbershop/avatar/${barbershopId}`,
			formData,
			
		);

		return message;
	}
}
