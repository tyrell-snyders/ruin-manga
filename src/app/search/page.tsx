'use client'

import { useEffect, useState, useContext } from 'react'
import { logger } from '@/utils/logger'
import { GlobalContext } from '@/context'


const styles = {
    container: 'flex flex-col justify-center items-center pt-24 pb-0 mt-24 mr-auto xl:px-5 lg:flex-row',
    grid: 'mt-8 grid gap-6 lg:grid-cols-4 sm:gap-4 md:grid-cols-2'
}

export default function Search() {
    //context
    const context = useContext(GlobalContext)

    //useState
    const [searchResult, setSearchResult] = useState([])

    if (context === (null || undefined)) {
        logger.error("No context")
        return null;
    }

    const { coverArt, setcoverArt } = context

    //Handle the search
    const handleSearch = async() => {

    }

    console.log(coverArt)



    return (
        <section className='max-h-screen'>
            <div className={styles.container}>
                <div className="bg-gray-700 rounded-lg mt-20 mb-10 sm:py-16 border border-gray-200">
                    <div className="mx-4 my-10 px-4 sm:px-6">
                        <h1>Results</h1>
                        <div className={styles.grid}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}