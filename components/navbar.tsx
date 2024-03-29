import Link from "next/link";

export default function navbar() {
  return (
    <div className="text-white navbar md:pl-12 font-bold space-x-4 text-sm md:text-lg bg-gray-900 mb-8">
      <Link
        href="/"
        className="hover:underline border-2 border-white p-2 rounded-xl hidden md:block"
      >
        ShowFinder
      </Link>
      <Link href="/show" className="hover:underline">
        Current Airing Shows
      </Link>
      <Link href="/top" className="hover:underline">
        Top Shows
      </Link>
      <Link href="/search" className="hover:underline">
        Search
      </Link>
      <Link href="/profileSearch" className="hover:underline">
        Profile Search
      </Link>
      <Link href="/yourlist" className="hover:underline">
        Your List
      </Link>
    </div>
  );
}
