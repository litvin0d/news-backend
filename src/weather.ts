import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

import { IError, IWeather } from "./@types/models";

dotenv.config();

const fetchWeather = async () => {
    try {
        const url: string = "https://api.weather.yandex.ru/v2/forecast?lat=55.159902&lon=61.402554&lang=ru_RU&limit=3";
        const result: AxiosResponse = await axios.get(url, { headers: { "X-Yandex-API-Key": `${process.env.YANDEX_WEATHER_API_KEY}` } });
        return {
            success: true,
            temp: result.data.fact.temp,
            icon: result.data.fact.icon,
            condition: result.data.fact.condition,
        } as IWeather;
    } catch (e) {
        console.error("fetchWeather error: " + e);
        return {
            success: false,
            message: "Weather data not available",
        } as IError;
    }
};

export default fetchWeather;
