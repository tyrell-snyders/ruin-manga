export interface Dta {
    data: Array<object>,
}

export interface TrendingItem {
    data: Dta,
    message: string,
    success: boolean
}
