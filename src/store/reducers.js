import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./storeSlices/userSlice";
import serviceSlice from "./storeSlices/serviceSlice";
import appointmentSlice from "./storeSlices/appointmentSlice";

const reducers = combineReducers({
	User: userSlice.reducer,
	Service: serviceSlice.reducer,
	Appointment: appointmentSlice.reducer,
});

export default reducers;
