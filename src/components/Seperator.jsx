import PropTypes from "prop-types";
import "./Components.css";

const Seperator = ({ text, className }) => {
	return (
		<div className={`${className} seperator`}>
			{text && <div className={`seperator-text`}>{text}</div>}
		</div>
	);
};

Seperator.propTypes = {
	text: PropTypes.string,
	className: PropTypes.string,
};

export default Seperator;
