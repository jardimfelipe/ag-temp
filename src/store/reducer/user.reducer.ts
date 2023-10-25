import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { UserService } from "../../service/user/count-profile";

export interface IUser {
	id: string;
	name: string;
	contact: string;
	email: string;
	age: number;
	gender: number;
	cpf: string;
	privilege?: UserPrivileges;
	created_at: Date;
	manager: boolean | any;
	config: {
		theme: string
	}
}

export enum UserPrivileges {
	CLIENT = 'Client',
	MANAGER = 'Manager',
	BARBER = 'Barber',
	ADMIN = 'Admin'
}

interface IUserRequestData {
	contactFormat: string;
	password: string;
}

interface IAlterUserRequest {
	id: string;
	name: string;
	email: string;
	age: number;
	cpf: string;
}

interface CreateUser {
	name : string;
	contact : string;
	password : string;
}

const service = new UserService();
export const login = createAsyncThunk(
	"login",
	async (intialState: IUserRequestData) => {
		const response = await service.Login(intialState);
		const privilege = await service.GetPrivilege(response?.token as unknown as string)
		console.log('privilege', privilege)
		//@ts-ignore
		return { userData: {...response.user, privilege}, token: response.token };
	}
);

export const alterUser = createAsyncThunk(
	"user/alter",
	async (intialState: IAlterUserRequest) => {
		const response = await service.UpdateUser(intialState, toast);
		return response;
	}
);

export const insertUser = createAsyncThunk(
	"user/insert",
	async (intialState: CreateUser) => {
		return await service.createUser(intialState, toast);
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState: {
		name: "",
		isLogged: false,
		id: "",
		email: "",
		age: 0,
		cpf: "",
		token: "",
		privilege:UserPrivileges.CLIENT,
			manager: false,
		config : {
			theme : "dark"
		}
	},

	reducers: {
		logon: (state) => {
			localStorage.clear();
			state.name = "";
			state.isLogged = false;
			state.id = "";
			state.email = "";
			state.cpf = "";
			state.age = 0;
			state.token = "";
			state.manager = false;
			state.privilege = UserPrivileges.CLIENT
		},
	},
	extraReducers(builder) {
		builder.addCase(login.fulfilled, (state, action) => {
			console.log(action.payload)
			state.name = action.payload.userData.name;
			state.email = action.payload.userData.email;
			state.age = action.payload.userData.age;
			state.cpf = action.payload.userData.cpf;
			state.id = action.payload.userData.id;
			state.manager = action.payload.userData.manager ?? false;
			state.config.theme = "dark"
			state.privilege = action.payload.userData.privilege
			state.isLogged =
				(action.payload.userData as any).password != null ?? false;
			state.token = action.payload.token;
			console.log(action.payload.userData.manager);
			localStorage.setItem("Authorization", action.payload.token);
			localStorage.setItem(
				"IsManager",
				JSON.stringify(action.payload.userData.manager) === null
					? JSON.stringify(action.payload.userData.manager)
					: "false"
			);
		});

		builder.addCase(alterUser.fulfilled, (state) => {
			//TODO resolver a atualização em tempo real, pode quebrar a aplicação inteira, faça backup
			// state.name = action.payload.name;
			// state.email = action.payload.email;
			// state.age = action.payload.age;
			// state.cpf = action.payload.cpf;
			state.isLogged = true;
		});
	},
});

export const { logon } = userSlice.actions;
