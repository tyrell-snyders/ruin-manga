export interface Dta {
    data: Data[],
}

export interface TrendingItem {
    data: Dta,
    message: string,
    success: boolean
}

export interface Relationship {
    id: string,
    type: string
}

export interface Data {
    attributes: {
        contentRating: string,
        description: {
            en: string
        },
        title: {
            en: string
        }
    },
    id: string,
    relationships: Relationship
}

export interface ArtData {
    data: {
        attributes: {
            filename: string,
            locale: string,
            version: number,
            volume: string,
            id: string
        },
        relationships: Relationship[],
        type: string
    }
}

export type User = {
    username: string;
    email: string;
}

export interface Users {
    users: User[],
    success: boolean
}

export interface LoginForm {
    username: string,
    pass: string
}

export interface RegisterForm {
    username: string,
    email: string,
    pass: string
}

export interface FavouritesData {
    userName: string,
    comicID: string,
    comicTitle: string
}