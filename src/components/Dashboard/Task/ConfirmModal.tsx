import ReactDOM from "react-dom";
import { useState, useContext } from "react";
import { Oval } from "react-loader-spinner";

import { Heading } from "../../Heading";
import { baseUrl } from "../../../utils/api";
import { UserContext } from "../../../store/user-context";
import warning from "../../../assets/warning.png";

import classes from "./ConfirmModal.module.css";

type ConfirmModalProps = {
	onCloseModal: () => void;
	id: string;
};

type BackDropProps = {
	onClose: () => void;
};

type ModalOverlayProps = {
	id: string;
	onClose: () => void;
};

const Backdrop = (props: BackDropProps) => {
	return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props: ModalOverlayProps) => {
	const userCtx = useContext(UserContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const token = localStorage.getItem("token");

	const weekday = userCtx.weekdaySelected;

	const deleteTaskHandler = async () => {
		setIsLoading(true);

		const response = await fetch(`${baseUrl}/events/${props.id}`, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + token,
				"Access-Control-Allow-Origin": "*",
			},
		});

		if (response.ok) {
			userCtx.onWeekdayChange(weekday);
		}

		setIsLoading(false);
		props.onClose();
	};

	return (
		<div className={classes.modal}>
			<img src={warning} alt={"warning"} />
			<div className={classes.heading}>
				<Heading
					title="Delete task"
					text="Are you sure you want to delete this task?"
				/>
			</div>
			<div className={classes["buttons-wrapper"]}>
				<button className={classes.cancel} onClick={props.onClose}>
					Cancel
				</button>
				<button className={classes.confirm} onClick={deleteTaskHandler}>
					{isLoading && (
						<Oval
							height={20}
							width={20}
							color="#ffffff"
							visible={true}
							ariaLabel="oval-loading"
							secondaryColor="#ffffff"
							strokeWidth={5}
							strokeWidthSecondary={5}
						/>
					)}
					{isLoading && "Deleting..."}
					{!isLoading && "Delete"}
				</button>
			</div>
		</div>
	);
};

export const ConfirmModal = (props: ConfirmModalProps) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onCloseModal} />,
				document.getElementById("backdrop-root")!
			)}
			{ReactDOM.createPortal(
				<ModalOverlay onClose={props.onCloseModal} id={props.id} />,
				document.getElementById("overlay-root")!
			)}
		</>
	);
};
