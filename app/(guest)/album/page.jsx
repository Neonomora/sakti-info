import "@/styles/globals.css";
import { connectDB } from "@/lib/mongoose";
import Album from "@/models/album/Album";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const revalidate = 60;

const categories = ["All", "Independent Day", "HBI", "other"];

export default async function AlbumsPage({ searchParams }) {
  await connectDB();

  const params = await searchParams;

  const category = params?.category || "All";

  const filter = category === "All" ? {} : { eventCategory: category };

  const albums = await Album.find(filter).sort({ createdAt: -1 }).lean();

  return (
    <main className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Daftar Album</h1>

      <div className="mb-6 space-x-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/album?category=${encodeURIComponent(cat)}`}
            className={`inline-block px-4 py-2 rounded m-4 w-40 text-center ${
              category === cat
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {albums.map((album) => (
          <li
            key={album._id}
            className="rounded overflow-hidden shadow-lg bg-white"
          >
            <Link href={`/album/${album._id}`} className="block">
              <AspectRatio ratio={16 / 9} className="rounded overflow-hidden">
                {album.imageUrl ? (
                  <Image
                    src={album.imageUrl}
                    alt={`Album ${album.eventCategory}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={true}
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </AspectRatio>
              <div className="p-3 text-sm font-medium text-gray-800">
                Kategori: {album.eventCategory}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
