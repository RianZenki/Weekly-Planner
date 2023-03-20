import { useContext } from "react";

import { UserContext } from "../../../store/user-context";

import classes from "./WeekdayCard.module.css";

type WeekdayCardProps = {
	day: string;
	className?: string;
};

export const WeekdayCard = (props: WeekdayCardProps) => {
	const taskCtx = useContext(UserContext);

	const weekdayLowerCase = props.day.toLocaleLowerCase();

	return (
		<div
			className={`${classes["weekday-card"]} ${classes[weekdayLowerCase]} ${
				props.className ? classes[props.className] : ""
			} `}
			onClick={() => taskCtx.onWeekdayChange(props.day)}
		>
			{props.day}
		</div>
	);
};
