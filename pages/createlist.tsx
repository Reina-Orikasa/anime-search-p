export default function CreateList({ shows }: any) {
  let showList = [];
  if (shows) {
    showList = shows.map((show: any) => {
      return (
        <div key={show.mal_id}>
          <div className="border-2 border-white rounded-xl p-4 space-y-2 h-full">
            <div className="flex justify-center align-middle">
              <img
                src={show.images.jpg.image_url}
                className="rounded-xl mb-4"
              ></img>
            </div>
            <h5 className="text-xl hover:underline font-bold">
              <a href={show.url} target="_blank">
                {show.title}
              </a>
            </h5>
            <p className="text-sm">{show.title_japanese}</p>
            <p className="text-sm">{show.title_english}</p>
            <p className="font-semibold">{show.members} members</p>
            <p className="font-semibold text-lg">⭐{show.score}</p>
          </div>
        </div>
      );
    });
  }

  return <>{showList}</>;
}
