import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DashboardHeader } from "../components/Dashboard/DashboardHeader";
import { DashboardAction } from "../components/Dashboard/DashboardAction";
import { Board } from "../components/Dashboard/Board";

import logoBackground from "../assets/logo-background.png";

import classes from "./Dashboard.module.css";

export const WEEKDAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

export const Dashboard = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (
			!localStorage.getItem("user") ||
			!localStorage.getItem("authenticated")
		) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<div className={classes["dashboard-container"]}>
			<DashboardHeader />
			<DashboardAction />
			<Board />
			<img
				className={classes["background-img"]}
				src={logoBackground}
				alt="logo"
			/>
		</div>
	);
};
