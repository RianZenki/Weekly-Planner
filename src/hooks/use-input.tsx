import React, { useState } from "react";

export const useInput = (validateValue: (value: string) => boolean) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = () => {
		setIsTouched(true);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
	};
};
