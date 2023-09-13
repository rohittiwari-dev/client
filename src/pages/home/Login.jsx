import "./LoginSignup.css";
import logo from "../../assets/logo.gif";
import Seperator from "../../components/Seperator";
import { NavLink } from "react-router-dom";

const Login = () => {
	return (
		<main className="flex items-center justify-center flex-col">
			<div className="brand">
				<img src={logo} width={30} height={30} alt="Brand Logo" />
				<h1 className="bran">Scheduler</h1>
			</div>
			<p className="greetings">Welcome Back</p>
			<div className="card fix">
				<button
					onClick={() =>
						window.open(
							import.meta.env.VITE_BASE_URL + "/auth/google/callback",
							"_self",
							"replace=true"
						)
					}
					className="btn fill-blue pm"
				>
					Login with Google
				</button>
				<Seperator text="or" />
				<label className="items-self-start label-login">
					Enter your Email Address to get Started
				</label>
				<input
					className="items-self-start"
					type="email"
					name="email"
					placeholder="Enter Email"
					id="email"
				/>
				<input
					className="items-self-start"
					type="password"
					placeholder="Enter Password"
					name="password"
					id="password"
				/>
				<button className="btn fill-blue items-self-end pm mt-1">
					Continue
				</button>
			</div>
			<p>
				Don&apos;t have an account? <NavLink to={"/signup"}>Sign up</NavLink>
			</p>
		</main>
	);
};

export default Login;
