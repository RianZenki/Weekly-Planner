import { useContext, useEffect, useState } from "react";

import { WeekdayList } from "./Weekday/WeekdayList";
import { TasksList } from "./Task/TasksList";
import { UserContext } from "../../store/user-context";
import { TaskType } from "../../types/task";
import { baseUrl } from "../../utils/api";

import classes from "./Board.module.css";

type EventType = {
	_id: string;
	description: string;
	dayOfWeek: string;
	UserId: string;
};

type FetchedEventsType = {
	events: EventType[];
};

export const Board = () => {
	const userCtx = useContext(UserContext);
	const weekdaySelected = userCtx.weekdaySelected.toLocaleLowerCase();
	const userToken = localStorage.getItem("token");
	const [tasks, setTasks] = useState<any>();

	const groupTasks = (tasksList: TaskType[]) => {
		return tasksList.reduce((group: any, task) => {
			const { time } = task;
			group[time] = group[time] ?? [];
			group[time].push(task);
			return group;
		}, {});
	};

	const transformTask = ({ events }: FetchedEventsType) => {
		const transformedTasks = events.map((task: EventType) => {
			const taskData = task.description.split(" - ");
			const time = taskData[0];
			const description = taskData[1];
			return {
				_id: task._id,
				dayOfWeek: task.dayOfWeek,
				description,
				time,
			};
		});

		return groupTasks(transformedTasks);
	};

	const fetchTasks = async (weekday: string) => {
		const response = await fetch(`${baseUrl}/events?dayOfWeek=${weekday}`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + userToken,
			},
		});

		const data = await response.json();

		const groupedTasks = transformTask(data);
		setTasks(groupedTasks);
	};

	useEffect(() => {
		if (userToken) {
			setTasks({});
			fetchTasks(weekdaySelected);
		}
	}, [weekdaySelected, userToken]);

	return (
		<main className={classes["board-container"]}>
			<div className={classes["weekday-wrapper"]}>
				<WeekdayList />
			</div>
			<div className={classes.board}>
				<TasksList list={tasks} />
			</div>
		</main>
	);
};
