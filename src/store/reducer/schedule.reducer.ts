import { ScheduleService } from "../../service/schedule/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISchedule } from "../types/schedule";

const service = new ScheduleService();

export const postSchedule = createAsyncThunk(
	"create/schedule",
	async (schedule: ISchedule) => {
		const response = await service.createNewSchedule(schedule);
		console.log(response);

		return response;
	}
);

export const scheduleSlice = createSlice({
	name: "schedule",
	initialState: {
		id: "",
		title: "",
		start: new Date(), //Date Thu Jul 13 2023 11:52:47 GMT-0300
		end: new Date(), //Date Sat Jul 15 2023 17:52:47 GMT-0300
		description: "",
		color: "",
		recurring: false,
		withServicesBarberId: "",
		withUserClientId: "",
		withBarberId: "",
		withBarbershopId: "",
	},
	reducers: {
		clearState: (state) => {
			state.id = "";
			state.title = "";
			state.color = "white";
			state.description = "";
			state.end = new Date();
			state.start = new Date();
			state.recurring = false;
			state.withBarberId = "";
			state.withUserClientId = "";
			state.withBarberId = "";
			state.withBarbershopId = "";
		},
	},

	extraReducers(builder) {
		builder.addCase(postSchedule.fulfilled, (state, action) => {
			state.id = action.payload.scheduleId;
			state.title = action.payload.title;
			state.color = action.payload.color ?? "white";
			state.description = action.payload.description ?? "não informado";
			state.end = action.payload.end;
			state.start = action.payload.start;
			state.recurring = action.payload.recurring ?? false;
			state.withBarberId = action.payload.withBarberId;
			state.withUserClientId = action.payload.withUserClientId;
			state.withBarberId = action.payload.withBarberId;
			state.withBarbershopId = action.payload.withBarbershopId;
		});
	},
});

export const { clearState } = scheduleSlice.actions;
