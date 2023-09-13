import { STATES } from "../../utils/enums";
import { createSlice } from "@reduxjs/toolkit";
import fetchAppointments from "../storeMidldewares/fetchAppointments";

const appointmentSlice = createSlice({
	name: "logedinAppointment",
	initialState: {
		error: false,
		state: STATES.LOADING,
		data: [],
		msg: "",
	},
	reducers: {
		resetAppointmentData: (state) => {
			state.data = [];
			state.msg = "";
			state.error = false;
			state.state = STATES.LOADING;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAppointments.pending, (state) => {
			state.state = STATES.LOADING;
			state.data = [];
			state.error = false;
		});
		builder.addCase(fetchAppointments.fulfilled, (state, action) => {
			state.data = action.payload.data;
			state.msg = action.payload.msg;
			state.state = STATES.SUCCESS;
		});
		builder.addCase(fetchAppointments.rejected, (state, action) => {
			state.error = true;
			state.msg = action.error.message;
			state.data = [];
			state.state = STATES.IDLE;
		});
	},
});

export default appointmentSlice;
