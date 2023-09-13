const Spinner = () => {
	return (
		<div>
			<svg className="spinner" viewBox="0 0 50 50">
				<circle
					className="path"
					cx="25"
					cy="25"
					r="15"
					fill="none"
					strokeWidth="3"
				></circle>
			</svg>
		</div>
	);
};

export default Spinner;
