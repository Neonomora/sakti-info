import { connectDB } from "@/lib/mongoose";
import Album from "@/models/album/Album";
import cloudinary from '@/lib/cloudinary';

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  const filter = category && category !== 'All'
    ? { eventCategory: category }
    : {};

  const albums = await Album.find(filter).sort({ createdAt: -1 }).lean();

  return Response.json(albums);
}

export async function DELETE(_, { params }) {
  await connectDB();
  const param = await params

  const album = await Album.findById(param.id);

  if (!album) {
    return new Response('Album not found', { status: 404 });
  }

  await cloudinary.uploader.destroy(album.publicId);

  await Album.findByIdAndDelete(param.id);

  return new Response(null, { status: 204 });
}
