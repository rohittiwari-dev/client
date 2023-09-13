export function convertTimeStringToTimeWithMeridian(timeString) {
	const [hours, minutes, seconds] = timeString.split(":").map(Number);

	const time = new Date();
	time.setHours(hours);
	time.setMinutes(minutes);
	time.setSeconds(seconds);
	const formattedTime = time.toLocaleTimeString();
	return formattedTime;
}
export function convertTimeStringToTimeHMS(timeString) {
	const [hours, minutes, seconds] = timeString.split(":").map(Number);

	const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

	return formattedTime;
}
