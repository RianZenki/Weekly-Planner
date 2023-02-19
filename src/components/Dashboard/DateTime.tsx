import { useState, useEffect } from "react";

import classes from "./DateTime.module.css";

export const DateTime = () => {
	const [date, setDate] = useState(new Date());

	const currentDay = date.getDate();
	const currentMonth = date.toLocaleString("en", { month: "long" });
	const currentYear = date.getFullYear();

	const getDayWithSuffix = (day: number) => {
		const j = day % 10,
				k = day % 100;
		if (j === 1 && k !== 11) {
				return day + "st";
		}
		if (j === 2 && k !== 12) {
				return day + "nd";
		}
		if (j === 3 && k !== 13) {
				return day + "rd";
		}
		return day + "th";
	};

	const currentDayWithSuffix = getDayWithSuffix(currentDay)

	const currentDate = `${currentMonth} ${currentDayWithSuffix}, ${currentYear}`;

	useEffect(() => {
		const interval = setInterval(() => setDate(new Date()), 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className={classes.container}>
			<p className={classes.time}>
				{date.toLocaleTimeString().slice(0, 5)}{" "}
			</p>
			<p className={classes.date}>{currentDate}</p>
		</div>
	);
};
