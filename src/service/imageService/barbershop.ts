import { api } from "../api";

export class ImageBarbershopService {
	async postImage(barbershopId: string, image: any) {
		const formData = new FormData();
		formData.append("file", image);

		const message = await api.post(
			`/images/barbershop/${barbershopId}`,
			formData,
			{
				headers: {
					"Content-Type": `multipart/form-data`,
				},
			}
		);

		return message;
	}
}
