import { useState } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

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
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  let totalAnimeEntries = 0;
  let totalMangaEntries = 0;
  let animeData = {
    labels: [""],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: "",
      },
    ],
  };

  let mangaData = {
    labels: [""],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: "",
      },
    ],
  };
  if (searchResult) {
    totalAnimeEntries =
      searchResult?.statistics.anime.completed +
      searchResult?.statistics.anime.watching +
      searchResult?.statistics.anime.on_hold +
      searchResult?.statistics.anime.dropped +
      searchResult?.statistics.anime.plan_to_watch;

    totalMangaEntries =
      searchResult?.statistics.manga.reading +
      searchResult.statistics.manga.completed +
      searchResult?.statistics.manga.on_hold +
      searchResult?.statistics.manga.dropped +
      searchResult?.statistics.manga.plan_to_read;

    animeData = {
      labels: ["Total Shows: " + totalAnimeEntries],
      datasets: [
        {
          label: `Watching (${searchResult?.statistics.anime.watching}) (${(
            (searchResult?.statistics.anime.watching / totalAnimeEntries) *
            100
          ).toFixed(2)}%)`,
          data: [searchResult?.statistics.anime.watching],
          backgroundColor: "#818cf8",
        },
        {
          label: `Completed (${searchResult?.statistics.anime.completed}) (${(
            (searchResult?.statistics.anime.completed / totalAnimeEntries) *
            100
          ).toFixed(2)}%)`,
          data: [searchResult?.statistics.anime.completed],
          backgroundColor: "#34d399",
        },
        {
          label: `On hold (${searchResult?.statistics.anime.on_hold}) (${(
            (searchResult?.statistics.anime.on_hold / totalAnimeEntries) *
            100
          ).toFixed(2)}%)`,
          data: [searchResult?.statistics.anime.on_hold],
          backgroundColor: "#fbbf24",
        },
        {
          label: `Dropped (${searchResult?.statistics.anime.dropped}) (${(
            (searchResult?.statistics.anime.dropped / totalAnimeEntries) *
            100
          ).toFixed(2)}%)`,
          data: [searchResult?.statistics.anime.dropped],
          backgroundColor: "#f87171",
        },
        {
          label: `Plan to watch (${
            searchResult?.statistics.anime.plan_to_watch
          }) (${(
            (searchResult?.statistics.anime.plan_to_watch / totalAnimeEntries) *
            100
          ).toFixed(2)}%)`,
          data: [searchResult?.statistics.anime.plan_to_watch],
          backgroundColor: "#a3a3a3",
        },
      ],
    };

    mangaData = {
      labels: ["Total Series: " + totalMangaEntries],
      datasets: [
        {
          label: `Reading (${searchResult?.statistics.manga.reading}) (${(
            (searchResult?.statistics.manga.reading / totalMangaEntries) *
            100
          ).toFixed(2)}%)`,
          data: [searchResult?.statistics.manga.reading],
          backgroundColor: "#818cf8",
        },
        {
          label: `Completed (${searchResult?.statistics.manga.completed}) (${(
            (searchResult?.statistics.manga.completed / totalMangaEntries) *
            100
          ).toFixed(2)}%)`,
          data: [searchResult?.statistics.manga.completed],
          backgroundColor: "#34d399",
        },
        {
          label: `On hold (${searchResult?.statistics.manga.on_hold}) (${(
            (searchResult?.statistics.manga.on_hold / totalMangaEntries) *
            100
          ).toFixed(2)}%)`,
          data: [searchResult?.statistics.manga.on_hold],
          backgroundColor: "#fbbf24",
        },
        {
          label: `Dropped (${searchResult?.statistics.manga.dropped}) (${(
            (searchResult?.statistics.manga.dropped / totalMangaEntries) *
            100
          ).toFixed(2)}%)`,
          data: [searchResult?.statistics.manga.dropped],
          backgroundColor: "#f87171",
        },
        {
          label: `Plan to read (${
            searchResult?.statistics.manga.plan_to_read
          }) (${(
            (searchResult?.statistics.manga.plan_to_read / totalMangaEntries) *
            100
          ).toFixed(2)}%)`,
          data: [searchResult?.statistics.manga.plan_to_read],
          backgroundColor: "#a3a3a3",
        },
      ],
    };
  }

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Distribution of Status",
        color: "white",
        font: {
          size: 24,
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "white",
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "white",
        },
      },
    },
    indexAxis: "y" as const,
  };

  return (
    <div className="text-center px-2 md:px-10 text-slate-200">
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
              <img src="/puff.svg" alt="loading" className="my-5" />
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
                  className="rounded-full md:mr-7"
                />
                <div className="space-y-2 mt-4">
                  <a
                    className="text-4xl font-bold hover:underline"
                    href={searchResult.url}
                    target="_blank"
                  >
                    {searchResult.username}
                  </a>
                  <p>Location: {searchResult.location}</p>
                  <p>
                    Joined on{" "}
                    <span className="font-semibold">
                      {new Date(searchResult.joined).toLocaleDateString(
                        undefined,
                        dateOptions
                      )}
                    </span>
                  </p>
                  <p>
                    Last online:{" "}
                    <span className="font-semibold">
                      {new Date(searchResult.last_online).toLocaleDateString(
                        undefined,
                        dateOptions
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <hr className="my-4" />

              <div className="my-6">
                <p className="text-3xl font-bold my-8">
                  Anime | Manga Statistics
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <h2 className="font-semibold text-4xl">Anime</h2>
                    <p>
                      {searchResult.statistics.anime.days_watched} days
                      wasted...
                    </p>
                    <p>
                      {searchResult.statistics.anime.episodes_watched} episodes
                      watched
                    </p>
                  </div>

                  <div>
                    <h2 className="font-semibold text-4xl">Manga</h2>
                    <p>
                      {searchResult.statistics.manga.days_read} days wasted...
                    </p>
                    <p>
                      reading {searchResult.statistics.manga.chapters_read} chapters
                    </p>
                    <p>
                      finishing {searchResult.statistics.manga.volumes_read} volumes
                    </p>
                  </div>
                </div>

                <div className="relative md:w-[70vh] md:h-[40vh] flex justify-center align-middle m-auto gap-7">
                  <Bar options={options} data={animeData} />

                  <Bar options={options} data={mangaData} />
                </div>
              </div>

              <hr className="my-4" />
              <div className="my-6 h-full">
                <h2 className="font-bold text-3xl my-6">
                  Recent Anime Updates
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {searchResult.updates.anime.map((show) => {
                    const updateDate = new Date(show.date);
                    return (
                      <div
                        className="flex justify-center align-middle"
                        key={show.entry.title}
                      >
                        <div>
                          <div className="flex justify-center align-middle">
                            <img
                              src={show.entry?.images?.webp?.image_url}
                              alt={show.entry.title + " image"}
                              className="rounded-xl h-[256px] w-auto mb-4"
                            />
                          </div>

                          <a
                            className="text-2xl font-semibold hover:underline mb-2"
                            href={show.entry.url}
                            target="_blank"
                          >
                            {show.entry.title} ({show.status === 'Watching -' ? 'Watching' : show.status})
                          </a>
                          <p>
                            Last updated on{" "}
                            <span className="font-semibold">
                              {updateDate.toLocaleDateString(
                                undefined,
                                dateOptions
                              )}
                            </span>
                          </p>
                          <p>
                            {show.episodes_seen === null
                              ? `No episodes watched yet...`
                              : `${show.episodes_seen}/${show.episodes_total} episodes`}
                          </p>
                          <p className="font-semibold">
                            {show.score === 0
                              ? "no score"
                              : `Score: ${show.score}`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr className="my-4" />

              <div>
                <h2 className="font-semibold text-3xl my-4">Anime Favorites</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-1 space-y-1 md:space-y-5">
                  {searchResult.favorites.anime.map((show) => {
                    return (
                      <div
                        key={show.title}
                        className="flex justify-center align-middle my-2"
                      >
                        <div>
                          <div className="flex justify-center align-middle">
                            <img
                              src={show?.images?.webp?.image_url}
                              className="rounded-lg w-2/3 h-full"
                            />
                          </div>
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
