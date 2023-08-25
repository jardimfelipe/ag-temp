import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServiceBarbersService } from "../../service/servicesBarber/service-barber";

const service = new ServiceBarbersService();
export const getAllServices = createAsyncThunk("service/get/all", async () => {
	const response = await service.getAllService();
	return response;
});

export const serviceListSlice = createSlice({
	name: "serviceList",
	initialState: [
		{
			id: "",
			name: "",
			description: "",
			duration: 0,
			price: 0,
			barbershopId: "",
		},
	],

	reducers: {},
	extraReducers(builder) {
		builder.addCase(getAllServices.fulfilled, (state, action) => {
			state =
				state[0] === undefined
					? action.payload
					: [...state, action.payload];
		});
	},
});

export const {} = serviceListSlice.actions;
