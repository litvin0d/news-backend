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
const puppeteer_1 = __importDefault(require("puppeteer"));
const user_agents_1 = __importDefault(require("user-agents"));
const fetchNews = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // запуск браузера
        const browser = yield puppeteer_1.default.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ],
            userDataDir: "./dist/cache",
        });
        // создание новой страницы
        const page = yield browser.newPage();
        // рандомизация user-agent во избежание блокировки доступа
        yield page.setUserAgent(user_agents_1.default.toString());
        // переход на страницу по url
        yield page.goto("https://74.ru/text/", { waitUntil: "networkidle2" });
        yield page.waitForSelector("#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:last-child");
        // получение новостных статей
        const articles = yield page.evaluate(() => {
            // подсчет количества статей
            let totalArticlesNumber = Array.from(document.querySelectorAll("#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article")).length;
            // возвращаемый объект
            let result = {
                success: true,
                articles: [],
            };
            // перебор всех статей
            for (let i = 1; i <= totalArticlesNumber; i++) {
                // объект статьи
                let article = {
                    title: "",
                    description: "",
                    url: "",
                    urlToImage: "",
                    publishedAt: "",
                    views: null,
                };
                // получение заголовка статьи
                const title = document.querySelector(`#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:nth-child(${i}) > div > div.VC1Fb > h2 > a`);
                article.title = title ? title.innerText : "";
                // получение описания статьи
                const description = document.querySelector(`#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:nth-child(${i}) > div > div.VC1Fb > div > a`);
                article.description = description ? description.innerText : "";
                // получение ссылки на статью
                article.url = title ? title.href : "";
                // получение ссылки на изображение
                const urlToImage = document.querySelector(`#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:nth-child(${i}) > a > picture > img`);
                article.urlToImage = urlToImage ? urlToImage.src : "";
                // получение даты публикации
                const publishedAt = document.querySelector(`#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:nth-child(${i}) > div > div.tzxtk > div.XVQ6o > div.Hiu4B.vx3Rq > time > a`);
                article.publishedAt = publishedAt ? publishedAt.innerText : "";
                // получение количества просмотров
                const views = document.querySelector(`#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:nth-child(${i}) > div > div.tzxtk > div.XVQ6o > div.VoloF.vx3Rq > div > div > span`);
                article.views = views ? +(views.innerText.replace(/\s/g, "")) : null;
                article.title &&
                    article.description &&
                    article.url &&
                    article.urlToImage &&
                    article.publishedAt &&
                    article.views &&
                    result.articles.push(article);
            }
            return result;
        });
        yield page.close();
        yield browser.close();
        return articles;
    }
    catch (e) {
        console.log(e);
        return {
            success: false,
            message: "Failed to get list of news",
        };
    }
});
exports.default = fetchNews;
