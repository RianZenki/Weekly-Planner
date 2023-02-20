import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import cloudy from "../../assets/cloudy.png";

import classes from "./Weather.module.css";

export const Weather = () => {
	const navigate = useNavigate();
	const [weather, setWeather] = useState([]);

	const storedUser = localStorage.getItem("user");

	if (!storedUser) {
		localStorage.removeItem("user");
		localStorage.removeItem("authenticated");
		navigate("/");
	}

	const userData = JSON.parse(storedUser!);

	useEffect(() => {
		const fetchWeather = async () => {
			const city = userData.city;
			const apiKey = "0da92eb9bfad0a0069368b83e2d5411d";
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt&appid=`;

			const response = await fetch(url + apiKey);
			const data = await response.json();
			setWeather(data);
		};
		fetchWeather();
	}, [userData.city]);

	return (
		<div className={classes["weather-container"]}>
			<p className={classes.location}>
				{userData.city} - {userData.country}
			</p>

			<>
				{weather && (
					<div className={classes["temp-wrapper"]}>
						<img src={cloudy} alt="cloudy" />
						<p className={classes.temp}>22°</p>
						{/* <p className={classes.temp}>{weather.main.temp}°</p> */}
					</div>
				)}

				{!weather && <p className={classes["error"]}>City not found</p>}
			</>
		</div>
	);
};
