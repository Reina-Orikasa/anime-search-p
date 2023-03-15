import { GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import CreateList from "./createlist";

export default function search() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  function searchShows() {
    fetch(`https://api.jikan.moe/v4/anime?q=${search}&sfw=true`)
      .then((resp) => resp.json())
      .then((shows) => setSearchResult(shows.data));
  }

  console.log(searchResult.length);

  return (
    <div>
      <div className="navbar pl-12 font-bold space-x-4">
        <Link href="/">Home</Link>
        <Link href="/show" className="hover:underline">Current Airing Shows</Link>
        <Link href="/top">Top Shows</Link>
      </div>
      <div className="text-center px-24">
        <h1 className="text-5xl mb-8 font-bold">Search</h1>
        <div className="mb-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            className="p-2 bg-white rounded-xl text-black mr-2"
          />
          <button
            className="border-2 border-white p-2 rounded-xl"
            onClick={searchShows}
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {searchResult.length !== 0 ? (
            <CreateList shows={searchResult} />
          ) : (
            "-1"
          )}
        </div>
      </div>
    </div>
  );
}
