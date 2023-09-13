import PropTypes from "prop-types";
import "./DataTable.css";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUserAppointment } from "../store/reduxActions";

function DataTable({ data }) {
	const loginstore = useSelector((state) => state.User.data);
	const dispatch = useDispatch();
	const handleAppointmentDelete = async (e) => {
		if (
			!confirm(
				"Warning: This event for triggers to delete appointment from our Base Only till date.."
			)
		)
			throw Error("You Cancled the Process");
		const id = e.target.id;
		try {
			const axiosConfig = {
				method: "delete",
				url: "/appointment/" + id,
				withCredentials: true,
				credentials: "include",
			};
			const response = await axios(axiosConfig);
			if ((response.status / 100).toFixed() !== "2") {
				throw response;
			}
			dispatch(fetchUserAppointment(loginstore.EMAIL));
			return response.message;
		} catch (error) {
			throw error?.response?.data?.msg || error.message;
		}
	};
	return (
		<div className="custom-appointment-table">
			<table>
				<thead>
					<tr>
						<th>Client Name</th>
						<th>Date</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Weekday</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className="table-body">
					{data.map((appointment) => (
						<tr key={appointment.ID}>
							<td>{appointment.CLIENT_NAME}</td>
							<td>{format(new Date(appointment.FROM_DATE), "dd/MM/yy")}</td>
							<td>{appointment.FROM_TIME}</td>
							<td>{appointment.TO_TIME}</td>
							<td>{appointment.FROM_WEEKDAY}</td>
							<td>
								{appointment.MEETING_LINK && (
									<a
										target="_blank"
										className="btn primary"
										href={appointment.MEETING_LINK}
										rel="noopener noreferrer"
									>
										Join Meeting
									</a>
								)}
								&nbsp;&nbsp;
								<button
									className="btn danger"
									id={appointment.ID}
									onClick={(e) =>
										toast.promise(
											handleAppointmentDelete(e),
											{
												loading: "Please Wait While we create your Service !",
												success: "Service Succcess fully Created !",
												error: (error) =>
													"Something Went Wrong! " + error ||
													"Please try after Sometime...",
											},
											{ position: "top-center" }
										)
									}
								>
									Cancle
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

DataTable.propTypes = {
	data: PropTypes.array,
};

export default DataTable;
