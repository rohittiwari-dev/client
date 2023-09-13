import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import generateTimeSlots from "../../utils/generateTimeSlots";
import { ArrowLeftCircleIcon, Clock, VideoIcon } from "lucide-react";
import addTime from "../../utils/addTime";

const ServiceBooking = () => {
	const [loading, setLoading] = useState(false);
	const [selectedDate, setSalectedDate] = useState("");
	const [selectedFromTime, setSelectedFromTime] = useState("");
	const [selectedToTime, setSelectedToTime] = useState("");
	const [clientEmail, setClientEmail] = useState("");
	const [clientName, setClientName] = useState("");
	const [guestEmails, setGuestEmail] = useState("");
	const [enableGuest, setEnableGuest] = useState(false);
	const [serviceState, setServiceState] = useState({});
	const [timeSlots, setTimeSlots] = useState([]);
	const { email, event } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchService = async (consultantEmail, event_id) => {
			setLoading(true);
			const fetchServiceConfig = {
				method: "get",
				url: "/service/" + event_id,
				withCredentials: true,
				credentials: "include",
			};

			try {
				const resService = await axios(fetchServiceConfig);
				if ((resService.status / 100).toFixed() !== "2") throw resService;
				setServiceState(resService.data.data);
				setLoading(false);
				return resService.data;
			} catch (error) {
				navigate("/404", { replace: true });
				setLoading(false);
				throw error?.response?.data?.msg || error.message;
			}
		};
		fetchService(email, event);
	}, [navigate, email, event]);

	useEffect(() => {
		if (!loading && selectedDate !== "") {
			const availibilty = serviceState.AVAILABILITY;
			let fromTime = new Date().setHours(9, 0, 0),
				endTime = new Date().setHours(20, 0, 0);
			if (availibilty?.fromTime)
				fromTime = new Date().setHours(
					availibilty.fromTime.split(":")[0],
					availibilty.fromTime.split(":")[1],
					0
				);
			if (availibilty?.toTime)
				endTime = new Date().setHours(
					availibilty.toTime.split(":")[0],
					availibilty.toTime.split(":")[1],
					0
				);
			const duration =
				Number(serviceState.SERVICE_DURATION.split(":")[0]) * 60 +
				Number(serviceState.SERVICE_DURATION.split(":")[1]);
			setTimeSlots(generateTimeSlots(fromTime, endTime, duration || 30));
		}
	}, [selectedDate, serviceState, loading]);

	// Function to select Time
	const handleSelectTime = (e) => {
		const timeValue = e.target.innerText;
		const selectedTime = format(
			new Date().setHours(
				Number(timeValue.split(":")[0]),
				Number(timeValue.split(":")[1]),
				0
			),
			"hh:mm:ss"
		);
		setSelectedFromTime(selectedTime);
		setSelectedToTime(addTime(selectedTime, serviceState.SERVICE_DURATION));
	};

	// Handle Appointment creation Request
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (
				!event ||
				!format(selectedDate, "dd/MM/yy") ||
				!selectedFromTime ||
				!selectedToTime ||
				!format(selectedDate, "EEEE") ||
				!clientEmail ||
				!clientName
			)
				throw new Error("Improper required Data...");
			const appointment_details = {
				service_id: event,
				consultant_email: email,
				from_date: format(selectedDate, "dd/MM/yy"),
				to_date: format(selectedDate, "dd/MM/yy"),
				from_time: selectedFromTime,
				to_time: selectedToTime,
				from_weekday: format(selectedDate, "EEEE"),
				to_weekday: format(selectedDate, "EEEE"),
				client_name: clientName,
				client_email: clientEmail,
				guest_emails: guestEmails !== "" ? [...guestEmails.split(",")] : [],
			};
			const axiosAppointmentConfig = {
				method: "post",
				url: "/appointment",
				data: appointment_details,
				withCredentials: true,
				credentials: "include",
			};
			const response = await axios(axiosAppointmentConfig);
			if ((response.status / 100).toFixed() !== "2") throw response;
			navigate(`/${email}/${event}/confirmation?id=` + response.data.data);
		} catch (error) {
			setLoading(false);
			throw error?.response?.data?.msg || error.message;
		}
	};

	return (
		<main className="flex justify-center items-center bg-open">
			{loading ? (
				<Spinner />
			) : (
				<section
					className="section booking"
					style={{ maxWidth: "max-content", height: "70vh" }}
				>
					<div
						className="top h-full "
						style={{
							minWidth: "300px",
							maxWidth: "300px",
							minHeight: "100%",
							border: "none",
							borderTopRightRadius: "0",
							borderBottomLeftRadius: "10px",
						}}
					>
						<ArrowLeftCircleIcon
							onClick={() => navigate(-1, { replace: true })}
							className="back-icon"
						/>{" "}
						<h1>{serviceState.NAME}</h1>
						<h3>{serviceState.SERVICE_NAME}</h3>
						<div className="mt-1">
							<Clock size={20} className="icons" />
							<p>{serviceState.SERVICE_DURATION}</p>
						</div>
						<div>
							<VideoIcon size={20} className="icons" />
							<p>min Web conferencing details provided upon confirmation.</p>
						</div>
					</div>
					<div className="bottom">
						<div className="content">
							<h1>
								{selectedDate !== "" &&
								selectedFromTime !== "" &&
								selectedToTime !== ""
									? "Schedule Appointment"
									: "Select a Date & Time"}
							</h1>
							{selectedDate !== "" && (
								<p>
									Date : {format(selectedDate, "dd/MM/yy")}, &nbsp;&nbsp;Day :{" "}
									{format(selectedDate, "EEEE")}, &nbsp;&nbsp;Time :{" "}
									{selectedFromTime}
								</p>
							)}
						</div>
						{selectedDate !== "" &&
						selectedFromTime !== "" &&
						selectedToTime !== "" ? (
							<form className="booking mt-1" onSubmit={handleSubmit}>
								<div className="form-element">
									<label htmlFor={"client_name"}>Enter Your Name</label>
									<input
										value={clientName}
										onChange={(e) => setClientName(e.target.value)}
										name="client_name"
										type="text"
									/>
								</div>
								<div className="form-element">
									<label htmlFor={"client_email"}>Enter Your Email</label>
									<input
										value={clientEmail}
										onChange={(e) => setClientEmail(e.target.value)}
										name="client_email"
										type="email"
									/>
								</div>
								{enableGuest ? (
									<div className="form-element">
										<label htmlFor={"guest_emails"}>
											Enter Guest Email :(Note : Comma `,` separated)
										</label>
										<br />
										<textarea
											value={guestEmails}
											onChange={(e) => setGuestEmail(e.target.value)}
											name="guest_emails"
											type="text"
										/>
										<p className="note">
											Notify up to 5 additional guests of the scheduled event.
											(Must be comma Seperated emails)
										</p>
									</div>
								) : (
									<p
										className="btn my-0.5"
										onClick={() => setEnableGuest(!enableGuest)}
									>
										Add Guest
									</p>
								)}
								<button type="submit" className="btn fill-blue pm">
									Schedule Appointment
								</button>
							</form>
						) : (
							<div className="booking mt-1 flex gap-1 justify-center">
								<Calendar
									className={"border-none"}
									minDate={
										new Date(serviceState.AVAILABILITY?.fromDate) >= new Date()
											? new Date(serviceState.AVAILABILITY?.fromDate)
											: null
									}
									maxDate={
										new Date(serviceState.AVAILABILITY?.toDate) >= new Date()
											? new Date(serviceState.AVAILABILITY?.toDate)
											: null
									}
									onChange={setSalectedDate}
									value={selectedDate}
								/>
								{timeSlots.length > 0 && (
									<div className="time-slots flex flex-col gap-1 h-full items-center">
										{timeSlots.map((slot) => (
											<button
												onClick={handleSelectTime}
												className="slots btn fill-blue pm"
												key={slot}
											>
												{slot}
											</button>
										))}
									</div>
								)}
							</div>
						)}
					</div>
				</section>
			)}
		</main>
	);
};

export default ServiceBooking;
