import { connectDB } from '@/lib/mongoose';
import ClassTask from '@/models/class/ClassTask';

export async function GET(req, { params }) {
  await connectDB();
  const task = await ClassTask.findById(params.id);
  return Response.json(task);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await ClassTask.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await ClassTask.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}
