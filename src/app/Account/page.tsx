'use client'

import { useState, useEffect, useContext } from "react"
import { logger } from "@/utils/logger"
import { GlobalContext } from "@/context"
import { useRouter } from "next/navigation"

const styles = {
    container: `flex flex-col items-center justify-center mt-20`,
    section: `grid grid-cols-1 sm:grid-cols-3 gap-20 mt-20`,
    gridItem: `flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 cursor-pointer`,
    h1: `text-4xl font-bold`,
    details: `flex flex-col mt-4 border border-gray-200 rounded-lg p-4`,
    h2: `text-xl font-bold`,
}

export default function AccoutPage() {
    const context = useContext(GlobalContext)
    if (context === null || undefined) {
        logger.error("No context")
        return <div className="flex flex-col items-center justify-center mt-20">
            No context provided
        </div>
    }

    const { loading, user, isAuth, favourites } = context

    const router = useRouter()

        return (
            <>
                { !loading && isAuth && favourites && favourites.favourites.length ? 
                    (
                        <div className={styles.container}>
                            <h1 className={styles.h1}>Welcome, {user.username}</h1>
                            <section className={styles.section}>
                                {/* Friends */}
                                <div className={styles.gridItem}>
                                    <h2 className={styles.h2}>Friends</h2>
                                    {/* Friends count */}
                                    {13}
                                </div>
                                {/* Discussions */}
                                <div className={styles.gridItem}>
                                    <h2 className={styles.h2}>Discussions</h2>
                                    {/* Discussions count */}
                                    {10}
                                </div>
                                {/* Favourites */}
                                <div className={styles.gridItem} onClick={() => router.push('/Favourites')}>
                                    <h2 className={styles.h2}>Favourites</h2>
                                    {/* Favourites count */}
                                    {favourites?.favourites.length}
                                </div>
                            </section>
                        </div>
                ) : ( 
                    <div className={styles.container}>Loading...</div>
                )
            }
            </>
        )
}