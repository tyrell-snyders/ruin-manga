'use client'

import { useEffect, useState, useContext } from 'react'
import { logger } from '@/utils/logger'
import { GlobalContext } from '@/context'
import SrchResults from '@/components/Search/SearchResults'
import handleSrch from '@/components/Search'
import { SearchResults } from "@/utils/types"
import { searchFormControl } from '@/utils/formControls'
import InputComponent from '@/components/FormElements'


const styles = {
    container: 'flex flex-col justify-center items-center pt-24 pb-0 mt-24 mr-auto xl:px-5 lg:flex-row',
    srcRes: `flex flex-col justify-center items-center pt-2 pb-0 mt-2 mr-auto xl:px-5 lg:flex-row`,
    grid: 'mt-8 grid gap-6 lg:grid-cols-4 sm:gap-4 md:grid-cols-2',
    button: `disabled:opacity-50 inline-flex w-1/5 items-center justify-center bg-purple-600 
            px-2 py-2 text-lg text-white transition-all duration-200 
            ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-3xl`
}


export default function Search() {
    //context
    const context = useContext(GlobalContext)

    //useState
    const [searchResult, setSearchResult] = useState<SearchResults>()
    const [title, setTitle] = useState('')
    const [coverArt, setCoverArt] = useState<string[]>([''])

    if (context === (null || undefined)) {
        logger.error("No context")
        return null;
    }

    const isValid = () => {
        return title != ''
    }

    //Handle the search
    const handleSearch = async() => {
        try {
            const searchData = await handleSrch(title)
            if (searchData && typeof searchData === 'object') {
                //Store the data in a const
                const srchData = searchData
                //Set the Search results
                setSearchResult(srchData)
            } else 
                logger.error(`Could not find any manga with the title ${title}.`)
        } catch(e) {
            if (e instanceof Error) {
                logger.error(`${e.message}`)
            }
        }
    }

    //Map through the results object and filter it by the realtionship type and id
    const handleRelationship = () => {
        // Extract IDs with type 'cover_art'
        const coverId = searchResult?.data
            ?.map((r) => r.relationships)
            .flat()
            .filter((relationship) => relationship.type === 'cover_art')
            .map((relationship) => relationship.id);

        return coverId as string[];
    }

    //Set the cover art and call the search function
    useEffect(() => {
        setCoverArt(handleRelationship() as string[])
        async function getSrc() {
            await handleSearch()
        }
        getSrc()
    }, [title])

    return (
        <section className='max-h-screen'>
            <div className={styles.container}>
                <div className="w-3/6 mr-0 mb-0 ml-0 relative space-y-8 flex flex-row space-x-2 items-center justify-center">
                    {
                        searchFormControl.map(controlItem => 
                            <InputComponent 
                                key={controlItem.id}
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        )
                    }
                    <button 
                        disabled={!isValid()} 
                        onClick={handleSearch}
                        className={styles.button}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className={styles.srcRes}>
                <div className="bg-gray-700 rounded-lg mt-20 mb-10 sm:py-16 border border-gray-200">
                    <div className="mx-4 my-10 px-4 sm:px-6">
                        <SrchResults coverArt={coverArt} coverId={""} srchResults={searchResult as SearchResults}/>
                    </div>
                </div>
            </div>
        </section>
    )
}