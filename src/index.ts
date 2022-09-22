import express, { Express, Request, Response } from "express";

import fetchWeather from "./weather";

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("news-backend");
});

app.get("/weather", async (req: Request, res: Response) => {
    try {
        const result = await fetchWeather();
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(502).json(result);
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false as boolean,
            message: "Internal Server Error" as string,
        });
    }
});

// запуск сервера
const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}! Pid: ${process.pid}`);
});

server.on("error", e => console.log("Error:" + e));