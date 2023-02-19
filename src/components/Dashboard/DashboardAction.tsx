import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";

import classes from "./DashboardAction.module.css";

const WEEKDAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

export const DashboardAction = () => {
	return (
		<div className={classes["dashboard-action-container"]}>
			<form>
				<div className={classes["inputs-wrapper"]}>
					<input type="text" placeholder="Task or issue" />
					<select>
						{WEEKDAYS.map((day) => ( 
							<option  key={day} value={day}>{day}</option>
						))}
					</select>

					<select>
						<option>10h 30m</option>
					</select>
				</div>

				<div className={classes["buttons-wrapper"]}>
					<button className={classes.add}>
						<img src={plus} alt={plus} />
						Add to Calendar
					</button>
					<button className={classes.delete} type="button">
						<img src={minus} alt={minus} />
						Delete All
					</button>
				</div>
			</form>
		</div>
	);
};
