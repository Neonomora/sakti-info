import { connectDB } from '@/lib/mongoose';
import AnnouncementClass from '@/models/class/AnnouncementClass';

export async function GET() {
  await connectDB();
  const data = await AnnouncementClass.find().sort({ createdAt: -1 });
  return Response.json(data);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const created = await AnnouncementClass.create(body);
  return Response.json(created);
}
