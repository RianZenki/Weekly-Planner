import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import cloudy from "../../assets/cloudy.png";

import classes from "./Weather.module.css";

type WeatherType = {
	cod: number | string;
	main?: {
		temp: number;
	};
};

export const Weather = () => {
	const navigate = useNavigate();
	const [weather, setWeather] = useState<WeatherType>();

	const storedUser = localStorage.getItem("user");
	const storedToken = localStorage.getItem("token");

	if (!storedUser || !storedToken) {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		navigate("/");
	}

	const userData = JSON.parse(storedUser!);

	const fetchWeather = async () => {
		const city = userData.city || "";
		const apiKey = "0da92eb9bfad0a0069368b83e2d5411d";
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt&appid=`;

		const response = await fetch(url + apiKey);
		const data = await response.json();
		setWeather(data);
	};

	useEffect(() => {
		if (userData.city) {
			fetchWeather();
		}
	}, []);

	return (
		<div className={classes["weather-container"]}>
			{userData && (
				<p className={classes.location}>
					{userData.city} - {userData.country}
				</p>
			)}

			{weather && weather.cod === 200 && (
				<div className={classes["temp-wrapper"]}>
					<img src={cloudy} alt="cloudy" />
					{weather.main && (
						<p className={classes.temp}>
							{Math.round(weather.main.temp)}°
						</p>
					)}
				</div>
			)}

			{weather && weather.cod === "404" && (
				<p className={classes["error"]}>City not found</p>
			)}
		</div>
	);
};
