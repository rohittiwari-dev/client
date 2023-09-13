import { useEffect } from "react";

function usePreventNumberInputScroll() {
	const preventScroll = (e) => {
		if (e.target.type === "number") {
			e.preventDefault();
		}
	};

	useEffect(() => {
		document.addEventListener("wheel", preventScroll, { passive: false });
		return () => {
			document.removeEventListener("wheel", preventScroll);
		};
	}, []);
}

export default usePreventNumberInputScroll;
