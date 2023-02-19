import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo-white.png";

import classes from "./AuthTemplate.module.css";

export const AuthTemplate = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={classes.container}>
			<main>
				<div>{children}</div>
			</main>

			<div className={classes["aside-image"]}>
				<Link to="https://compass.uol/en/home/" target="_blank">
					<img src={logo} alt="Compass.uol logo"></img>
				</Link>
			</div>
		</div>
	);
};
