import { useContext } from 'react'

import { TaskContext } from '../../../store/task-context'

import classes from "./TaskCard.module.css";

type taskCardProps = {
	description: string;
	className: string;
};

export const TaskCard = (props: taskCardProps) => {
   const taskCtx = useContext(TaskContext)
   const selectedWeekday = taskCtx.weekdaySelected.toLocaleLowerCase();

	return (
		<div className={`${classes.task} ${classes[selectedWeekday]} ${classes[props.className]}`}>
			<p>{props.description}</p>
			<button>Delete</button>
		</div>
	);
};
