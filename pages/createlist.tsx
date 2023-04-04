import { useShowStore } from "../components/store";
import Image from "next/image";

interface Shows {
  shows: Datum[];
}

interface Datum {
  mal_id: number;
  url: string;
  images: { [key: string]: Image };
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: Demographic[];
  licensors: Demographic[];
  studios: Demographic[];
  genres: Demographic[];
  explicit_genres: Demographic[];
  themes: Demographic[];
  demographics: Demographic[];
}

interface Aired {
  from: string;
  to: string;
  string: string;
  prop: Prop;
}

interface Prop {
  from: From;
  to: From;
  string: string;
}

interface From {
  day: number;
  month: number;
  year: number;
}

interface Broadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

interface Demographic {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Title {
  type: string;
  title: string;
}

interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
}

interface showDataI {
  mal_id: number;
  url: string;
  episodes: number;
  title_english: string;
  title: string;
  episodes_watched: number;
}

export default function CreateList(props: Shows) {
  function handleAddShow(showInfo: showDataI[]) {
    addShow(showInfo);
  }
  const addShow = useShowStore((state) => state.addShow);
  const shows = useShowStore((state) => state.shows);
  const episodes_watched = 0;

  let showList: object[] = [];
  if (props) {
    showList = props.shows?.map(
      ({
        mal_id,
        aired,
        images,
        episodes,
        url,
        title,
        title_japanese,
        title_english,
        members,
        year,
        score,
        season,
        status,
        synopsis,
        type,
      }) => {
        return (
          <div key={mal_id}>
            <div className="bg-slate-200 text-black rounded-lg p-4 space-y-2 h-full">
              <div className="flex justify-center align-middle">
                <Image
                  src={images.jpg.image_url}
                  alt={title + " image"}
                  className="rounded-xl mb-4"
                  height={318}
                  width={225}
                ></Image>
              </div>
              {title_english ? (
                <p className="text-xl hover:underline font-bold">
                  <a href={url} target="_blank">
                    {title_english}
                  </a>
                </p>
              ) : (
                <p className="text-xl hover:underline font-bold">
                  <a href={url} target="_blank">
                    {title}
                  </a>
                </p>
              )}
              <p className="font-semibold text-lg">{members} members</p>

              {status.includes("Finished") ? (
                <div>
                  {type === "Manga" ||
                  type === "One-shot" ||
                  type === "Light Novel" ||
                  type === "Novel" ||
                  type === "Doujin" ||
                  type === "Manhua" ||
                  type === "Manhwa" ? (
                    <p className="font-semibold">Finished Publishing</p>
                  ) : (
                    <p className="font-semibold">
                      Aired {season} {year} ({aired.string})
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  {type === "Manga" ? (
                    <p className="font-semibold">Currently Publishing</p>
                  ) : (
                    <p className="font-semibold">Currently Airing</p>
                  )}
                </div>
              )}

              {type !== "Manga" && type !== "One-shot" ? (
                <p>
                  {episodes === null
                    ? "unknown episodes"
                    : episodes + " episodes"}{" "}
                </p>
              ) : (
                ""
              )}

              <p className="font-semibold text-lg">⭐{score}</p>
              <hr className="pt-4" />
              <p className=" text-md">Alternative Names</p>

              <div className="pb-2">
                <p className="text-sm">{title_japanese}</p>
              </div>
              {shows.some((show) => show.mal_id === mal_id) ? (
                <p className="text-lg">Added to list</p>
              ) : (
                <button
                  className="border-2 border-black rounded-lg p-2"
                  onClick={() =>
                    handleAddShow([
                      {
                        mal_id,
                        url,
                        episodes,
                        title,
                        title_english,
                        episodes_watched,
                      },
                    ])
                  }
                >
                  Add
                </button>
              )}
              <hr className="mb-4 p-1 bg-black" />
              <p className="overflow-y-auto h-48 mb-4 px-4">{synopsis}</p>
            </div>
          </div>
        );
      }
    );
  }

  return <>{showList}</>;
}
