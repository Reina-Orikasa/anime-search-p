import { InferGetStaticPropsType } from "next";
import { GetStaticProps } from "next";
import CreateList from "./createlist";

export default function Show({
  todo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const seasonShows = todo.data;
  return (
    <div>
      <div className="text-center px-4 md:px-24">
        <h1 className="text-4xl md:text-5xl mb-8 font-bold">Currently Airing Shows</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          <CreateList shows={seasonShows} />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://api.jikan.moe/v4/seasons/now");
  const todo = await res.json();
  return {
    props: { todo },
    revalidate: 60,
  };
};
