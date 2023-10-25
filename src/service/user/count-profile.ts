// import { UserTypesMutations } from "../../store/user/user-types";
import { toast } from "react-toastify";
import { IUser, UserPrivileges } from "../../store/reducer/user.reducer";
import { api } from "../api";

interface IUserLogin {
	contactFormat: string;
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

	async createUser(form: any, toast: any) {
		
		const result = await api.post("user/createUser", form)
		.then((data)=>{
			
			if (data.status >= 200 && data.status <= 299 ) {
				
				toast.success("Usuário inserido com sucesso")
			}else{
				toast.error(data.response.data.message)
			}
		}).catch((err: string) => {
			toast.error(`${err}`);
			return false;
		});

		return result;
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

	async Login({ contactFormat, password }: IUserLogin) {
		try {
			const user = await api
				.post<string>("login/client", { contactFormat, password })
				.then((value: any) => value)
				.catch((err: string) => console.log(err));

			return {
				user: user.data.user as IUser,
				token: user.data.token as string,
			};
		} catch (err) {
			console.log(err);
		}
	}

	async GetSession(): Promise<boolean> {
		if (!localStorage.getItem("Authorization")) return false;

		const validation = await api.post("login/session", {
			token: localStorage.getItem("Authorization")?.split(" ")[1],
		});
		return validation.data;
	}

	async GetPrivilege(token: string):Promise<UserPrivileges> {
		const {data} = await api.get("login/get/privilege", {
			headers: {
				Authorization: token,
			},
		})
		return data
	}

	logon() {
		localStorage.clear();
	}
}
