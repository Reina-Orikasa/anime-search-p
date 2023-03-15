import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import CreateList from "./createlist";

export default function Top({
  topShows,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const topShowArray = topShows.data;
  return (
    <div>
      <div className="navbar pl-12 font-bold space-x-4">
        <Link href="/">Home</Link>
        <Link href="/show">Current Airing Shows</Link>
        <Link href="/search">Search</Link>
      </div>
      <div className="text-center px-24">
        <h1 className="text-5xl mb-8 font-bold">Top 12 Ranking on MAL</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          <CreateList shows={topShowArray} />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=12");
  const topShows = await res.json();
  return {
    props: { topShows },
    revalidate: 10,
  };
};