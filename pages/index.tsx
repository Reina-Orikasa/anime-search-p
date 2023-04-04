import Image from "next/image";
import Head from "next/head";

function HomePage() {
  return (
    <div>
      <Head>
        <title>Showfinder</title>
        <meta
          name="description"
          content="find the next show to watch"
          key="desc"
        />
      </Head>
      <h1 className="text-6xl font-bold text-center my-4">
        Welcome to ShowFinder!
      </h1>
      <h2 className="text-2xl font-semibold text-center mb-4">
        Click one of the links above to get started.
      </h2>
      <div className="flex justify-center align-middle">
        <Image
          src="https://images.unsplash.com/photo-1552975084-6e027cd345c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
          className="rounded-xl md:w-7/12"
          alt="home page image"
          width={1674}
          height={1256}
          priority={true}
        ></Image>
      </div>
    </div>
  );
}

export default HomePage;
