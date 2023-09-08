import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { UserService } from "../../service/user/count-profile";

export interface IUser {
	id: string;
	name: string;
	email: string;
	age: number;
	gender: number;
	cpf: string;
	privilege: number;
	created_at: Date;
}

interface IUserRequestData {
	email: string;
	password: string;
}

interface IAlterUserRequest {
	id: string;
	name: string;
	email: string;
	age: number;
	cpf: string;
}

const service = new UserService();
export const login = createAsyncThunk(
	"login",
	async (intialState: IUserRequestData) => {
		const response = await service.Login(intialState);
		//@ts-ignore
		return { userData: response.user, token: response.token };
	}
);

export const alterUser = createAsyncThunk(
	"user/alter",
	async (intialState: IAlterUserRequest) => {
		const response = await service.UpdateUser(intialState, toast);
		return response;
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
		},
	},
	extraReducers(builder) {
		builder.addCase(login.fulfilled, (state, action) => {
			state.name = action.payload.userData.name;
			state.email = action.payload.userData.email;
			state.age = action.payload.userData.age;
			state.cpf = action.payload.userData.cpf;
			state.id = action.payload.userData.id;
			state.isLogged = action.payload.userData.password != null ?? false;
			state.token = action.payload.token;
			localStorage.setItem("Authorization", action.payload.token);
		});

		builder.addCase(alterUser.fulfilled, (state, action) => {
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
