import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUser = createAsyncThunk("fetchUser", async () => {
	const fetchConfig = {
		method: "get",
		url: `/auth/login/success`,
		withCredentials: true,
		credentials: "include",
	};
	// const res = await axios(fetchConfig);
	const res = await axios(fetchConfig);
	if ((res.status / 100).toFixed() !== "2") {
		throw res;
	}
	return res.data;
});

export default fetchUser;
