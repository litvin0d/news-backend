# News API

---

Данный сервис парсит список новостей с сайта [74.ru](https://74.ru/text) и обрабатывает данные и по GET-запросу на
`/news` возвращает массив объектов с информацией каждой статье.

Так же News API по GET-запросу на `/weather` возвращает объект с информацией о текущей погоде в Челябинске. Данные
берутся из Yandex.Weather API.

---

### Технологии:

* **TypeScript**
* **Express**
* **Puppeteer**
* **Axios**
* User-Agents
* Nodemon
* Dotenv

---

### Примеры возвращаемых объектов:

* **/news**

```
{
  "success": true,
  "articles": [
    {
      "title": "В Челябинске отравление годовалой девочки наркотиками вылилось в уголовное дело",
      "description": "Ребенка выписали из больницы и вернули матери",
      "url": "https://74.ru/text/incidents/2022/09/29/71695433/",
      "urlToImage": "https://cdn.iportal.ru/news/2020/99/preview/76de93f6d3f0e847e2d6ed294c899e9a09714682_720_405_c.jpg",
      "publishedAt": "29 СЕНТЯБРЯ 2022, 16:00",
      "views": 165
    },
    {
      "title": "VK будет искать внутри соцсети новых музыкантов и раскручивать их",
      "description": "Новая структура получила название VK Records",
      "url": "https://74.ru/text/culture/2022/09/29/71695706/",
      "urlToImage": "https://cdn.iportal.ru/news/2015/99/preview/28def6ae21a27805ff34a32205af0bf20d39a0f6_720_405_c.jpg",
      "publishedAt": "29 СЕНТЯБРЯ 2022, 15:16",
      "views": 10
    },
    {
      "title": "В Челябинске врачи пересадили почку 62-летней женщины ее дочери",
      "description": "Трансплантация этого органа прошла в областной больнице впервые с начала пандемии",
      "url": "https://74.ru/text/health/2022/09/29/71695439/",
      "urlToImage": "https://cdn.iportal.ru/news/2015/99/preview/1b523ae55633778ffbe4381f5fcda165099d6f79_720_405_c.jpg",
      "publishedAt": "29 СЕНТЯБРЯ 2022, 15:10",
      "views": 974
    },
}
```

* **/weather**

``` 
{
  "success": true,
  "temp": 3,
  "icon": "bkn_d",
  "condition": "cloudy"
}
```