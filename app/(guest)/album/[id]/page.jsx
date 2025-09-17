import { connectDB } from "@/lib/mongoose";
import Album from "@/models/album/Album";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

export default async function AlbumDetailPage({ params }) {
  const { id } = await params;

  await connectDB();

  const album = await Album.findById(id).lean();

  if (!album) {
    notFound();
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Info Capture</h1>
      <AspectRatio ratio={16 / 9} className="rounded overflow-hidden shadow-md">
        <Image
          src={album.imageUrl}
          alt={`Album ${album.eventCategory}`}
          fill
          className="object-cover"
          priority={true}
        />
      </AspectRatio>

      {album?.createdAt && (
        <p className="mt-2 text-gray-600">
          <small>
            Upload Pada:{" "}
            {format(new Date(album.createdAt), "dd MMMM yyyy, HH:mm", {
              locale: idLocale,
            })}
          </small>
        </p>
      )}
    </main>
  );
}
