import { STATES } from "../../utils/enums";
import { createSlice } from "@reduxjs/toolkit";
import fetchService from "../storeMidldewares/fetchService";

const userSlice = createSlice({
	name: "Service",
	initialState: {
		page: 1,
		pageSize: 10,
		totalPages: 1,
		totalItems: 0,
		services: [],
		error: false,
		state: STATES.LOADING,
		msg: "",
	},
	reducers: {
		resetServiceData: (state) => {
			state.page = 1;
			state.pageSize = 10;
			state.totalPages = 1;
			state.totalItems = 0;
			state.services = [];
			state.msg = "";
			state.error = false;
			state.state = STATES.LOADING;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchService.pending, (state) => {
			state.state = STATES.LOADING;
			state.page = 1;
			state.pageSize = 10;
			state.totalPages = 1;
			state.totalItems = 0;
			state.services = [];
			state.error = false;
		});
		builder.addCase(fetchService.fulfilled, (state, action) => {
			state.page = action.payload.data.page;
			state.pageSize = action.payload.data.pageSize;
			state.totalPages = action.payload.data.totalPages;
			state.totalItems = action.payload.data.totalItems;
			state.services = action.payload.data.services;
			state.msg = action.payload.msg;
			state.state = STATES.SUCCESS;
		});
		builder.addCase(fetchService.rejected, (state, action) => {
			state.error = true;
			state.msg = action.error.message;
			state.page = 1;
			state.pageSize = 10;
			state.totalPages = 1;
			state.totalItems = 0;
			state.services = [];
			state.state = STATES.IDLE;
		});
	},
});

export default userSlice;
