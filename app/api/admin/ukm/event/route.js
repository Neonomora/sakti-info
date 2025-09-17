import {connectDB} from '@/lib/mongoose';
import UKMEvent from '@/models/ukm/UkmEvent';

export async function GET() {
  await connectDB();
  const events = await UKMEvent.find();
  return new Response(JSON.stringify(events), { status: 200 });
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  try {
    const event = new UKMEvent(body);
    await event.save();
    return new Response(JSON.stringify(event), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
