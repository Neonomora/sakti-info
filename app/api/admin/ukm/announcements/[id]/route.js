import { connectDB } from '@/lib/mongoose';
import AnnouncementUKM from '@/models/ukm/AnnouncementUKM';

export async function GET(req, { params }) {
  await connectDB();
  const item = await AnnouncementUKM.findById(params.id);
  return Response.json(item);
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updated = await AnnouncementUKM.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await AnnouncementUKM.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}
