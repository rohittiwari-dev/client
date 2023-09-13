import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import ConsultantLayout from "./Layouts/ConsultantLayout";
import HomeLayout from "./Layouts/HomeLayout";
import ConsultantHome from "./pages/consultant/Home";
import ConsultantService from "./pages/consultant/Service";
import HomePage from "./pages/home/Home";
import Login from "./pages/home/Login";
import SignUp from "./pages/home/Signup";
import SignUpNext from "./pages/home/SignupNext";
import NotFound from "./pages/NotFound";
import Footer from "./components/HeaderFooter/Footer";
import Header from "./components/HeaderFooter/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "./store/reduxActions";
import { STATES } from "./utils/enums";
import Spinner from "./components/Spinner";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Appointments from "./pages/consultant/Appointments";
import ListConsultant from "./pages/ListConsultant";
import LogedinWrapper from "./Layouts/LogedinWrapper";
import usePreventNumberInputScroll from "./hooks/useNumberInputPreventScroll";
import ConsultantProfile from "./pages/booking/ConsultantProfile";
import ServiceBooking from "./pages/booking/ServiceBooking";
import Confirmation from "./pages/booking/Confirmation";

// Axios Base url Declaration
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const App = () => {
	usePreventNumberInputScroll();
	const dispatch = useDispatch();
	const userStore = useSelector((state) => state.User);

	useEffect(() => {
		dispatch(fetchUserInfo());
	}, [dispatch]);

	return (
		<main className="main">
			{userStore.state === STATES.LOADING ? (
				<Spinner />
			) : (
				<Routes>
					<Route path="/">
						<Route
							index
							element={
								<>
									<Header userStore={userStore} />
									<HomePage />
									<Footer />
								</>
							}
						/>
						<Route
							path="/contactus"
							element={
								<>
									<Header userStore={userStore} />
									<Contact />
									<Footer />
								</>
							}
						/>
						<Route
							path="/profile"
							element={
								<LogedinWrapper>
									<Header userStore={userStore} />
									<Profile />
									<Footer />
								</LogedinWrapper>
							}
						/>
						<Route
							path="/listconsultants"
							element={
								<>
									<Header userStore={userStore} />
									<ListConsultant />
									<Footer />
								</>
							}
						/>
						<Route path="/" element={<HomeLayout />}>
							<Route path="login" element={<Login />} />
							<Route path="signup">
								<Route index element={<SignUp />} />
								<Route path=":email" element={<SignUpNext />} />
								<Route path="*" element={<Navigate to={"/404"} replace />} />
							</Route>
						</Route>
						<Route path={"/consultant"} element={<ConsultantLayout />}>
							<Route index element={<ConsultantHome />} end />
							<Route path="service" element={<ConsultantService />} />
							<Route path="appointments" element={<Appointments />} />
							<Route path="*" element={<Navigate to={"/404"} replace />} />
						</Route>
						<Route path=":email" element={<ConsultantProfile />} />
						<Route path=":email/:event" element={<ServiceBooking />} />
						<Route
							path=":email/:event/confirmation"
							element={<Confirmation />}
						/>
						<Route path="/404" element={<NotFound />} />
						<Route path="*" element={<Navigate to={"/404"} replace />} />
					</Route>
				</Routes>
			)}
		</main>
	);
};

export default App;
