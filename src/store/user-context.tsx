import React from "react";

type userContextType = {
	weekdaySelected: string;
	onWeekdayChange: (weekday: string) => void;
};

export const UserContext = React.createContext<userContextType>({
	weekdaySelected: "Monday",
	onWeekdayChange: (weekday: string) => {},
});
