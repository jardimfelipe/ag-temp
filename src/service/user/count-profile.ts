import { UserTypesMutations } from "../../store/user/user-types";
import { api } from "../api";

interface IUserLogin {
	email: string;
	password: string;
}

export class UserService {
	async GetUserCurrent(id: string) {
		const user = await api
			.get(`user/${id}`)
			.then((value) => value.data)
			.catch((err) => console.log(err));

		return user;
	}

	async UpdateUser(form: any, toast: any, commit: any) {
		const vuex = JSON.parse(localStorage.getItem("vuex") as string);
		await api
			.patch(`user/${vuex.user.id}`, form)
			.then(() => {
				commit(UserTypesMutations.SET_USER_INFO, form);
				toast.success("Usuário foi alterado com sucesso");
			})
			.catch((err) => {
				toast.error(`${err}`);
				return new Error(err);
			});
	}

	async Login({ email, password }: IUserLogin) {
		try {
			const user = await api
				.post<string>("login/client", { email, password })
				.then((value: any) => {
					localStorage.setItem("Authorization", value.data.token);
					return value;
				})
				.catch((err) => console.log(err));

			return user.data.user;
		} catch (err) {
			return new Error(`Algo deu muito errado: ${err}`);
		}
	}

	async GetSession() {
		if (!localStorage.getItem("Authorization")) return false;

		const validation = await api.post("login/session", {
			token: localStorage.getItem("Authorization")?.split(" ")[1],
		});

		return validation.data;
	}

	logon() {
		localStorage.clear();
	}
}
