import React, { useState } from "react";

import { UserContext } from "./user-context";

type ChildrenProps = {
	children: React.ReactNode;
};

export const UserContextProvider = ({ children }: ChildrenProps) => {
	const [weekdaySelected, setWeekdaySelected] = useState<string>("Monday");

	const weekdayChangeHandler = (weekday: string) => {
		setWeekdaySelected(weekday);
	};

	const userContext = {
		weekdaySelected: weekdaySelected,
		onWeekdayChange: weekdayChangeHandler,
	};

	return (
		<UserContext.Provider value={userContext}>
			{children}
		</UserContext.Provider>
	);
};
