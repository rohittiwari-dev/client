import { useState } from "react";
import "./Service.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import MaskedInput from "react-text-mask";

const Service = () => {
	const userStore = useSelector((state) => state.User.data);

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [selectedWeekdays, setSelectedWeekdays] = useState([]);
	const [dateSelectorError, setDateSelectorError] = useState("");
	const [formData, setFormData] = useState({
		service_type: "",
		service_name: "",
		service_duration: "",
		service_location: "",
		availability: "",
		price_per_hour: "",
		host_email: userStore.EMAIL || "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleWeekdayToggle = (day) => {
		if (selectedWeekdays.includes(day)) {
			setSelectedWeekdays(selectedWeekdays.filter((d) => d !== day));
		} else {
			setSelectedWeekdays([...selectedWeekdays, day]);
		}
	};

	const handleSubmit = async () => {
		try {
			const availability = {
				fromDate: startDate,
				toDate: endDate,
				fromTime: startTime,
				toTime: endTime,
				activeDays: selectedWeekdays,
			};
			const axiosConfig = {
				method: "POST",
				url: "/service",
				data: { ...formData, availability: JSON.stringify(availability) },
				withCredentials: true,
				credentials: "include",
			};
			const response = await axios(axiosConfig);
			if ((response.status / 100).toFixed() !== "2") {
				throw response;
			}
			setFormData({
				service_type: "",
				service_name: "",
				service_duration: "",
				service_location: "",
				availability: "",
				price_per_hour: "",
				host_email: userStore.EMAIL || "",
			});
			setStartDate("");
			setEndDate("");
			setStartTime("");
			setEndTime("");
			setSelectedWeekdays([]);
			return response.message;
		} catch (error) {
			throw error?.response?.data?.msg || error.message;
		}
	};
	const validateDateRange = () => {
		if (startDate && endDate) {
			const startDateObj = new Date(startDate);
			const endDateObj = new Date(endDate);

			if (endDateObj < startDateObj) {
				setDateSelectorError("End date cannot be before the start date");
				setEndDate("");
			} else {
				setDateSelectorError("");
			}
		}
		if (startTime && endTime) {
			if (endTime < startTime) {
				setDateSelectorError("End time cannot be before the start time");
				setEndTime("");
			} else {
				setDateSelectorError("");
			}
		}
	};

	return (
		<div className="container">
			{dateSelectorError && (
				<div id="error" className="error">
					{dateSelectorError}
				</div>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					toast.promise(
						handleSubmit(),
						{
							loading: "Please Wait While we create your Service !",
							success: "Service Succcess fully Created !",
							error: (error) =>
								"Something Went Wrong! " + error ||
								"Please try after Sometime...",
						},
						{ position: "top-center" }
					);
				}}
				className="section flex flex-wrap items-center justify-center gap-1 px-32"
			>
				<div className="service-form">
					<h3>Service Details</h3>
					<div className="form-group">
						<label className="label" htmlFor="service_type">
							*Service Type:
						</label>
						<input
							type="text"
							id="service_type"
							className="input-type-text"
							name="service_type"
							placeholder="example : TEACHING, FINANCE"
							value={formData.service_type}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="service_name">
							*Service Name:
						</label>
						<input
							type="text"
							id="service_name"
							className="input-type-text"
							placeholder="example : REACT FULLSTACK DEVELOPEMENT WEBINAR, INCOME TAX ITR DISCUSSION"
							name="service_name"
							value={formData.service_name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="service_duration">
							Service Duration: (Format : HHMMSS to HH.MM.SS)
						</label>
						<MaskedInput
							mask={[
								/[0-2]/,
								/[0-3]/,
								":",
								/[0-5]/,
								/[0-9]/,
								":",
								/[0-5]/,
								/[0-9]/,
							]}
							id="service_duration"
							className="input-type-text"
							placeholder="__:__:__"
							name="service_duration"
							value={formData.service_duration}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="service_location">
							Service Location: (Default: Google Meet))
						</label>
						<input
							type="text"
							id="service_location"
							name="service_location"
							placeholder="example : Taj Hotel ,India gate ,Zoom, Google Meet"
							className="input-type-text"
							value={formData.service_location}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="price_per_hour">
							Price per Hour: (&#x20B9;)
						</label>
						<input
							type="number"
							id="price_per_hour"
							className="input-type-text"
							placeholder="example : 3000 ,40000 "
							name="price_per_hour"
							value={formData.price_per_hour}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="host_email">
							*Host Email: (Disabled Default:Your Email)
						</label>
						<input
							type="email"
							id="host_email"
							className="input-type-text"
							name="host_email"
							placeholder="example : emailxyz@gmail.com "
							disabled
							value={formData.host_email}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="service-form">
					<h3>Set Availability (Note: default all time)</h3>
					<div className="form-group">
						<label className="label" htmlFor="startDate">
							From Date:
						</label>
						<input
							type="date"
							className="type-date-time"
							id="startDate"
							onBlur={validateDateRange}
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="endDate">
							To Date:
						</label>
						<input
							type="date"
							className="type-date-time"
							id="endDate"
							value={endDate}
							onBlur={validateDateRange}
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="startTime">
							From Time:
						</label>
						<input
							type="time"
							id="startTime"
							className="type-date-time"
							onBlur={validateDateRange}
							value={startTime}
							onChange={(e) => setStartTime(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="endTime">
							To Time:
						</label>
						<input
							type="time"
							id="endTime"
							value={endTime}
							onBlur={validateDateRange}
							className="type-date-time"
							onChange={(e) => setEndTime(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label">Weekdays:</label>
						<div className="weekday-checkboxes">
							<label>
								<input
									type="checkbox"
									value="Monday"
									checked={selectedWeekdays.includes("Monday")}
									onChange={() => handleWeekdayToggle("Monday")}
								/>
								Monday
							</label>
							<label>
								<input
									type="checkbox"
									value="Tuesday"
									checked={selectedWeekdays.includes("Tuesday")}
									onChange={() => handleWeekdayToggle("Tuesday")}
								/>
								Tuesday
							</label>
							<label>
								<input
									type="checkbox"
									value="Wednesday"
									checked={selectedWeekdays.includes("Wednesday")}
									onChange={() => handleWeekdayToggle("Wednesday")}
								/>
								Wednesday
							</label>
							<label>
								<input
									type="checkbox"
									value="Thursday"
									checked={selectedWeekdays.includes("Thursday")}
									onChange={() => handleWeekdayToggle("Thursday")}
								/>
								Thursday
							</label>
							<label>
								<input
									type="checkbox"
									value="Friday"
									checked={selectedWeekdays.includes("Friday")}
									onChange={() => handleWeekdayToggle("Friday")}
								/>
								Friday
							</label>
							<label>
								<input
									type="checkbox"
									value="Saturday"
									checked={selectedWeekdays.includes("Saturday")}
									onChange={() => handleWeekdayToggle("Saturday")}
								/>
								Saturday
							</label>
							<label>
								<input
									type="checkbox"
									value="Sunday"
									checked={selectedWeekdays.includes("Sunday")}
									onChange={() => handleWeekdayToggle("Sunday")}
								/>
								Sunday
							</label>
						</div>
					</div>
				</div>
				<button className="button-type-submit" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Service;
