import { Link, useNavigate } from "react-router-dom";

import { Heading } from "../Heading";
import { DateTime } from "./DateTime";
import { Weather } from "./Weather";

import logo from "../../assets/logo-black.png";
import arrow from "../../assets/arrow.png";

import classes from "./DashboardHeader.module.css";

export const DashboardHeader = () => {
	const navigate = useNavigate();

	const logoutHandler = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("authenticated");
		navigate("/");
	};

	return (
		<header className={classes.container}>
			<div className={classes.heading}>
				<Heading
					title="Weekly Planner"
					text="Use this planner to organize your daily issues."
				/>
			</div>

			<DateTime />

			<Weather />

			<div className={classes.actions}>
				<Link to="https://compass.uol/en/home/" target="_black">
					<img
						className={classes.logo}
						src={logo}
						alt="Compass.uol logo"
					/>
				</Link>
				<div className={classes.logout} onClick={logoutHandler}>
					<img className={classes.arrow} src={arrow} alt="Arrow" />
					<p>Logout</p>
				</div>
			</div>
		</header>
	);
};
