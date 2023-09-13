import ServiceCard from "../../components/ServiceCard";
import "./Booking.css";
import { convertTimeStringToTimeHMS } from "../../utils/Convert";
import axios from "axios";
import { useEffect, useState } from "react";
import { VerifiedIcon } from "lucide-react";
import Spinner from "../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import Header from "../../components/HeaderFooter/Header";
import { useSelector } from "react-redux";
import { STATES } from "../../utils/enums";

const ConsultantProfile = () => {
	const userStore = useSelector((state) => state.User);
	const [serviceState, setServiceState] = useState({});
	const [consultantData, setConsultantData] = useState({});
	const [loading, setLoading] = useState(true);
	const { email } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		const fetchService = async (consultantEmail) => {
			setLoading(true);
			const fetchServiceConfig = {
				method: "get",
				url: "/service/list/" + consultantEmail,
				withCredentials: true,
				credentials: "include",
			};
			const fetchUserConfig = {
				method: "get",
				url: "/user/email/" + consultantEmail,
				withCredentials: true,
				credentials: "include",
			};
			try {
				const resService = await axios(fetchServiceConfig);
				if ((resService.status / 100).toFixed() !== "2") throw resService;
				const resUser = await axios(fetchUserConfig);
				if ((resUser.status / 100).toFixed() !== "2") throw resUser;
				setServiceState(resService.data.data);
				setConsultantData(resUser.data.data);
				setLoading(false);
				return resService.data;
			} catch (error) {
				navigate("/404", { state: { location: "" }, replace: true });
				setLoading(false);
				throw error?.response?.data?.msg || error.message;
			}
		};
		fetchService(email);
	}, [navigate, email]);

	return (
		<div className="container">
			{userStore.state !== STATES.LOADING &&
				userStore.state === STATES.SUCCESS && <Header userStore={userStore} />}
			<div className="container h-full bg-open flex justify-center items-center">
				{loading ? (
					<Spinner />
				) : (
					<section className="section flex-col booking">
						<div className="top">
							<p>Personal Details</p>
							<div className="flex gap-1">
								<img
									className="consultant-img "
									src={consultantData.PICTURE}
									alt="Profile Image"
								/>
								<div className="content">
									<div>
										<h2>{consultantData.NAME}</h2>
										{consultantData.EMAIL_VERIFIED === 1 && (
											<p className="verified">
												Vrified Consultant <VerifiedIcon size={15} />
											</p>
										)}
										<p>
											{consultantData.PROFESSION}
											{consultantData.PROFESSION && "-"}
											{consultantData.CURRENT_DESIGNATION}
										</p>
										<p>
											{consultantData.PROFESSIONAL_EXPERIENCE > 0 &&
												consultantData.PROFESSIONAL_EXPERIENCE}
										</p>
										<p>Joined : {format(new Date(consultantData.TIMESTAMP))}</p>
									</div>
									<p className="description">
										Welcome to my scheduling page. Please follow the
										instructions to add an event to my calendar.
									</p>
								</div>
							</div>
						</div>
						<div className="bottom flex flex-wrap items-center justify-around gap-1">
							{serviceState?.services.map((service) => (
								<ServiceCard
									key={service.ID}
									className="items-self-start"
									bookingLink={`/${service.HOST_EMAIL}/${service.ID}`}
									serviceName={service.SERVICE_NAME}
									hostemail={service.HOST_EMAIL}
									serviceDuration={convertTimeStringToTimeHMS(
										service.SERVICE_DURATION || "00:00:00"
									)}
									serviceType={service.SERVICE_TYPE}
									serviceId={service.ID}
									publicView={true}
									handleDelete={() => {}}
									serviceLocation={service.SERVICE_LOCATION}
								/>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
};

export default ConsultantProfile;
