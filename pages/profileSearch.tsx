import { useState } from "react";
interface Image {
  jpg: {
    image_url: string;
  };
  webp: {
    image_url: string;
  };
}
interface UserI {
  about: string;
  favorites: {
    anime: [
      {
        start_year: number;
        title: string;
        type: string;
        url: string;
        images: Image;
      }
    ];
    characters: [];
    manga: [];
    people: [];
  };
  images: Image;
  joined: string;
  last_online: string;
  location: string;
  statistics: {
    anime: {
      completed: number;
      days_watched: number;
      dropped: number;
      episodes_watched: number;
      mean_score: number;
      on_hold: number;
      plan_to_watch: number;
      rewatched: number;
      total_entries: number;
      watching: number;
    };
    manga: {
      chapters_read: number;
      completed: number;
      days_read: number;
      dropped: number;
      mean_score: number;
      on_hold: number;
      plan_to_read: number;
      reading: number;
      reread: number;
      total_entries: number;
      volumes_read: number;
    };
  };
  updates: {
    anime: [
      {
        date: number;
        entry: {
          mal_id: number;
          url: string;
          title: string;
          images: Image;
        };
        episodes_seen: number;
        episodes_total: number;
        score: number;
        status: string;
      }
    ];
    manga: [
      {
        chapters_read: number;
        chapters_total: number;
        date: string;
        entry: {
          images: Image;
          title: string;
          url: string;
        };
        score: number;
        status: string;
      }
    ];
  };
  url: string;
  username: string;
}

export default function profileSearch() {
  let [searchDone, setSearchDone] = useState(true);
  const [search, setSearch] = useState("");
  let [searchResult, setSearchResult] = useState<UserI>();

  function searchProfile() {
    if (search === "") {
      return null;
    }
    setSearchDone(!searchDone);
    fetch(`https://api.jikan.moe/v4/users/${search}/full`)
      .then((resp) => resp.json())
      .then((user) => setSearchResult(user.data))
      .finally(() => setSearchDone(true));

    if (!searchResult) {
      setSearchDone(!searchDone);
    }
  }
  console.log(searchResult);

  return (
    <div className="text-center px-6 md:px-24">
      <h1 className="text-4xl md:text-5xl mb-8 font-bold">Profile Search</h1>
      <div className="mb-2">
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          className="p-2 bg-white rounded-xl text-black mr-2"
        />
        <button
          className="border-2 border-white p-2 rounded-xl font-semibold hover:bg-white hover:text-black"
          onClick={searchProfile}
        >
          Search
        </button>

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

        <div className="border-2 border-white p-4 mt-4 rounded-xl">
          {searchResult && searchDone ? (
            <div>
              <div className="flex justify-center align-middle gap-2">
                <img
                  src={searchResult.images.jpg.image_url}
                  className="rounded-xl "
                />
                <div>
                  <a
                    className="text-3xl font-bold hover:underline"
                    href={searchResult.url}
                  >
                    {searchResult.username}
                  </a>
                  <p>
                    Mean Anime Score: {searchResult.statistics.anime.mean_score}
                  </p>
                </div>
              </div>

              {/* <a className="text-3xl font-bold" href={searchResult.url}>{searchResult.username}</a>
              <div>
                Mean Anime Score:{searchResult.statistics.anime.mean_score}
              </div> */}

              <div className="my-4">
                <h2 className="font-bold text-3xl">Recent Updates</h2>
                <div className="grid grid-cols-3">
                  {searchResult.updates.anime.map((show) => {
                    return (
                      <div
                        className="flex justify-center align-middle"
                        key={show.entry.title}
                      >
                        <div>
                          <img
                            src={show.entry?.images?.webp?.image_url}
                            alt={show.entry.title + " image"}
                            className="rounded-xl w-1/2 h-auto"
                          />
                          <p className="text-xl font-semibold">{show.date}</p>
                          <p>{show.entry.title}</p>
                          <p>
                            {show.episodes_seen}/{show.episodes_total}
                          </p>
                          <p>{show.score}</p>
                          <p>{show.status}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-3xl my-4">Favorites</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-1 space-y-1 md:space-y-5">
                  {searchResult.favorites.anime.map((show) => {
                    return (
                      <div
                        key={show.title}
                        className="flex justify-center align-middle my-2"
                      >
                        <div>
                          <img
                            src={show?.images?.webp?.image_url}
                            className="rounded-lg"
                          />
                          <a
                            className="font-semibold text-lg hover:underline"
                            href={show.url}
                            target="_blank"
                          >
                            {show.title} ({show.start_year})
                          </a>
                          <p>{show.type}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            "search for a profile"
          )}
        </div>
      </div>
    </div>
  );
}
