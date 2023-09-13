function addTime(time1, time2) {
	const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
	const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

	const totalMilliseconds1 =
		hours1 * 3600000 + minutes1 * 60000 + seconds1 * 1000;
	const totalMilliseconds2 =
		hours2 * 3600000 + minutes2 * 60000 + seconds2 * 1000;

	const totalMillisecondsResult = totalMilliseconds1 + totalMilliseconds2;

	const resultHours = Math.floor(totalMillisecondsResult / 3600000);
	const resultMinutes = Math.floor((totalMillisecondsResult % 3600000) / 60000);
	const resultSeconds = Math.floor((totalMillisecondsResult % 60000) / 1000);

	return `${
		resultHours.toString().length == 1 ? "0" + resultHours : resultHours
	}:${
		resultMinutes.toString().length == 1 ? "0" + resultMinutes : resultMinutes
	}:${
		resultSeconds.toString().length == 1 ? "0" + resultSeconds : resultSeconds
	}`;
}
export default addTime;
