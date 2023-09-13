import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { STATES } from "../utils/enums";

const HomeLayout = () => {
	const userStore = useSelector((state) => state.User);
	const navigate = useNavigate();
	useEffect(() => {
		if (
			userStore.state === STATES.SUCCESS &&
			location.pathname !== "/profile" &&
			userStore.state !== STATES.LOADING
		)
			navigate("/", { replace: true });
	}, [navigate, userStore]);
	return <Outlet />;
};

export default HomeLayout;
