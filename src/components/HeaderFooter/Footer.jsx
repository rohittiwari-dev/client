import signatureLogo from "../../assets/logo.png";

const Footer = () => {
	return (
		<footer
			className="header"
			style={{
				color: "rgb(90, 90, 90)",
				boxShadow: "0 -0.1rem 0.15rem rgba(0,0,0,0.1)",
			}}
		>
			<div className="brand">
				<img src={signatureLogo} alt=" Signature Logo" width={20} height={20} />
				<h2>
					{" "}
					<a href="http://rohitdev.netlify.app" rel="nooppner norefferer ">
						Rohit Tiwari
					</a>
				</h2>
			</div>
			<span>
				&copy; reserved for fun 😉{" "}
				<a href="http://rohitdev.netlify.app/contact">give feedback</a>
			</span>
		</footer>
	);
};

export default Footer;
