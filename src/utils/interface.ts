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
