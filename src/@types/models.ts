export interface IHttpStatusesType {
    OK_200: number,
    NON_AUTHORITATIVE_INFORMATION_203: number,
    INTERNAL_SERVER_ERROR_500: number,
    BAD_GATEWAY_502: number,
}

export interface IWeather {
    success: boolean,
    temp: number,
    icon: string,
    condition: string,
}

export interface INews {
    success: boolean,
    articles: IArticle[],
}

export interface IArticle {
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    views: number | null,
}

export interface IError {
    success: boolean,
    message: string,
}
