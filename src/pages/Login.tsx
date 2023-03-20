import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import { AuthTemplate } from "../components/AuthTemplate";
import { Heading } from "../components/Heading";
import { Alert, AlertType } from "../components/Alert/Alert";
import { baseUrl } from "../utils/api";

import userIcon from "../assets/user-icon.png";
import passwordIcon from "../assets/password-icon.png";

import classes from "./Login.module.css";

export const Login = () => {
	const userRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [userIsFocus, setUserIsFocus] = useState<boolean>(false);
	const [passwordIsFocus, setPasswordIsFocus] = useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [alertInfo, setAlertInfo] = useState<AlertType>();

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

	const loginUser = async () => {
		const response = await fetch(`${baseUrl}/users/sign-in`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: userRef.current!.value,
				password: passwordRef.current!.value,
			}),
		});

		const data = await response.json();

		if (!response.ok && response.status === 400) {
			setAlertInfo({ type: "error", description: data.message || data });
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 3000);
			return;
		}

		if (!response.ok && response.status === 403) {
			setAlertInfo({ type: "error", description: data });
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 3000);
			return;
		}

		localStorage.setItem("token", data.token);
		localStorage.setItem("user", JSON.stringify(data.user));
		navigate("/dashboard");
	};

	const submitHandler = async (event: React.FormEvent) => {
		event.preventDefault();

		if (
			(userRef.current!.value.trim().length < 3 &&
				userRef.current!.value.indexOf("@") === -1) ||
			passwordRef.current!.value.trim().length < 6
		) {
			setShowError(true);
			return;
		}

		setIsLoading(true);

		await loginUser();

		setIsLoading(false);
		setShowError(false);
	};

	return (
		<AuthTemplate>
			{showAlert && (
				<Alert
					type={alertInfo?.type}
					description={alertInfo?.description}
				/>
			)}
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
						<span>Please, try again!</span>
					</p>
				)}

				<div className={classes["buttons-wrapper"]}>
					<button disabled={isLoading}>
						{!isLoading && "Log in"}
						{isLoading && (
							<Oval
								height={30}
								width={30}
								color="#ffffff"
								visible={true}
								ariaLabel="oval-loading"
								secondaryColor="#ffffff"
								strokeWidth={5}
								strokeWidthSecondary={5}
							/>
						)}
						{isLoading && "Sending..."}
					</button>
					<p>
						Don't have an account? <Link to="register">Register now</Link>
					</p>
				</div>
			</form>
		</AuthTemplate>
	);
};
