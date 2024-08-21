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
    [x: string]: any
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
    relationships: Relationship[]
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
    id: number;
    username: string;
    email: string;
    avatar: {
        id: number,
        imageUrl: string
    }
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

export interface Favourite {
    id: number;
    user_id: number;
    comic_id: string;
    manga_title: string;
}

export interface Favourites {
    favourites: Favourite[];
}

export interface userComment {
    user_id: number,
    chapter_id: string,
    comment: string,
}