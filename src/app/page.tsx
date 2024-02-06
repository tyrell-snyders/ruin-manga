import Trending from "@/components/Trending";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 sm:p-16">
            {/* Trending: Manga & Manhwa */}
            {/* <NextUIProvider> */}
                <Trending />
            {/* </NextUIProvider> */}
        </main>
    );
}
