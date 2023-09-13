import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.gif";
import { useState } from "react";

const Signup = () => {
	const [email, setEmail] = useState("");
	return (
		<main className="flex items-center justify-center flex-col">
			<div className="brand">
				<img src={logo} width={30} height={30} alt="Brand Logo" />
				<h1 className="bran">Scheduler</h1>
			</div>
			<p className="greetings">Sign up with CalendarApp for free</p>
			<div className="card fix">
				<label className="items-self-start label-login">
					Enter your Email Address to get Started
				</label>
				<input
					className="items-self-start"
					type="email"
					name="email"
					value={email}
					placeholder="Enter Email and Continue"
					onChange={(e) => setEmail(e.target.value)}
					id="email"
				/>
				<NavLink
					to={"/signup/" + email}
					className="btn fill-blue items-self-end pm mt-1"
				>
					Get Started
				</NavLink>
				<p
					style={{ marginTop: "1rem", fontSize: "0.8rem" }}
					className="items-self-start"
				>
					Already have an account? <NavLink to={"/login"}>Log in</NavLink>
				</p>
			</div>
		</main>
	);
};

export default Signup;
