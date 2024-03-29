import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

import { useInput } from "../hooks/use-input";
import { Alert, AlertType } from "../components/Alert/Alert";
import { Input } from "../components/Input";
import { AuthTemplate } from "../components/AuthTemplate";
import { Heading } from "../components/Heading";
import { baseUrl } from "../utils/api";

import classes from "./Register.module.css";

export const Register = () => {
	const {
		value: enteredFirstName,
		isValid: enteredFirstNameIsValid,
		hasError: enteredFirstNameHasError,
		valueChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameInputBlurHandler,
	} = useInput(
		(value) =>
			value.trim() !== "" &&
			value.trim().length > 2 &&
			RegExp(/^[a-zA-Z]+$/).test(value)
	);

	const {
		value: enteredLastName,
		isValid: enteredLastNameIsValid,
		hasError: enteredLastNameHasError,
		valueChangeHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameInputBlurHandler,
	} = useInput(
		(value) =>
			value.trim() !== "" &&
			value.trim().length > 2 &&
			RegExp(/^[a-zA-Z]+$/).test(value)
	);

	const {
		value: enteredBirthDate,
		isValid: enteredBirthDateIsValid,
		hasError: enteredBirthDateHasError,
		valueChangeHandler: birthDateChangeHandler,
		inputBlurHandler: birthDateInputBlurHandler,
	} = useInput((value) => value.trim() !== "" && value.trim().length > 3);

	const {
		value: enteredCountry,
		isValid: enteredCountryIsValid,
		hasError: enteredCountryHasError,
		valueChangeHandler: countryChangeHandler,
		inputBlurHandler: countryInputBlurHandler,
	} = useInput(
		(value) =>
			value.trim() !== "" &&
			value.trim().length > 3 &&
			RegExp(/^[a-zA-Z]+$/).test(value)
	);

	const {
		value: enteredCity,
		isValid: enteredCityIsValid,
		hasError: enteredCityHasError,
		valueChangeHandler: cityChangeHandler,
		inputBlurHandler: cityInputBlurHandler,
	} = useInput(
		(value) =>
			value.trim() !== "" &&
			value.trim().length > 3 &&
			RegExp(/^[a-zA-Z\s]+$/).test(value)
	);

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: enteredEmailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailInputBlurHandler,
	} = useInput(
		(value) =>
			value.trim() !== "" && value.includes("@") && value.includes(".")
	);

	const {
		value: enteredPassword,
		isValid: enteredPasswordIsValid,
		hasError: enteredPasswordHasError,
		valueChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordInputBlurHandler,
	} = useInput((value) =>
		RegExp(
			"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
		).test(value)
	);

	const {
		value: enteredConfirmPass,
		isValid: enteredConfirmPassIsValid,
		hasError: enteredConfirmPassHasError,
		valueChangeHandler: confirmPassChangeHandler,
		inputBlurHandler: confirmPassInputBlurHandler,
	} = useInput(
		(value) =>
			value.trim() === enteredPassword &&
			RegExp(
				"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
			).test(value)
	);

	const [showError, setShowError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [alertInfo, setAlertInfo] = useState<AlertType>();
	const navigate = useNavigate();

	const formIsValid =
		enteredFirstNameIsValid &&
		enteredLastNameIsValid &&
		enteredBirthDateIsValid &&
		enteredCityIsValid &&
		enteredCountryIsValid &&
		enteredEmailIsValid &&
		enteredPasswordIsValid &&
		enteredConfirmPassIsValid;

	const registerUser = async () => {
		const response = await fetch(`${baseUrl}/users/sign-up`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: enteredFirstName,
				lastName: enteredLastName,
				birthDate: enteredBirthDate,
				country: enteredCountry,
				city: enteredCity,
				email: enteredEmail,
				password: enteredPassword,
				confirmPassword: enteredConfirmPass,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			setAlertInfo({ type: "warning", description: data });
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 3000);
			return;
		} else {
			navigate("/");
		}
	};

	const formSubmitHandler = async (event: React.FormEvent) => {
		event.preventDefault();

		if (formIsValid) {
			setShowError(false);
			setIsLoading(true);

			await registerUser();

			setIsLoading(false);
		} else {
			setShowError(true);
			return;
		}
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
				<Heading title="Welcome," text="Please, register to continue" />
			</div>

			<form className={classes.form} onSubmit={formSubmitHandler}>
				<Input
					label="first name"
					placeholder="Your first name"
					id="firstName"
					onChange={firstNameChangeHandler}
					onBlur={firstNameInputBlurHandler}
					value={enteredFirstName}
					className={`${enteredFirstNameHasError ? "invalid" : ""}`}
				/>
				<Input
					label="last name"
					placeholder="Your last name"
					id="lastName"
					onChange={lastNameChangeHandler}
					onBlur={lastNameInputBlurHandler}
					value={enteredLastName}
					className={`${enteredLastNameHasError ? "invalid" : ""}`}
				/>
				<Input
					type="date"
					label="birth date"
					placeholder="DD/MM/YYYY"
					id="birthDate"
					onChange={birthDateChangeHandler}
					onBlur={birthDateInputBlurHandler}
					value={enteredBirthDate}
					className={`${enteredBirthDateHasError ? "invalid" : ""}`}
				/>
				<Input
					label="Country"
					placeholder="Your Country"
					id="country"
					onChange={countryChangeHandler}
					onBlur={countryInputBlurHandler}
					value={enteredCountry}
					className={`${enteredCountryHasError ? "invalid" : ""}`}
				/>
				<Input
					label="City"
					placeholder="Your City"
					id="city"
					onChange={cityChangeHandler}
					onBlur={cityInputBlurHandler}
					value={enteredCity}
					className={`${enteredCityHasError ? "invalid" : ""}`}
				/>
				<Input
					type="email"
					label="e-mail"
					placeholder="A valid e-mail here"
					id="email"
					onChange={emailChangeHandler}
					onBlur={emailInputBlurHandler}
					value={enteredEmail}
					className={`${enteredEmailHasError ? "invalid" : ""}`}
				/>
				<Input
					type="password"
					label="password"
					placeholder="Your password"
					id="password"
					onChange={passwordChangeHandler}
					onBlur={passwordInputBlurHandler}
					value={enteredPassword}
					className={`${enteredPasswordHasError ? "invalid" : ""}`}
				/>
				<Input
					type="password"
					label="password"
					placeholder="Confirm your password"
					id="confirmPassword"
					onChange={confirmPassChangeHandler}
					onBlur={confirmPassInputBlurHandler}
					value={enteredConfirmPass}
					className={`${enteredConfirmPassHasError ? "invalid" : ""}`}
				/>

				{showError && (
					<p className={classes.error}>Form invalid! Please try again.</p>
				)}
				<div className={classes["buttons-wrapper"]}>
					<button>
						{!isLoading && "Register Now"}
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
						Already have an account? <Link to="/">Login now</Link>
					</p>
				</div>
			</form>
		</AuthTemplate>
	);
};
