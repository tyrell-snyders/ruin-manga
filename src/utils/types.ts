import { Relationship } from "./interface";

export type Manga = {
    data: {
        id: string;
        type: string;
        attributes: {
            title: {
                en: string;
            };
            description: {
                en: string;
            };
            originalLanguage: string;
            status: string;
            year: string;
            contentRating: string;
            tags: [];
            state: "published";
            createdAt: string;
            updatedAt: string;
            version: number;
            latestUploadedChapter: string;
        };
        relationships: Relationship[]
    }
}

export type Volume = {
    result: string;
    volumes: object;
}

export type Chapter = {
    chapter: string;
    count: number;
    id: string;
    others: Array<string>;
}