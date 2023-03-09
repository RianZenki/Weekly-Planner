import { useContext } from "react";

import { WeekdayCard } from "./WeekdayCard";
import { WEEKDAYS } from "../../../pages/Dashboard";
import { TaskContext } from "../../../store/task-context";

import classes from "./WeekdayList.module.css";

export const WeekdayList = () => {
	const taskCtx = useContext(TaskContext);

	return (
		<ul className={classes["weekday-list"]}>
			{WEEKDAYS.map((weekday) => {
				return (
					<li key={weekday}>
						<WeekdayCard
							day={weekday}
							className={
								weekday === taskCtx.weekdaySelected ? "active" : ""
							}
						/>
					</li>
				);
			})}
		</ul>
	);
};
