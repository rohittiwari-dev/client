import { NavLink } from "react-router-dom";
import heroImage from "../../assets/heroImage.png";
import "./Home.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { STATES } from "../../utils/enums";

const Home = () => {
	const [email, setEmail] = useState("");
	const userStore = useSelector((state) => state.User);
	return (
		<section className="hero-section">
			<div className="left">
				<h1 className="hero-title">
					Scheduling App <br />
					<span style={{ color: "cornflowerblue" }}>React & NodeJS</span>
				</h1>
				<p className="hero-description">
					CalendarApp is your hub for scheduling mettings professionally and
					efficiently, eliminating the hassle of back-and-forth emails so you
					can get back to work
				</p>
				{userStore.state === STATES.SUCCESS ? (
					userStore.data.TYPE !== "CONSULTANT" ? (
						<button className="btn fill-blue">BECOME A CONSULTANT</button>
					) : (
						<></>
					)
				) : (
					<>
						<div className="input-email">
							<input
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<NavLink to={`/signup/${email}`} className="btn fill-blue">
								Sign Up
							</NavLink>
						</div>
						<p className="note">
							Create your free account. No credit card required.
						</p>
					</>
				)}
			</div>
			<div className="right">
				<img
					src={heroImage}
					alt="Hero Section Image"
					width={500}
					height={400}
				/>
			</div>
		</section>
	);
};

export default Home;
