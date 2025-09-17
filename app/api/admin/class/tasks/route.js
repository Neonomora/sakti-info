import { connectDB } from '@/lib/mongoose';
import ClassTask from '@/models/class/ClassTask';

export async function GET() {
  await connectDB();
  const tasks = await ClassTask.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newTask = await ClassTask.create(data);
  return new Response(JSON.stringify(newTask), { status: 201 });
}
