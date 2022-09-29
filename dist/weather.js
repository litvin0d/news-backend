"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fetchWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = "https://api.weather.yandex.ru/v2/forecast?lat=55.159902&lon=61.402554&lang=ru_RU&limit=3";
        const result = yield axios_1.default.get(url, { headers: { "X-Yandex-API-Key": `${process.env.YANDEX_WEATHER_API_KEY}` } });
        return {
            success: true,
            temp: result.data.fact.temp,
            icon: result.data.fact.icon,
            condition: result.data.fact.condition,
        };
    }
    catch (e) {
        console.error("fetchWeather error: " + e);
        return {
            success: false,
            message: "Weather data not available",
        };
    }
});
exports.default = fetchWeather;
