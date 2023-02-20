import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthTemplate } from "../components/AuthTemplate";
import { Heading } from "../components/Heading";

import userIcon from "../assets/user-icon.png";
import passwordIcon from "../assets/password-icon.png";

import classes from "./Login.module.css";

export const Login = () => {
	const userRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [userIsFocus, setUserIsFocus] = useState(false);
	const [passwordIsFocus, setPasswordIsFocus] = useState(false);
	const [showError, setShowError] = useState(false);

	const navigate = useNavigate();

	const userFocusHandler = () => {
		setUserIsFocus(true);
	};

	const userBlurHandler = () => {
		if (userRef.current!.value.trim().length === 0) {
			setUserIsFocus(false);
		}
	};

	const passwordFocusHandler = () => {
		setPasswordIsFocus(true);
	};

	const passwordBlurHandler = () => {
		if (passwordRef.current!.value.trim().length === 0) {
			setPasswordIsFocus(false);
		}
	};

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		const storedUser = localStorage.getItem("user");

		if (
			userRef.current!.value.trim().length === 0 ||
			passwordRef.current!.value.trim().length === 0
		) {
			setShowError(true);
			return;
		}

		if (!storedUser) {
			setShowError(true);
			return;
		}

		const userData = JSON.parse(storedUser);
		const fullUserName = `${userData.firstName} ${userData.lastName}`;

		if (
			(userRef.current!.value === userData.email &&
				passwordRef.current!.value === userData.password) ||
			(userRef.current!.value === fullUserName &&
				passwordRef.current!.value === userData.password)
		) {
			localStorage.setItem("authenticated", "true");
			return navigate("/dashboard");
		}
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
						className={`${showError ? classes.invalid : ""}`}
					/>
					<img
						src={userIcon}
						alt="User icon"
						className={userIsFocus ? classes.focus : ""}
					/>
				</p>
				<p
					className={classes["input-wrapper"]}
					onFocus={passwordFocusHandler}
					onBlur={passwordBlurHandler}
				>
					<input
						ref={passwordRef}
						type="password"
						placeholder="password"
						className={`${showError ? classes.invalid : ""}`}
					/>
					<img
						src={passwordIcon}
						alt="Password icon"
						className={passwordIsFocus ? classes.focus : ""}
					/>
				</p>

				{showError && (
					<p className={classes.error}>
						Wow, invalid username or password.
						<span>Plase, try again!</span>
					</p>
				)}

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
