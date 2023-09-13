import { STATES } from "../../utils/enums";
import { createSlice } from "@reduxjs/toolkit";
import fetchUser from "../storeMidldewares/fetchUser";

const userSlice = createSlice({
	name: "User",
	initialState: {
		error: false,
		state: STATES.LOADING,
		data: {},
		msg: "",
	},
	reducers: {
		resetUserData: (state) => {
			state.data = {};
			state.msg = "";
			state.error = false;
			state.state = STATES.LOADING;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state) => {
			state.state = STATES.LOADING;
			state.data.loggedIn = false;
			state.data = {};
			state.error = false;
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.data = action.payload.data;
			state.data.loggedIn = true;
			state.msg = action.payload.msg;
			state.state = STATES.SUCCESS;
		});
		builder.addCase(fetchUser.rejected, (state, action) => {
			state.error = true;
			state.msg = action.error.message;
			state.data = {};
			state.state = STATES.IDLE;
		});
	},
});

export default userSlice;
