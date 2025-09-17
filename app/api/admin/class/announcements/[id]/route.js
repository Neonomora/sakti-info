import { connectDB } from '@/lib/mongoose';
import AnnouncementClass from '@/models/class/AnnouncementClass';

export async function GET(req, { params }) {
  await connectDB();
  const item = await AnnouncementClass.findById(params.id);
  return Response.json(item);
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updated = await AnnouncementClass.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await AnnouncementClass.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}
