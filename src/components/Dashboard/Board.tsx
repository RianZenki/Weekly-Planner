import { useContext } from "react";

import { WeekdayList } from "./Weekday/WeekdayList";
import { TasksList } from "./Task/TasksList";
import { TaskContext } from "../../store/task-context";

import classes from "./Board.module.css";

export const Board = () => {
	const taskCtx = useContext(TaskContext);
	const weekDayIndex = taskCtx.tasks.findIndex(
		(item) => item.weekday === taskCtx.weekdaySelected
	);
	const weekDayListTasks = taskCtx.tasks[weekDayIndex].taskList;

	weekDayListTasks.sort(function (a, b) {
		if (a.time < b.time) {
			return -1;
		}
		if (a.time > b.time) {
			return 1;
		}
		return 0;
	});

	return (
		<main className={classes["board-container"]}>
			<div className={classes["weekday-wrapper"]}>
				<WeekdayList />
			</div>
			<div className={classes.board}>
				<TasksList list={weekDayListTasks} />
			</div>
		</main>
	);
};
