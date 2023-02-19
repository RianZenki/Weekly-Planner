import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { AuthTemplate } from "../components/AuthTemplate";
import { Heading } from "../components/Heading";

import userIcon from "../assets/user-icon.png";
import passwordIcon from "../assets/password-icon.png";

import classes from "./Login.module.css";

export const Login = () => {
	const userRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const [userIsFocus, setUserIsFocus] = useState(false);
	const [passIsFocus, setpassIsFocus] = useState(false);

	const userFocusHandler = () => {
		setUserIsFocus(true);
	};

	const userBlurHandler = () => {
		if (userRef.current!.value.trim().length === 0) {
			setUserIsFocus(false);
		}
	};

	const passFocusHandler = () => {
		setpassIsFocus(true);
	};

	const passBlurHandler = () => {
		if (passRef.current!.value.trim().length === 0) {
			setpassIsFocus(false);
		}
	};

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		console.log("submitting...");
	};

	return (
		<AuthTemplate>
			<div className={classes.heading}>
				<Heading
					title="Welcome,"
					text="To continue browsing safely, log in to the network"
				/>
			</div>

			<form className={classes["auth-form"]} onSubmit={submitHandler}>
				<h1>Login</h1>
				<p className={classes["input-wrapper"]}>
					<input
						ref={userRef}
						onFocus={userFocusHandler}
						onBlur={userBlurHandler}
						type="text"
						placeholder="user name"
					/>
					<img
						src={userIcon}
						alt="User icon"
						className={userIsFocus ? classes.focus : ""}
					/>
				</p>
				<p
					className={classes["input-wrapper"]}
					onFocus={passFocusHandler}
					onBlur={passBlurHandler}
				>
					<input ref={passRef} type="password" placeholder="password" />
					<img
						src={passwordIcon}
						alt="Password icon"
						className={passIsFocus ? classes.focus : ""}
					/>
				</p>

				<div className={classes["buttons-wrapper"]}>
					<button>Log in</button>
					<p>
						Don't have an account? <Link to="register">Register now</Link>
					</p>
				</div>
			</form>
		</AuthTemplate>
	);
};
