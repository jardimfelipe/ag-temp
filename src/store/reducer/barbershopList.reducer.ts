import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BarbershopService } from "../../service/barbershop";
import { Image } from "../types/barbershop";

const barbershopService = new BarbershopService();
export const getBarbershopNearbyDistance = createAsyncThunk(
	"barbershops/get",
	async (intialState: { latitude: string; longitude: string }) => {
		const response = await barbershopService.GetBarbershops(
			intialState.latitude,
			intialState.longitude
		);

		return response;
	}
);

export const barbershopsSlice = createSlice({
	name: "barbershops",
	initialState: [
		{
			barbershop: {
				name: "",
				address: "",
				cep: "",
				latitude: "",
				longitude: "",
				images: [] as Image[],
			},
			distanceKm: 0,
		},
	],

	reducers: {
		// logon: (state) => {
		// 	localStorage.clear();
		// 	state.name = "";
		// 	state.isLogged = false;
		// 	state.id = "";
		// 	state.email = "";
		// 	state.cpf = "";
		// 	state.age = 0;
		// 	state.token = "";
		// },
	},
	extraReducers(builder) {
		builder.addCase(
			getBarbershopNearbyDistance.fulfilled,
			(state, action) => {
				state =
					state[0] === undefined
						? action.payload
						: [...state, ...action.payload];
			}
		);
	},
});
