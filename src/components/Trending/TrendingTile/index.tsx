'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TrendingTile(props: any) {
    const router = useRouter();
    const { item } = props;

    console.log(item?.data)

    return (
        <>
            <div onClick={() => router.push('/manga')}>
                {/* <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52">
                    <img
                        src={item.image} alt={item.slug}
                        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                    />
                </div> */}
                <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                    <h3 className='mb-2 text-gray-400 text-sm'>Hi</h3>
                </div>
            </div>
        </>
    );
}