import { BoardRow } from "./BoardRow";
import { TaskType } from "../../../types/task";

import classes from "./TasksList.module.css";

type tasksListProps = {
	list: {
		[key: string]: TaskType[];
	};
};

export const TasksList = ({ list }: tasksListProps) => {
	const boardRows = [];

	for (const key in list) {
		boardRows.push(<BoardRow key={key} data={list[key]} />);
	}

	boardRows.sort((a, b) => {
		const timeA = a.key;
		const timeB = b.key;
		if (timeA! < timeB!) {
			return -1;
		}
		if (timeA! > timeB!) {
			return 1;
		}

		return 0;
	});

	return (
		<>
			<div className={classes["board-row"]}>
				<div className={`${classes["time"]} ${classes.header}`}>
					<p>Time</p>
				</div>
				<ul className={classes["tasks-row"]}></ul>
			</div>

			{boardRows.length > 0 && boardRows}
		</>
	);
};
