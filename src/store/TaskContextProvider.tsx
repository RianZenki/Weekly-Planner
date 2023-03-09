import React, { useState } from "react";

import { TaskContext } from "./task-context";

type taskType = {
	id: string;
	description: string;
};

type taskListType = {
	time: string;
	tasks: taskType[];
};

type tasksType = {
	weekday: string;
	taskList: taskListType[];
};

type newTaskType = {
	task: string;
	weekday: string;
	time: string;
};

type childrenProps = {
	children: React.ReactNode;
};

export const TaskContextProvider = ({ children }: childrenProps) => {
	const [weekdaySelected, setWeekdaySelected] = useState("Monday");
	const [tasks, setTasks] = useState<tasksType[]>([
		{ weekday: "Monday", taskList: [] },
		{ weekday: "Tuesday", taskList: [] },
		{ weekday: "Wednesday", taskList: [] },
		{ weekday: "Thursday", taskList: [] },
		{ weekday: "Friday", taskList: [] },
		{ weekday: "Saturday", taskList: [] },
		{ weekday: "Sunday", taskList: [] },
	]);

	const weekdayChangeHandler = (weekday: string) => {
		setWeekdaySelected(weekday);
	};

	const getWeekdayIndex = (weekday: string) => {
		return tasks.findIndex((item) => item.weekday === weekday);
	};

	const addTaskHandler = (task: newTaskType) => {
		const oldTasks = [...tasks];
		const weekdayIndex = getWeekdayIndex(task.weekday);
		const taskTimeIndex = oldTasks[weekdayIndex].taskList.findIndex(
			(time) => time.time === task.time
		);

		if (taskTimeIndex === -1) {
			const list = oldTasks[weekdayIndex].taskList;
			list.push({
				time: task.time,
				tasks: [{ id: Math.random() + "", description: task.task }],
			});
		} else {
			oldTasks[weekdayIndex].taskList[taskTimeIndex].tasks.push({
				id: Math.random() + "",
				description: task.task,
			});
		}

		setTasks(oldTasks);
	};

	const deleteTaskByIdHandler = (
		id: string,
		time: string,
		weekday: string
	) => {
		const oldTasks = [...tasks];
		const weekdayIndex = getWeekdayIndex(weekday);
		const taskTimeIndex = oldTasks[weekdayIndex].taskList.findIndex(
			(item) => item.time === time
		);
		const taskIndex = oldTasks[weekdayIndex].taskList[
			taskTimeIndex
		].tasks.findIndex((item) => item.id === id);

		if (oldTasks[weekdayIndex].taskList[taskTimeIndex].tasks.length > 1) {
			oldTasks[weekdayIndex].taskList[taskTimeIndex].tasks.splice(
				taskIndex,
				1
			);
		} else {
			oldTasks[weekdayIndex].taskList.splice(taskTimeIndex, 1);
		}

		setTasks(oldTasks);
	};

	const deleteAllTasksHandler = (weekday: string) => {
		const oldTasks = [...tasks];
		const weekdayIndex = getWeekdayIndex(weekday);
		oldTasks[weekdayIndex].taskList = [];

		setTasks(oldTasks);
	};

	const taskContext = {
		tasks: tasks,
		weekdaySelected: weekdaySelected,
		onWeekdayChange: weekdayChangeHandler,
		onAddTask: addTaskHandler,
		onDeleteAllTasks: deleteAllTasksHandler,
		onDeleteTaskById: deleteTaskByIdHandler,
	};

	return (
		<TaskContext.Provider value={taskContext}>
			{children}
		</TaskContext.Provider>
	);
};
