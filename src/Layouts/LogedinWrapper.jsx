import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { STATES } from "../utils/enums";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogedinWrapper = ({ children }) => {
	const userStore = useSelector((state) => state.User);
	const navigate = useNavigate();
	useEffect(() => {
		if (
			userStore.state !== STATES.SUCCESS &&
			userStore.state !== STATES.LOADING
		)
			navigate("/login", { replace: true });
	}, [navigate, userStore]);

	return children;
};

LogedinWrapper.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
		PropTypes.array,
	]),
};

export default LogedinWrapper;
