import Trending from "@/components/Trending";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 sm:p-16">
			{/* Trending: Manga & Manhwa */}
			<Trending />
		</main>
	)
}
