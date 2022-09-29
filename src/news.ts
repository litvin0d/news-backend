import puppeteer, { Browser, Page } from "puppeteer";
import userAgent from "user-agents";

import { IArticle, IError, INews } from "./@types/models";

const fetchNews = async () => {
    try {
        // запуск браузера
        const browser: Browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ],
            userDataDir: "./dist/cache",
        });

        // создание новой страницы
        const page: Page = await browser.newPage();
        // рандомизация user-agent во избежание блокировки доступа
        await page.setUserAgent(userAgent.toString() as string);
        // переход на страницу по url
        await page.goto("https://74.ru/text/", { waitUntil: "networkidle2" });

        await page.waitForSelector("#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:last-child");

        // получение новостных статей
        const articles: INews = await page.evaluate(() => {
            // подсчет количества статей
            let totalArticlesNumber: number = Array.from(document.querySelectorAll("#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article")).length;

            // возвращаемый объект
            let result: INews = {
                success: true,
                articles: [],
            };

            // перебор всех статей
            for (let i: number = 1; i <= totalArticlesNumber; i++) {
                // объект статьи
                let article: IArticle = {
                    title: "",
                    description: "",
                    url: "",
                    urlToImage: "",
                    publishedAt: "",
                    views: null,
                };

                // получение заголовка статьи
                const title: HTMLAnchorElement | null = document.querySelector(`#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:nth-child(${i}) > div > div.VC1Fb > h2 > a`);
                article.title = title ? title.innerText : "";

                // получение описания статьи
                const description: HTMLAnchorElement | null = document.querySelector(`#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:nth-child(${i}) > div > div.VC1Fb > div > a`);
                article.description = description ? description.innerText : "";

                // получение ссылки на статью
                article.url = title ? title.href : "";

                // получение ссылки на изображение
                const urlToImage: HTMLImageElement | null = document.querySelector(`#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:nth-child(${i}) > a > picture > img`);
                article.urlToImage = urlToImage ? urlToImage.src : "";

                // получение даты публикации
                const publishedAt: HTMLAnchorElement | null = document.querySelector(`#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:nth-child(${i}) > div > div.tzxtk > div.XVQ6o > div.Hiu4B.vx3Rq > time > a`);
                article.publishedAt = publishedAt ? publishedAt.innerText : "";

                // получение количества просмотров
                const views: HTMLSpanElement | null = document.querySelector(`#app > div.global-wrapper > div.app-content > div > div > div.inner-columns-wrapper > div > div.central-column-container > div > div.hkxta > article:nth-child(${i}) > div > div.tzxtk > div.XVQ6o > div.VoloF.vx3Rq > div > div > span`);
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

        await page.close();
        await browser.close();

        return articles;
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: "Failed to get list of news",
        } as IError;
    }
};

export default fetchNews;
