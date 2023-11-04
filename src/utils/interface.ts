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

export interface User {
    id: number,
    username: string,
    email: string,
    password: string
}

export interface LoginResult {
    user: User[],
    token: string,
    success: boolean
}