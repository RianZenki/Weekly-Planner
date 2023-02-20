import React from "react";

type taskType = {
	id: string;
	description: string;
};

type taskListType = {
	time: string;
	tasks: taskType[] | [];
};

type tasksType = {
	weekday: string;
	taskList: taskListType[] | [];
};

type newTaskType = {
	task: string;
	weekday: string;
	time: string;
};

type taskContextType = {
	tasks: tasksType[];
	weekdaySelected: string;
	onWeekdayChange: (weekday: string) => void;
	onAddTask: (task: newTaskType) => void;
	onDeleteAllTasks: (weekday: string) => void;
};

export const TaskContext = React.createContext<taskContextType>({
	tasks: [],
	weekdaySelected: "Tuesday",
	onWeekdayChange: (weekday: string) => {},
	onAddTask: (task: newTaskType) => {},
	onDeleteAllTasks: (weekday: string) => {},
});
