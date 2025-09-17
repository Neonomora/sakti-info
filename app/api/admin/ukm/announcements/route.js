import { connectDB } from '@/lib/mongoose';
import AnnouncementUKM from '@/models/ukm/AnnouncementUKM';

export async function GET() {
  await connectDB();
  const data = await AnnouncementUKM.find().sort({ createdAt: -1 });
  return Response.json(data);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const created = await AnnouncementUKM.create(body);
  return Response.json(created);
}
