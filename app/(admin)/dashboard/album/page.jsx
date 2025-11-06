import AlbumList from "./AlbumList";
import { connectDB } from "@/lib/mongoose";
import Album from "@/models/album/Album";

const categories = ["All", "Independent Day", "HBI", "other"];

export default async function AlbumPage({ searchParams }) {
  await connectDB();
  const params = await searchParams

  const category = params?.category || "All";
  const filter = category === "All" ? {} : { eventCategory: category };

  // Ambil data dari DB dan dapatkan plain JS object (lean)
  const albumsFromDB = await Album.find(filter).lean();

  // Convert ObjectId dan tanggal ke string
  const albums = albumsFromDB.map((album) => ({
    ...album,
    _id: album._id.toString(),
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-5">Kelola Album</h1>
      <AlbumList
        initialAlbums={albums}
        initialCategory={category}
      />
    </div>
  );
}
