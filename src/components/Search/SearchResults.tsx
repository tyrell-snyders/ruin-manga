'use client'

import { SearchResults } from "@/utils/types"
import handleSrch from "."
import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import { logger } from '@/utils/logger'

const styles = {
    grid: 'mt-8 grid gap-6 lg:grid-cols-4 sm:gap-4 md:grid-cols-2'
}

export default function SrchResults(props: {srchResults: SearchResults}) {
    //hooks


    console.log(props.srchResults)
    
    return (
        <div>
            <h2>Search Results</h2>
            <div className={styles.grid}>

            </div>
        </div>
    )
}