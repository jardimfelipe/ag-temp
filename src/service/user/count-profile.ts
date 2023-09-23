// import { UserTypesMutations } from "../../store/user/user-types";
import { api } from "../api";

interface IUserLogin {
	email: string;
	password: string;
}

export class UserService {
	async GetUserCurrent(id: string) {
		const user = await api
			.get(`user/${id}`)
			.then((value: any) => value.data)
			.catch((err: string) => console.log(err));

		return user;
	}

	async UpdateUser(form: any, toast: any) {
		const newUser = await api
			.patch(`user/${form.id}`, form)
			.then((data) => {
				toast.success("Usuário foi alterado com sucesso");
				return data;
			})
			.catch((err: string) => {
				toast.error(`${err}`);
				return new Error(err);
			});

		return newUser;
	}

	async Login({ email, password }: IUserLogin) {
		try {
			const user = await api
				.post<string>("login/client", { email, password })
				.then((value: any) => value)
				.catch((err: string) => console.log(err));

			return { user: user.data.user, token: user.data.token };
		} catch (err) {
			return new Error(`Algo deu muito errado: ${err}`);
		}
	}

	async GetSession(): Promise<boolean> {
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
