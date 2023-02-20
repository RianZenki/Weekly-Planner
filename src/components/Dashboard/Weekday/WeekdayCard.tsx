import { useContext } from "react";

import { TaskContext } from "../../../store/task-context";

import classes from "./WeekdayCard.module.css";

type WeekdayCardProps = {
	day: string;
	className?: string;
};

export const WeekdayCard = (props: WeekdayCardProps) => {
	const taskCtx = useContext(TaskContext);

	const weekdayLowerCase = props.day.toLocaleLowerCase();

	return (
		<li
			className={`${classes["weekday-card"]} ${classes[weekdayLowerCase]} ${
				props.className ? classes[props.className] : ""
			} `}
			key={weekdayLowerCase}
			onClick={() => taskCtx.onWeekdayChange(props.day)}
		>
			{props.day}
		</li>
	);
};
