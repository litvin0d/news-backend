import express, { Express, Request, Response } from "express";
import cors from "cors";

import fetchWeather from "./weather";
import fetchNews from "./news";
import { IHttpStatusesType, IWeather, INews, IError } from "./@types/models";

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

const HTTP_STATUSES: IHttpStatusesType = {
    OK_200: 200,
    NON_AUTHORITATIVE_INFORMATION_203: 203,
    INTERNAL_SERVER_ERROR_500: 500,
    BAD_GATEWAY_502: 502,
};

app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response<string>) => {
    res.status(HTTP_STATUSES.OK_200).send("news-backend" as string);
});

app.get("/weather", async (req: Request, res: Response<object>) => {
    try {
        const result: IWeather | IError = await fetchWeather();
        if (result.success) {
            res.status(HTTP_STATUSES.NON_AUTHORITATIVE_INFORMATION_203).json(result);
        } else {
            res.status(HTTP_STATUSES.BAD_GATEWAY_502).json(result);
        }
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
            success: false,
            message: "Internal Server Error",
        } as IError);
    }
});

app.get("/news", async (req: Request, res: Response<object>) => {
    try {
        const result: INews | IError = await fetchNews();
        if (result.success) {
            res.status(HTTP_STATUSES.NON_AUTHORITATIVE_INFORMATION_203).json(result);
        } else {
            res.status(HTTP_STATUSES.BAD_GATEWAY_502).json(result);
        }
    } catch (e) {
        console.log(e);
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
            success: false,
            message: "Internal Server Error",
        } as IError);
    }
});

// запуск сервера
const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}! Pid: ${process.pid}`);
});

server.on("error", e => console.log("Error:" + e));
