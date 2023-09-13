import { useEffect, useState } from "react";
import "./Booking.css";
import axios from "axios";
import { NavLink, Navigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const Confirmation = () => {
	const [appointmentDetails, setAppointmentDetails] = useState({});
	const [loading, setLoading] = useState(true);
	const { email, event } = useParams();
	const searchParams = new URLSearchParams(location.search);
	const appointment_id = searchParams.get("id");
	useEffect(() => {
		if (event && email && appointment_id)
			axios
				.get("/appointment/" + appointment_id, { withCredentials: true })
				.then((res) => {
					setLoading(false);
					setAppointmentDetails(res.data.data);
				})
				.catch((error) => {
					setLoading(false);
					console.error("Error fetching appointment details:", error);
				});
	}, [email, event, appointment_id]);
	return (
		<main className="flex items-center justify-center flex-col confirmation-container">
			{loading ? (
				<Spinner />
			) : Object.keys(appointmentDetails).length ? (
				<>
					<div className="greeting">
						<h1
							style={{ color: "#40B5AD" }}
							className="flex gap-1 items-center justify-center"
						>
							Hello, {appointmentDetails.name}! <CheckCircle2 size={50} />
						</h1>
						<p>
							Thank you for scheduling a meeting with{" "}
							<span
								className="text-primary"
								style={{ fontWeight: "bold", textTransform: "uppercase" }}
							>
								{appointmentDetails.CLIENT_NAME}
							</span>
						</p>
					</div>
					<div className="appointment-details">
						<h2 style={{ color: "#59CBD9 " }}>Appointment Confirmed</h2>
						<p>
							Date: {format(new Date(appointmentDetails.FROM_DATE), "dd/MM/yy")}
						</p>
						<p>Time: {appointmentDetails.FROM_TIME}</p>
					</div>
					<NavLink to="/" className="btn fill-blue pm">
						Home
					</NavLink>
				</>
			) : (
				<Navigate to={"/"} state={{ location: "" }} replace />
			)}
		</main>
	);
};

export default Confirmation;
