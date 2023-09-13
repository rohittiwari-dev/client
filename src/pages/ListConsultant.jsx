import axios from "axios";
import { format } from "timeago.js";
import { Search, VerifiedIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { NavLink, useNavigate } from "react-router-dom";
import "./ListConsultant.css";

const ListConsultant = () => {
	const [consultantList, setConsultantList] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchConsultant = async () => {
			try {
				const axiosConfig = {
					method: "get",
					url: "/user/list",
					withCredentials: true,
				};
				const response = await axios(axiosConfig);
				if ((response.status / 100).toFixed() !== "2") throw response;

				setConsultantList(response.data.data.users);
				setLoading(false);
				return response.data;
			} catch (error) {
				setLoading(false);
				navigate("/", { state: { location: "" }, replace: true });
			}
		};
		fetchConsultant();
	}, [navigate]);

	return (
		<div className="container flex flex-col items-center ">
			<div className="search flex gap-1 w-full px-32">
				<div className="formgroup w-full items-center flex gap-1 ">
					<label
						className=""
						htmlFor="search"
						style={{ fontSize: "1.2rem", whiteSpace: "nowrap" }}
					>
						Enter Email :
					</label>
					<input type="text" id="search" />
				</div>
				<button className="btn fill-blue flex gap-1 items-center pm-1">
					<Search className="p-0" />
					Search
				</button>
				<button className="btn">Prev</button>
				<button className="btn">Next</button>
			</div>
			<section className="section flex-wrap items-self-start gap-1 justify-start px-32 list-consultant">
				{loading ? (
					<Spinner />
				) : (
					consultantList.map((user) => (
						<NavLink to={"/" + user.EMAIL} key={user.NAME} className="top">
							<p>Personal Details</p>
							<div className="flex gap-1">
								<img
									className="consultant-img "
									src={user.PICTURE}
									alt="Profile Image"
								/>
								<div className="content">
									<div>
										<h2>{user.NAME}</h2>
										{user.EMAIL_VERIFIED === 1 && (
											<p className="verified">
												Vrified Consultant <VerifiedIcon size={15} />
											</p>
										)}
										<p>
											{user.PROFESSION}
											{user.PROFESSION && "-"}
											{user.CURRENT_DESIGNATION}
										</p>
										<p>
											{user.PROFESSIONAL_EXPERIENCE > 0 &&
												user.PROFESSIONAL_EXPERIENCE}
										</p>
										<p>Joined : {format(new Date(user.TIMESTAMP))}</p>
									</div>
								</div>
							</div>
						</NavLink>
					))
				)}
			</section>
		</div>
	);
};

export default ListConsultant;
