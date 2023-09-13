import { useEffect } from "react";
import ServiceCard from "../../components/ServiceCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserService } from "../../store/reduxActions";
import { STATES } from "../../utils/enums";
import Spinner from "../../components/Spinner";
import { convertTimeStringToTimeHMS } from "../../utils/Convert";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateAppointment = () => {
	const serviceStore = useSelector((state) => state.Service);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchUserService());
	}, [dispatch]);

	const handleDelete = async (e) => {
		const service_id = e.currentTarget.id;
		const aisoDeleteConfig = {
			method: "delete",
			url: "/service/" + service_id,
			withCredentials: true,
			credentials: "include",
		};
		try {
			const res = await axios(aisoDeleteConfig);
			if ((res.status / 100).toFixed() !== "2") throw res;
			dispatch(fetchUserService());
			return res.data;
		} catch (error) {
			throw error?.response?.data?.msg || error.message;
		}
	};

	return (
		<div className="container flex items-center justify-center">
			{serviceStore.state === STATES.LOADING ? (
				<Spinner />
			) : (
				<>
					<section className="section flex-wrap items-self-start gap-1 justify-start px-32 ">
						{serviceStore.services.map((service) => (
							<ServiceCard
								key={service.ID}
								className="items-self-start"
								bookingLink={`/${service.HOST_EMAIL}/${service.ID}`}
								serviceName={service.SERVICE_NAME}
								hostemail={service.HOST_EMAIL}
								serviceDuration={convertTimeStringToTimeHMS(
									service.SERVICE_DURATION || "00:00:00"
								)}
								serviceId={service.ID}
								serviceType={service.SERVICE_TYPE}
								handleDelete={(e) => {
									toast.promise(
										handleDelete(e),
										{
											loading: "Please Wait While we delete your Service !",
											success: "Service Succcess fully Delete !",
											error: (error) =>
												"Something Went Wrong! " + error ||
												"Please try after Sometime...",
										},
										{ position: "bottom-left" }
									);
								}}
								serviceLocation={service.SERVICE_LOCATION}
							/>
						))}
					</section>
				</>
			)}
		</div>
	);
};

export default CreateAppointment;
