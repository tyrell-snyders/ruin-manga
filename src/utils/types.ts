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