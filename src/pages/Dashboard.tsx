import { DashboardHeader } from "../components/Dashboard/DashboardHeader";
import { DashboardAction } from "../components/Dashboard/DashboardAction";
import { Board } from "../components/Dashboard/Board";

import logoBackground from "../assets/logo-background.png";

export const Dashboard = () => {
	return (
		<div
			style={{
				position: "relative",
				height: "100vh",
				backgroundColor: "rgba(255, 255, 255, .96)",
				zIndex: 0,
			}}
		>
			<DashboardHeader />
			<DashboardAction />
			<Board />
			<img
				style={{
					width: 450,
					position: "absolute",
					right: 0,
					bottom: 0,
					zIndex: -1,
				}}
				src={logoBackground}
				alt="logo"
			/>
		</div>
	);
};
