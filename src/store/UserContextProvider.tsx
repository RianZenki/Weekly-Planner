import React, { useState } from "react";

import { UserContext } from "./user-context";

type ChildrenProps = {
	children: React.ReactNode;
};

type UserType = {
	city: string;
};

export const UserContextProvider = ({ children }: ChildrenProps) => {
	const [weekdaySelected, setWeekdaySelected] = useState<string>("Monday");
	const [token, setToken] = useState<string>("");
	const [user, setUser] = useState<UserType>();

	const weekdayChangeHandler = (weekday: string) => {
		setWeekdaySelected(weekday);
	};

	const storeUserInfoHandler = ({
		token,
		user,
	}: {
		token: string;
		user: UserType;
	}) => {
		setToken(token);
		setUser(user);
	};

	const userContext = {
		weekdaySelected: weekdaySelected,
		onWeekdayChange: weekdayChangeHandler,
		token: token,
		user: user,
		onStoreUserInfo: storeUserInfoHandler,
	};

	return (
		<UserContext.Provider value={userContext}>
			{children}
		</UserContext.Provider>
	);
};
