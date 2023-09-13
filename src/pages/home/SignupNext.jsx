import { NavLink, useParams } from "react-router-dom";
import logo from "../../assets/logo.gif";

const SignupNext = () => {
	const { email } = useParams();
	return (
		<main className="flex items-center justify-center flex-col">
			<div className="brand">
				<img src={logo} width={30} height={30} alt="Brand Logo" />
				<h1 className="bran">Scheduler</h1>
			</div>
			<p className="greetings data">Hi {email}!</p>
			<div className="card fix">
				<p className="note">
					The easiest way for you to sign up is with Google. This will
					automatically connect your calendar so you can start using CalendarApp
					right away!
				</p>
				<div
					onClick={() => {
						window.open(
							`${import.meta.env.VITE_BASE_URL}/auth/google/callback`,
							"_self"
						);
					}}
					className="btn fill-blue items-self-end pm mt-1"
				>
					Get Started
				</div>
				<p
					style={{ marginTop: "1rem", fontSize: "0.8rem" }}
					className="items-self-start"
				>
					Prefer to create an account with a password? <br />
					<NavLink to={"/login"}>Click here</NavLink>
				</p>
			</div>
		</main>
	);
};

export default SignupNext;
