import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BarberService } from "../../service/barber";
import { UserService } from "../../service/user/count-profile";

const service = new BarberService();
const userService = new UserService();

export const getBarbers = createAsyncThunk(
	"get/barbers",
	async (barbershopId: string) => {
		const response = await service.getBarber(barbershopId);
		response.map((data: any) => userService.GetUserCurrent(data.userId));
		return response;
	}
);

export const barberSlice = createSlice({
	name: "barber",
	initialState: [
		{
			name: "",
			id: "",
			email: "",
			cpf: "",
		},
	],
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getBarbers.fulfilled, (state, action) => {
			action.payload.map((barber: any, id: number) => {
				if (state[id].id !== undefined) {
					state[id].id = barber.id;
					state[id].name = barber.name;
					state[id].email = barber.email;
					state[id].cpf = barber.cpf;

					if (state.length === 1) {
						state.push(barber);
					}
				}
			});
		});
	},
});
