import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchService = createAsyncThunk("fetchService", async () => {
	const fetchConfig = {
		method: "get",
		url: `/service/list`,
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

export default fetchService;
