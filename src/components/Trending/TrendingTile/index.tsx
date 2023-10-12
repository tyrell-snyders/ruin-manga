'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TrendingTile(props: any) {
    const router = useRouter();
    const { item } = props;

    const [data, setData] = useState<any[]>([]);

    const toArray = () => {
        if (item) {
            const itemArray: any[] = Object.values(item);
            setData((prevData) => [...prevData, ...itemArray]);
        }
    }

    useEffect(() => {
        toArray();
    }, [item]);

    console.log(data)

    return (
        <>
            <div onClick={() => router.push('/manga')}>
                {
                    data && data.length ?
                    data.map((itm, i) => (
                        <div key={i} >
                            {/* <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52">
                                <img
                                    src={item.image} alt={item.slug}
                                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                                />
                            </div> */}
                            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                                <h3 className='mb-2 text-gray-400 text-sm'>{itm?.attributes?.title?.en}</h3>
                            </div>
                        </div>
                    )) : (
                        <h1>...</h1>
                    )
                }
            </div>
        </>
    );
}