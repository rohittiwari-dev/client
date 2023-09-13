import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Saperator from "./Seperator";
import { Check, Copy, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import "./Components.css";

const ServiceCard = ({
	className = "",
	bookingLink = "",
	serviceName = "",
	serviceDuration = "",
	serviceLocation = "",
	hostemail = "",
	handleDelete,
	serviceId = "",
	serviceType = "",
	publicView = false,
}) => {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		let timer;
		if (copied) {
			navigator.clipboard.writeText(
				location.origin + "/" + hostemail + "/" + serviceName
			);
			timer = setTimeout(() => setCopied(false), 2000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [copied, serviceName, hostemail]);

	return (
		<div
			id="event-card"
			className={`${className} event-card justify-between fix flex py-0.5 items-center flex-col`}
		>
			<div className="card-top relative my-0.5 w-full px-0.5">
				{!publicView && (
					<button
						id={serviceId}
						onClick={handleDelete}
						className="btn px-0.5 absolute right-0 top-0 items-self-end danger"
					>
						<Trash2 size={20} />
					</button>
				)}

				{serviceType}
				<h4>{serviceName}</h4>
				<p className="sub-head">
					{serviceDuration}, {serviceLocation}
				</p>
				<NavLink to={bookingLink} className={"link"}>
					View Booking Page
				</NavLink>
			</div>
			<Saperator className={"w-full my-0.5"} />
			<button
				disabled={copied}
				onClick={() => setCopied(true)}
				className="link btn flex items-center"
			>
				{copied ? (
					<>
						<Check size={16} style={{ marginRight: "0.3rem" }} /> copied
					</>
				) : (
					<>
						<Copy size={16} style={{ marginRight: "0.3rem" }} />
						Copy Link
					</>
				)}
			</button>
		</div>
	);
};

ServiceCard.propTypes = {
	className: PropTypes.string,
	bookingLink: PropTypes.string,
	serviceName: PropTypes.string,
	serviceDuration: PropTypes.string,
	hostemail: PropTypes.string,
	serviceLocation: PropTypes.string,
	handleDelete: PropTypes.func,
	serviceId: PropTypes.number,
	serviceType: PropTypes.string,
	publicView: PropTypes.bool,
};

export default ServiceCard;
