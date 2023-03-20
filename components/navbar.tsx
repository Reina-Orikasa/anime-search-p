import Link from "next/link";

export default function navbar() {
  return (
    <div className="navbar pl-12 font-bold space-x-4 text-lg bg-gray-900 mb-8">
      <Link
        href="/"
        className="hover:underline border-2 border-white p-2 rounded-xl"
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
    </div>
  );
}
