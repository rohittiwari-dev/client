import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/DataTable";
import { useEffect } from "react";
import { fetchUserAppointment } from "../../store/reduxActions";

const Appointments = () => {
	const loginStore = useSelector((state) => state.User.data);
	const data = useSelector((state) => state.Appointment.data);
	const dispatch = useDispatch();
	useEffect(() => {
		if (loginStore.EMAIL) dispatch(fetchUserAppointment(loginStore.EMAIL));
	}, [loginStore, dispatch]);
	return (
		<div className="container flex items-center justify-center">
			<section className="section flex-wrap items-self-start gap-1 justify-start px-32 ">
				<DataTable data={data} />
			</section>
		</div>
	);
};

export default Appointments;
