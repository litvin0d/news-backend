import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const fetchWeather = async () => {
    try {
        const url = `https://api.weather.yandex.ru/v2/forecast?lat=55.159902&lon=61.402554&lang=ru_RU&limit=1`;
        const result = await axios.get(url, { headers: { "X-Yandex-API-Key": `${process.env.YANDEX_WEATHER_API_KEY}` } });
        return {
            success: true as boolean,
            temp: result.data.fact.temp as number,
            icon: result.data.fact.icon as string,
            condition: result.data.fact.condition as string,
        };
    } catch (e) {
        console.error("fetchWeather error: " + e);
        return {
            success: false as boolean,
            message: "Weather data not available" as string,
        }
    }
};

export default fetchWeather;