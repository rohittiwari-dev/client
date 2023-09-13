function generateTimeSlots(startTime, endTime, intervalMinutes) {
	const timeSlots = [];
	let currentTime = new Date(startTime);

	while (currentTime <= endTime) {
		const formattedTime = currentTime.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
		timeSlots.push(formattedTime);
		currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
	}

	return timeSlots;
}

export default generateTimeSlots;
