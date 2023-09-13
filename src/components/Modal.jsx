import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import "./Components.css";
import { AppWindow, XCircle } from "lucide-react";

// Main Modal Wrapper
const Modal = ({
	children,
	blur = false,
	titlte = "Modal Window",
	showModal,
	header = true,
	setShowModal,
}) => {
	const ModalWrapper = () => (
		<div className="modal">
			{blur && <div className="modal-wrapper" onClick={setShowModal} />}
			<div className="modal-body">
				{header && (
					<div className="modal-header">
						<div className="brand text-primary">
							<AppWindow />
							<h2>{titlte}</h2>
						</div>
						<button className="btn danger" onClick={setShowModal}>
							<XCircle />
						</button>
					</div>
				)}
				<div className="body-content">{children}</div>
			</div>
		</div>
	);
	return createPortal(
		showModal ? <ModalWrapper /> : "",
		document.getElementById("root_portal_main")
	);
};

// Props Validation
Modal.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
		PropTypes.array,
	]),
	header: PropTypes.bool,
	setShowModal: PropTypes.func,
	blur: PropTypes.bool,
	titlte: PropTypes.string,
	showModal: PropTypes.bool,
};

export default Modal;
