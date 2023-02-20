import React from "react";

import classes from "./Input.module.css";

type InputProps = {
	type?: string;
	label: string;
	placeholder: string;
	id: string;
	value: string;
	className: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
};

export const Input = (props: InputProps) => {
	const type = props.type || "text";

	return (
		<p className={classes["input-group"]}>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				type={type}
				placeholder={props.placeholder}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
				className={classes[props.className]}
			/>
		</p>
	);
};
