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

export default function CreateList(props: Shows) {
  let showList: object[] = []
  if (props) {
    showList = props.shows?.map(
      ({
        mal_id,
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
        synopsis
      }) => {
        return (
          <div key={mal_id}>
            <div className="border-2 border-white rounded-xl p-4 space-y-2 h-full">
              <div className="flex justify-center align-middle">
                <img
                  src={images.jpg.image_url}
                  className="rounded-xl mb-4"
                ></img>
              </div>
              {title_english ? (
                <h5 className="text-xl hover:underline font-bold">
                  <a href={url} target="_blank">
                    {title_english}
                  </a>
                </h5>
              ) : (
                <h5 className="text-xl hover:underline font-bold">
                  <a href={url} target="_blank">
                    {title}
                  </a>
                </h5>
              )}
              <p className="font-semibold">{members} members</p>
              {status === 'Finished Airing' ? (
                <p className="font-semibold">Aired {season} {year}</p>
              ) : (
                <p className="font-semibold">Currently airing</p>
              )}
              <p>{episodes} episodes</p>
              <p className="font-semibold text-lg">⭐{score}</p>
              <hr className="pt-4" />
              <p className=" text-md">Alternative Names</p>
              <div className="pb-2">
                <p className="text-sm">{title_japanese}</p>
                {title_english ? "" : <p>'English title same'</p>}
              </div>
              <hr className="pb-4" />
              <p className="overflow-y-auto h-48 mb-4 px-4">{synopsis}</p>
            </div>
          </div>
        );
      }
    );
  }

  return <>{showList}</>;
}
