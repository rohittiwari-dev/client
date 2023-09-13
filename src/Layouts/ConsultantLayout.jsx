import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/HeaderFooter/Header";
import Footer from "../components/HeaderFooter/Footer";
import { useEffect } from "react";
import "./ConsultantLayout.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { STATES } from "../utils/enums";

const ConsultantLayout = () => {
	const navigate = useNavigate();
	const userStore = useSelector((state) => state.User);

	useEffect(() => {
		if (!localStorage.getItem("notFirstLogin")) {
			toast.success("Successfully Loged in..");
			localStorage.setItem("notFirstLogin", true);
		}
		if (
			(userStore.state !== STATES.LOADING &&
				userStore.state !== STATES.SUCCESS) ||
			(userStore.state === STATES.SUCCESS &&
				userStore.data.TYPE !== "CONSULTANT")
		)
			navigate("/");
	}, [navigate, userStore]);

	return (
		<>
			<Header userStore={userStore} />
			<div className="items-center flex create-bar ">
				<NavLink end to={"/consultant"} className="btn justify-self-end">
					Services
				</NavLink>
				<NavLink
					end
					to={"/consultant/service"}
					className="btn justify-self-end"
				>
					Create Service
				</NavLink>
				<NavLink
					end
					to={"/consultant/appointments"}
					className="btn justify-self-end"
				>
					Appointments
				</NavLink>
				<NavLink
					end
					to={"/" + userStore.data.EMAIL}
					className="btn justify-self-end"
				>
					Public Profile
				</NavLink>
			</div>
			<Outlet />
			<Footer />
		</>
	);
};

export default ConsultantLayout;
