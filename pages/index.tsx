import Link from "next/link";

function HomePage() {
  return (
    <div>
      <div className="navbar bg-base-100 space-x-4">
        <a className="btn btn-ghost normal-case text-xl border-2 border-white">
          ShowFinder
        </a>
        <Link href="/show" className="btn btn-ghost normal-case text-xl">
          Airing Now
        </Link>
        <Link href="/top" className="btn btn-ghost normal-case text-xl">
          Top Shows
        </Link>
        <Link href="/search" className="btn btn-ghost normal-case text-xl">
          Search
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center mt-4">
        Welcome to ShowFinder!
      </h1>
      <h2 className="text-2xl font-semibold text-center mb-4">
        Click one of the buttons above to get started.
      </h2>
      <div className="flex justify-center align-middle">
        <img
          src="https://images.unsplash.com/photo-1552975084-6e027cd345c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
          className="rounded-xl w-7/12"
        />
      </div>
    </div>
  );
}

export default HomePage;
