import { useContext } from "react";

import { TaskCard } from "./TaskCard";
import { TaskContext } from "../../../store/task-context";

import classes from "./BoardRow.module.css";

type BoardRowProps = {
	data: {
		time: string;
		tasks: {
			id: string;
			description: string;
		}[];
	};
};

export const BoardRow = ({ data }: BoardRowProps) => {
	const taskCtx = useContext(TaskContext);
	const selectedWeekday = taskCtx.weekdaySelected.toLocaleLowerCase();

   const taskList = data.tasks;

	const taskClass = taskList.length > 1 ? "conflict" : "";

	return (
		<div className={classes["board-row"]}>
			<div
				className={`${classes.time} ${classes.item} ${classes[selectedWeekday]} ${classes[taskClass]}`}
			>
				<p>{data.time}</p>
			</div>
			<ul className={`${classes["tasks-row"]} ${classes[taskClass]}`}>
				{taskList.map((task) => (
					<li key={task.id}>
						<TaskCard
							className={taskClass}
							description={task.description}
							time={data.time}
							id={task.id}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
