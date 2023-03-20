import ReactDOM from "react-dom";
import { CheckCircle, WarningCircle, Warning } from "phosphor-react";

import classes from "./Alert.module.css";

export type AlertType = {
	type?: "success" | "error" | "warning";
	description?: string;
};

type PropsComponentType = {
	bgColor: string;
	barColor: string;
	icon: any;
};

type AlertElementProps = {
	description?: string;
	propsComponent: PropsComponentType;
};

const AlertElement = (props: AlertElementProps) => {
	return (
		<div
			className={classes["alert-container"]}
			style={{ backgroundColor: props.propsComponent.bgColor }}
		>
			<div className={classes["alert-description"]}>
				{props.propsComponent.icon}
				<p>{props.description}</p>
			</div>
			<div
				className={classes["loading-bar"]}
				style={{ backgroundColor: props.propsComponent.barColor }}
			></div>
		</div>
	);
};

export const Alert = ({ type, description }: AlertType) => {
	let propsComponent = {} as PropsComponentType;

	if (type === "success") {
		propsComponent = {
			bgColor: "#2E7D32",
			barColor: "#8EEB93",
			icon: <CheckCircle size={32} color={"#ffffff"} />,
		};
	} else if (type === "error") {
		propsComponent = {
			bgColor: "#D32F2F",
			barColor: "#FD9999",
			icon: <WarningCircle size={32} color={"#ffffff"} />,
		};
	} else if (type === "warning") {
		propsComponent = {
			bgColor: "#ED6C02",
			barColor: "#FFA459",
			icon: <Warning size={32} color={"#ffffff"} />,
		};
	}

	return (
		<>
			{ReactDOM.createPortal(
				<AlertElement
					description={description}
					propsComponent={propsComponent}
				/>,
				document.getElementById("alert-root")!
			)}
		</>
	);
};
