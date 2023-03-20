import { useContext, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";

import { UserContext } from "../../store/user-context";
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import { WEEKDAYS } from "../../pages/Dashboard";
import { baseUrl } from "../../utils/api";

import classes from "./DashboardAction.module.css";

export const DashboardAction = () => {
	const userCtx = useContext(UserContext);
	const weekdaySelected = userCtx.weekdaySelected.toLocaleLowerCase();
	const userToken = localStorage.getItem("token");
	const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
	const [isDelLoading, setIsDelLoading] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const weekdayRef = useRef<HTMLSelectElement>(null);
	const timeRef = useRef<HTMLSelectElement>(null);

	const addNewTaskHandler = async () => {
		if (
			inputRef.current!.value === "" ||
			inputRef.current!.value.length < 3
		) {
			return;
		}
		setIsAddLoading(true);

		const response = await fetch(`${baseUrl}/events`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + userToken,
			},
			body: JSON.stringify({
				description: `${timeRef.current!.value} - ${
					inputRef.current!.value
				}`,
				dayOfWeek: weekdayRef.current!.value,
			}),
		});

		const data = await response.json();

		console.log(data);

		inputRef.current!.value = "";
		setIsAddLoading(false);
	};

	const deleteAllTasksHandler = async () => {
		setIsDelLoading(true);

		const response = await fetch(
			`${baseUrl}/events?dayOfWeek=${weekdaySelected}`,
			{
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + userToken,
				},
			}
		);

		const data = await response.json();
		console.log(data);

		setIsDelLoading(false);
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
						onClick={addNewTaskHandler}
					>
						{!isAddLoading && (
							<>
								<img src={plus} alt={plus} />
								Add to Calendar
							</>
						)}

						{isAddLoading && (
							<Oval
								height={20}
								width={20}
								color="#ffffff"
								visible={true}
								ariaLabel="oval-loading"
								secondaryColor="#ffffff"
								strokeWidth={5}
								strokeWidthSecondary={5}
							/>
						)}
						{isAddLoading && "Adding..."}
					</button>

					<button
						className={classes.delete}
						type="button"
						onClick={deleteAllTasksHandler}
					>
						{!isDelLoading && (
							<>
								<img src={minus} alt={minus} />
								Delete All
							</>
						)}

						{isDelLoading && (
							<Oval
								height={20}
								width={20}
								color="#ffffff"
								visible={true}
								ariaLabel="oval-loading"
								secondaryColor="#ffffff"
								strokeWidth={5}
								strokeWidthSecondary={5}
							/>
						)}
						{isDelLoading && "Deleting..."}
					</button>
				</div>
			</form>
		</div>
	);
};
