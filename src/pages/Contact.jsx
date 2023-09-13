import "./Contact.css";

const Contact = () => {
	return (
		<section className="hero-section">
			<div className="card fix">
				<form id="contactForm" name="contactForm">
					<input type="text" name="name" id="name" placeholder="Name" />
					<input type="email" name="email" id="email" placeholder="Email" />
					<input
						type="text"
						name="subject"
						id="subject"
						placeholder="Subject"
					/>
					<textarea
						name="message"
						id="message"
						cols="30"
						rows="7"
						placeholder="Message"
					></textarea>
					<input
						type="submit"
						value="Send Message"
						className="btn fill-blue pm"
					/>
				</form>
			</div>
		</section>
	);
};

export default Contact;
