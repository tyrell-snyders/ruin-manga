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

export type Mng = {
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
        state: "published";
        createdAt: string;
        updatedAt: string;
        version: number;
        latestUploadedChapter: string;
    };
    relationships: Relationship[]
}

export type SearchResults = {
    data: Mng[]
}

export type ChapterPages = {
    pages: string[];
    hash: string
}

export type Comment = {
    id: number;
    comment: string;
    userId: number;
    chapterId: string;
    upvotes: number;
    downvotes: number;
    createdAt: string;
    updatedAt?: string;
    ruin_users: CommentUser;
}

export type CommentUser = {
    id: number;
    username: string;
}

export type Comments = {
    comments: Comment[]
}

export type DecodeUser  = {
    id: number;
    email: string;
    usernmae: string;
    avatar: object
}