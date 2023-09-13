import { useState } from "react";
import Modal from "../components/Modal";

const Profile = () => {
	const [showModal, setShowModal] = useState(false);
	const handleTogleModal = () => setShowModal(!showModal);
	return (
		<div>
			<button onClick={handleTogleModal}>open Modal</button>
			<Modal
				blur
				titlte="Become a Consultant"
				setShowModal={handleTogleModal}
				showModal={showModal}
			>
				Hello Bullish
				<div>dsfsd</div>
				<div>sdfsdf</div>
			</Modal>
		</div>
	);
};

export default Profile;
