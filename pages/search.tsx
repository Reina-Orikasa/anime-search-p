import { useState } from "react";
import CreateList from "./createlist";

export default function search() {
  let [searchDone, setSearchDone] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchType, setSearchType] = useState("anime");
  function searchShows() {
    if (search === "") {
      return null;
    }
    setSearchDone(!searchDone);
    fetch(`https://api.jikan.moe/v4/${searchType}?q=${search}&sfw=true`)
      .then((resp) => resp.json())
      .then((shows) => setSearchResult(shows.data))
      .finally(() => setSearchDone(true));

    if (searchResult.length !== 0) {
      setSearchDone(!searchDone);
    }
  }

  function updateSearchType(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchType(e.target.value);
  }

  return (
    <div>
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
          <div className="my-4">
            <input
              type="radio"
              value="anime"
              name="search"
              defaultChecked={true}
              onChange={(e) => updateSearchType(e)}
            />{" "}
            Anime
            <input
              type="radio"
              value="manga"
              name="search"
              onChange={(e) => updateSearchType(e)}
              className="ml-4"
            />{" "}
            Manga
          </div>
        </div>

        {!searchDone ? (
          <div className="flex justify-center align-middle">
            <>
              <img src="/puff.svg" alt="loading" />
              <p>loading...</p>
            </>
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {searchResult.length !== 0 ? <CreateList shows={searchResult} /> : ""}
        </div>
      </div>
    </div>
  );
}
