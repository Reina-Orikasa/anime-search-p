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
    manga: [
      {
        images: Image;
        mal_id: number;
        start_year: number;
        title: string;
        type: string;
        url: string;
      }
    ];
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

  console.log(searchResult?.favorites.manga);

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
                  className="rounded-full md:mr-7 pr-1"
                />
                <div className="space-y-2 mt-4">
                  <a
                    className="text-3xl md:text-4xl font-bold hover:underline"
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
                    <h2 className="font-semibold text-2xl md:text-4xl mb-4">
                      Anime
                    </h2>
                    <p>
                      <span className="font-semibold text-lg">
                        {searchResult.statistics.anime.days_watched} days
                      </span>{" "}
                      wasted...
                    </p>
                    <p>
                      watching{" "}
                      <span className="font-semibold text-lg">
                        {searchResult.statistics.anime.episodes_watched}{" "}
                        episodes
                      </span>{" "}
                    </p>
                    <p>
                      finishing{" "}
                      <span className="font-semibold text-lg">
                        {searchResult.statistics.anime.completed} series.
                      </span>{" "}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-semibold text-2xl md:text-4xl mb-4">
                      Manga
                    </h2>
                    <p>
                      <span className="font-semibold text-lg">
                        {searchResult.statistics.manga.days_read} days {" "}
                      </span>
                      wasted...
                    </p>
                    <p>
                      reading {" "}
                      <span className="font-semibold text-lg">
                        {searchResult.statistics.manga.chapters_read} chapters
                      </span>
                    </p>
                    <p>
                      finishing {" "}
                      <span className="font-semibold text-lg">
                        {searchResult.statistics.manga.volumes_read} volumes
                      </span>
                    </p>
                  </div>
                </div>

                <div className="relative md:w-[70vh] md:h-[40vh] md:flex md:justify-center md:align-middle m-auto md:gap-7">
                  <Bar options={options} data={animeData} />

                  <Bar options={options} data={mangaData} />
                </div>
              </div>

              <hr className="my-4" />
              <div className="my-6 h-full">
                <h2 className="font-bold text-3xl my-8">Recent Updates</h2>
                <div className="grid md:grid-cols-2 gap-2">
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
                                className="rounded-xl h-[150px] md:h-[250px] w-auto mb-4"
                              />
                            </div>

                            <a
                              className="text-lg md:text-xl font-bold hover:underline mb-4"
                              href={show.entry.url}
                              target="_blank"
                            >
                              {show.entry.title} (
                              {show.status === "Watching -"
                                ? "Watching"
                                : show.status}
                              )
                            </a>
                            <p className="font-semibold">
                              {updateDate.toLocaleDateString(
                                undefined,
                                dateOptions
                              )}
                            </p>
                            <p>
                              {show.episodes_seen === null ? (
                                <span className="font-light">
                                  No episodes yet...
                                </span>
                              ) : (
                                <span className="font-semibold">
                                  {show.episodes_seen}/{show.episodes_total}{" "}
                                  episodes
                                </span>
                              )}
                            </p>
                            <p className="font-semibold">
                              {show.score === 0 ? (
                                <span className="font-light">no score</span>
                              ) : (
                                <span className="font-semibold">
                                  Score: {show.score}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {searchResult.updates.manga.map((series) => {
                      const updateDate = new Date(series.date);
                      return (
                        <div
                          className="flex justify-center align-middle"
                          key={series.entry.title}
                        >
                          <div>
                            <div className="flex justify-center align-middle">
                              <img
                                src={series.entry.images.jpg.image_url}
                                className="rounded-xl h-[150px] md:h-[250px] w-auto mb-4"
                              />
                            </div>
                            <a
                              className="text-lg md:text-xl font-bold hover:underline"
                              href={series.entry.url}
                              target="_blank"
                            >
                              {series.entry.title} ({series.status})
                            </a>
                            <p className="font-semibold">
                              {updateDate.toLocaleDateString(
                                undefined,
                                dateOptions
                              )}
                            </p>

                            <p>
                              {series.chapters_read === null ? (
                                <span className="font-light">
                                  No chapters yet...
                                </span>
                              ) : (
                                <span className="font-semibold">
                                  {series.chapters_read}/{series.chapters_total}{" "}
                                  chapters
                                </span>
                              )}
                            </p>

                            <p className="font-semibold">
                              {series.score === 0 ? (
                                <span className="font-light">no score</span>
                              ) : (
                                <span className="font-semibold">
                                  Score: {series.score}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <div>
                <h2 className="font-semibold text-3xl my-8">Anime Favorites</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {searchResult.favorites.anime.map((show) => {
                    return (
                      <div
                        key={show.title}
                        className="flex justify-center align-middle my-4"
                      >
                        <div>
                          <div className="flex justify-center align-middle">
                            <img
                              src={show?.images?.webp?.image_url}
                              className="rounded-lg h-[200px] md:h-[225px] w-auto mb-3"
                            />
                          </div>
                          <a
                            className="text-lg md:text-xl font-bold hover:underline"
                            href={show.url}
                            target="_blank"
                          >
                            {show.title}{" "}
                          </a>
                          <p className="font-light">
                            ({show.start_year}/{show.type})
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <hr className="my-4" />
                <h2 className="font-semibold text-3xl my-8">Manga Favorites</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {searchResult.favorites.manga.map((series) => {
                    return (
                      <div
                        key={series.mal_id}
                        className="flex justify-center align-middle my-4"
                      >
                        <div>
                          <div className="flex justify-center align-middle">
                            <img
                              src={series?.images?.webp?.image_url}
                              className="rounded-lg h-[200px] md:h-[225px] w-auto mb-3"
                            />
                          </div>
                          <a
                            className="text-lg md:text-xl font-bold hover:underline"
                            href={series.url}
                            target="_blank"
                          >
                            {series.title}{" "}
                          </a>
                          <p className="font-light">
                            ({series.start_year}/{series.type})
                          </p>
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
