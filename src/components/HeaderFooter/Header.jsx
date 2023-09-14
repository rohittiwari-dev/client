import { NavLink, matchPath } from "react-router-dom";
import logo from "../../assets/logo.gif";
import profileDefaultImage from "../../assets/profileDefault.jpg";
import "./Header.css";
import PropTypes from "prop-types";
import { STATES } from "../../utils/enums";
import { resetUserData } from "../../store/reduxActions";

const Links = [
	{ name: "HOME", path: "/" },
	{ name: "CONSULTANTS", path: "/listconsultants" },
	{ name: "DASHBOARD", path: "/consultant" },
	{ name: "CONTACT US", path: "/contactus" },
];

const Header = ({ userStore }) => {
	return (
		<header className="header">
			<div className="brand">
				<img src={logo} width={30} height={30} alt="Brand Logo" />
				<h1 className="bran">Scheduler</h1>
			</div>
			<ul className="links">
				{Links.map((link) => {
					if (link.name === "DASHBOARD" && userStore.data.TYPE !== "CONSULTANT")
						return null;
					else if (
						matchPath("/consultant/*", location.pathname) &&
						(link.path === "/consultant" || link.path === "/listconsultants")
					)
						return null;
					else
						return (
							<NavLink end to={link.path} className="list-item" key={link.name}>
								{link.name.toString()}
							</NavLink>
						);
				})}
			</ul>
			<div className="actions">
				{userStore.state !== STATES.SUCCESS ? (
					<>
						<NavLink to={"/login"} className="btn">
							login
						</NavLink>
						<NavLink to={"/signup"} className="btn fill-blue">
							Get Started
						</NavLink>
					</>
				) : (
					<>
						<NavLink
							to={"/profile"}
							className="avatar flex items-center justify-center "
						>
							<img
								style={{
									marginRight: "0.5rem",
									borderRadius: "100%",
									padding: "0.1rem",
									border: "2px solid cornflowerblue",
								}}
								src={userStore.data.PICTURE}
								alt="profile picture"
								width={35}
								height={35}
								onError={(e) => {
									// e.currentTarget.onerror = null;
									e.currentTarget.src = profileDefaultImage;
								}}
							/>
							{"Hi! " + userStore.data.GIVEN_NAME}
						</NavLink>
						<NavLink
							onClick={() => {
								localStorage.removeItem("notFirstLogin");
								resetUserData();
							}}
							to={`${import.meta.env.VITE_SERVER_URL}/auth/logout`}
							className="btn fill-blue pm"
						>
							Logout
						</NavLink>
					</>
				)}
			</div>
		</header>
	);
};

Header.propTypes = {
	userStore: PropTypes.object,
};

export default Header;
