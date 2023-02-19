import { useLoaderData } from "react-router-dom";

import cloudy from "../../assets/cloudy.png";

import classes from "./Weather.module.css";

export const Weather = () => {
	const data = useLoaderData();

	return (
		<div className={classes["weather-container"]}>
			<p className={classes.location}>São Paulo - Brasil</p>

			<>
				{data && (
					<div className={classes["temp-wrapper"]}>
						<img src={cloudy} alt="cloudy" />
						<p className={classes.temp}>20°</p>
						{/* <p className={classes.temp}>{`${Math.round(data.main.temp)}°`}</p> */}
					</div>
				)}

				{!data && <p className={classes["error"]}>City not found</p>}
			</>
		</div>
	);
};

export const loader = async () => {
	const city = "São Paulo";
	const apiKey = "0da92eb9bfad0a0069368b83e2d5411d";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt&appid=`;

	const response = await fetch(url + apiKey);

	if (!response.ok) {
		console.log("Error");
		return null;
	}

	return response;
};
