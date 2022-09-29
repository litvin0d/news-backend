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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const weather_1 = __importDefault(require("./weather"));
const news_1 = __importDefault(require("./news"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const HTTP_STATUSES = {
    OK_200: 200,
    NON_AUTHORITATIVE_INFORMATION_203: 203,
    INTERNAL_SERVER_ERROR_500: 500,
    BAD_GATEWAY_502: 502,
};
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.status(HTTP_STATUSES.OK_200).send("news-backend");
});
app.get("/weather", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, weather_1.default)();
        if (result.success) {
            res.status(HTTP_STATUSES.NON_AUTHORITATIVE_INFORMATION_203).json(result);
        }
        else {
            res.status(HTTP_STATUSES.BAD_GATEWAY_502).json(result);
        }
    }
    catch (e) {
        console.error(e);
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}));
app.get("/news", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, news_1.default)();
        if (result.success) {
            res.status(HTTP_STATUSES.NON_AUTHORITATIVE_INFORMATION_203).json(result);
        }
        else {
            res.status(HTTP_STATUSES.BAD_GATEWAY_502).json(result);
        }
    }
    catch (e) {
        console.log(e);
        res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}));
// запуск сервера
const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}! Pid: ${process.pid}`);
});
server.on("error", e => console.log("Error:" + e));
