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
  const albums = albumsFromDB.map(album => ({
    ...album,
    _id: album._id.toString()
  }));

  return (
    <AlbumList
      initialAlbums={albums}
      initialCategory={category}
      categories={categories}
    />
  );
}
