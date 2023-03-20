import React from "react";

type UserType = {
	city: string;
};

type userContextType = {
	weekdaySelected: string;
	token: string;
	user?: UserType;
	onWeekdayChange: (weekday: string) => void;
	onStoreUserInfo: ({
		token,
		user,
	}: {
		token: string;
		user: UserType;
	}) => void;
};

export const UserContext = React.createContext<userContextType>({
	weekdaySelected: "Monday",
	onWeekdayChange: (weekday: string) => {},
	token: "",
	user: { city: "" },
	onStoreUserInfo: ({ token, user }: { token: string; user: UserType }) => {},
});
