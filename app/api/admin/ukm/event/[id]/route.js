import { connectDB } from '@/lib/mongoose';
import UKMEvent from '@/models/event/UKMEvent';

export async function GET(request, { params }) {
  await connectDB();
  const event = await UKMEvent.findById(params.id);
  if (!event) return new Response('Not Found', { status: 404 });
  return new Response(JSON.stringify(event), { status: 200 });
}

export async function PUT(request, { params }) {
  await connectDB();
  const body = await request.json();
  try {
    const updatedEvent = await UKMEvent.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedEvent) return new Response('Not Found', { status: 404 });
    return new Response(JSON.stringify(updatedEvent), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  const deletedEvent = await UKMEvent.findByIdAndDelete(params.id);
  if (!deletedEvent) return new Response('Not Found', { status: 404 });
  return new Response(null, { status: 204 });
}
