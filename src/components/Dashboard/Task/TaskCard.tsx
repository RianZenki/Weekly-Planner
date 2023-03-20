import { useState } from "react";

import { ConfirmModal } from "./ConfirmModal";

import classes from "./TaskCard.module.css";

type taskCardProps = {
	description: string;
	className: string;
	id: string;
	weekday: string;
};

export const TaskCard = (props: taskCardProps) => {
	const [showModal, setShowModal] = useState<boolean>(false);

	const closeModalHandler = () => {
		setShowModal(false);
	};

	return (
		<>
			<div
				className={`${classes.task} ${classes[props.weekday]} ${
					classes[props.className]
				}`}
			>
				<p>{props.description}</p>
				<button onClick={() => setShowModal(true)}>Delete</button>
			</div>

			{showModal && (
				<ConfirmModal onCloseModal={closeModalHandler} id={props.id} />
			)}
		</>
	);
};
