import { useContext, useRef } from "react";

import { TaskContext } from "../../store/task-context";

import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import { WEEKDAYS } from "../../pages/Dashboard";

import classes from "./DashboardAction.module.css";

export const DashboardAction = () => {
	const taskCtx = useContext(TaskContext);
	const selectedWeekday = taskCtx.weekdaySelected;

	const inputRef = useRef<HTMLInputElement>(null);
	const weekdayRef = useRef<HTMLSelectElement>(null);
	const timeRef = useRef<HTMLSelectElement>(null);

	const addNewTask = () => {
		if (inputRef.current!.value === "") {
			return;
		}

		taskCtx.onAddTask({
			task: inputRef.current!.value,
			weekday: weekdayRef.current!.value,
			time: timeRef.current!.value,
		});

		inputRef.current!.value = "";
	};

	return (
		<div className={classes["dashboard-action-container"]}>
			<form>
				<div className={classes["inputs-wrapper"]}>
					<input ref={inputRef} type="text" placeholder="Task or issue" />
					<select ref={weekdayRef}>
						{WEEKDAYS.map((day) => (
							<option key={day} value={day}>
								{day}
							</option>
						))}
					</select>

					<select ref={timeRef}>
						<option key={"10h 30m"} value={"10h 30m"}>
							10h 30m
						</option>
						<option key={"11h 00m"} value={"11h 00m"}>
							11h 00m
						</option>
						<option key={"13h 10m"} value={"13h 10m"}>
							13h 10m
						</option>
						<option key={"15h 00m"} value={"15h 00m"}>
							15h 00m
						</option>
						<option key={"16h 55m"} value={"16h 55m"}>
							16h 55m
						</option>
						<option key={"17h 25m"} value={"17h 25m"}>
							17h 25m
						</option>
						<option key={"22h 15m"} value={"22h 15m"}>
							22h 15m
						</option>
					</select>
				</div>

				<div className={classes["buttons-wrapper"]}>
					<button
						type="button"
						className={classes.add}
						onClick={addNewTask}
					>
						<img src={plus} alt={plus} />
						Add to Calendar
					</button>
					<button
						className={classes.delete}
						type="button"
						onClick={() => taskCtx.onDeleteAllTasks(selectedWeekday)}
					>
						<img src={minus} alt={minus} />
						Delete All
					</button>
				</div>
			</form>
		</div>
	);
};
