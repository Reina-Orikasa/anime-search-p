import React from "react";
import { useShowStore } from "../components/store";

export default function yourlist() {
  const shows = useShowStore((state) => state.shows);

  let showDataDisplay = shows.map((show) => {
    const handleIncrement = () => {
      if (show.episodes > show.episodes_watched || show.episodes === null) {
        useShowStore.setState((state) => {
          const updatedShows = state.shows.map((s) => {
            if (s.mal_id === show.mal_id) {
              return {
                ...s,
                episodes_watched: s.episodes_watched + 1,
              };
            }
            return s;
          });
          return { shows: updatedShows };
        });
      }
    };

    const handleDecrement = () => {
      if (show.episodes_watched > 0) {
        useShowStore.setState((state) => {
          const updatedShows = state.shows.map((s) => {
            if (s.mal_id === show.mal_id) {
              return {
                ...s,
                episodes_watched: s.episodes_watched - 1,
              };
            }
            return s;
          });
          return { shows: updatedShows };
        });
      }
    };

    const handleDelete = () => {
      useShowStore.setState((state) => {
        const updatedShows = state.shows.filter(
          (s) => s.mal_id !== show.mal_id
        );
        return { shows: updatedShows };
      });
    };

    return (
      <React.Fragment key={show.mal_id}>
        <tbody key={show.mal_id}>
          <tr className="text-center">
            <td className="border border-slate-500 px-2">
              {show.title_english ? (
                <a href={show.url} target="_blank" className="hover:underline">
                  {show.title_english}
                </a>
              ) : (
                <a href={show.url} target="_blank" className="hover:underline">
                  {show.title}
                </a>
              )}
            </td>
            <td className="border border-slate-500">{show.episodes_watched}</td>
            <td className="border border-slate-500">{show.episodes}</td>
            <td className="px-2 text-lg border border-slate-500 space-x-2">
              <button onClick={handleIncrement}>Add</button>
              <button onClick={handleDecrement}>Subtract</button>
              <button onClick={handleDelete}>Delete</button>
            </td>
          </tr>
        </tbody>
      </React.Fragment>
    );
  });

  return (
    <div className="px-12">
      <table className="table-auto border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-500 px-4">Name</th>
            <th className="border border-slate-500 px-4">Episodes Watched</th>
            <th className="border border-slate-500 px-4">Episodes</th>
            <th className="border border-slate-500 px-4">Add/subtract</th>
          </tr>
        </thead>
        {showDataDisplay}
      </table>
    </div>
  );
}
