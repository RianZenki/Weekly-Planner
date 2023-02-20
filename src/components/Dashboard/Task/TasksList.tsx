import { BoardRow } from "./BoardRow";

import classes from "./TasksList.module.css";

type tasksListProps = {
	list: {
		time: string;
		tasks: {
			id: string;
			description: string;
		}[];
	}[];
};

export const TasksList = ({ list }: tasksListProps) => {
	return (
		<>
			<div className={classes["board-row"]}>
				<div className={`${classes["time"]} ${classes.header}`}>
					<p>Time</p>
				</div>
				<ul className={classes["tasks-row"]}></ul>
			</div>

			{list.map((row) => (
				<BoardRow data={row} />
			))}
		</>
	);
};
