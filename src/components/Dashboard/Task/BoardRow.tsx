import { TaskCard } from "./TaskCard";
import { TaskType } from '../../../types/task'

import classes from "./BoardRow.module.css";

type BoardRowProps = {
	data: TaskType[]
};

export const BoardRow = ({ data }: BoardRowProps) => {
	const weekday = data[0].dayOfWeek
	const time = data[0].time

	const taskList = data;

	const taskClass = taskList.length > 1 ? "conflict" : "";

	return (
		<div className={classes["board-row"]}>
			<div
				className={`${classes.time} ${classes.item} ${classes[weekday]} ${classes[taskClass]}`}
			>
				<p>{time}</p>
			</div>
			<ul className={`${classes["tasks-row"]} ${classes[taskClass]}`}>
				{taskList.map((task: TaskType) => (
					<li key={task._id}>
						<TaskCard
							className={taskClass}
							description={task.description}
							weekday={task.dayOfWeek}
							id={task._id}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
