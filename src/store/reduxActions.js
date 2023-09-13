/* Imports of actions */
import userSlice from "./storeSlices/userSlice";
import serviceSlice from "./storeSlices/serviceSlice";
import fetchUser from "./storeMidldewares/fetchUser";
import fetchService from "./storeMidldewares/fetchService";
import appointmentSlice from "./storeSlices/appointmentSlice";
import fetchAppointments from "./storeMidldewares/fetchAppointments";

/* Generic Actions */
export const { resetUserData } = userSlice.actions;
export const { resetServiceData } = serviceSlice.actions;
export const { resetAppointmentData } = appointmentSlice.actions;

/* Thunk Action Hooks */
export const fetchUserInfo = fetchUser;
export const fetchUserService = fetchService;
export const fetchUserAppointment = fetchAppointments;
