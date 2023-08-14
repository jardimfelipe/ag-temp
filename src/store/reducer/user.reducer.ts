import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../service/user/count-profile";

interface IUserRequestData {
	email: string;
	password: string;
}

const service = new UserService();
export const login = createAsyncThunk(
	"login",
	async (intialState: IUserRequestData) => {
		const response = await service.Login(intialState);
		return response;
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState: {
		isLogged: false,
		id: "",
		email: "",
		age: 0,
		cpf: "",
	},

	reducers: {},
	extraReducers(builder) {
		builder.addCase(login.fulfilled, (state, action) => {
			state.email = action.payload.email;
			state.age = action.payload.age;
			state.cpf = action.payload.cpf;
			state.id = action.payload.id;
			state.isLogged = action.payload.password != null ?? false;
		});
	},
});
