import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAppointments = createAsyncThunk(
	"fetchAppointments",
	async (consultantEmail) => {
		const fetchConfig = {
			method: "get",
			url: `/appointment/list/` + consultantEmail,
			withCredentials: true,
			credentials: "include",
		};
		// const res = await axios(fetchConfig);
		const res = await axios(fetchConfig);
		if ((res.status / 100).toFixed() !== "2") {
			throw res;
		}
		return res.data;
	}
);

export default fetchAppointments;
