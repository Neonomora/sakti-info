import { connectDB } from '@/lib/mongoose';
import Subscriber from '@/models/notification/Subscriber';

export async function POST(req) {
  const { email } = await req.json();
  await connectDB();

  const normalizedEmail = email.trim().toLowerCase();

  if (!/^[^\s@]+@gmail\.com$/i.test(normalizedEmail)) {
    return Response.json({ message: 'Hanya email gmail.com yang diperbolehkan.' }, { status: 400 });
  }

  try {
    const existing = await Subscriber.findOne({ email: normalizedEmail });

    if (existing) {
      return Response.json({ message: 'Email sudah pernah subscribe.' }, { status: 400 });
    }

    await Subscriber.create({ email: normalizedEmail });

    return Response.json({ message: 'Berhasil subscribe.' });
  } catch (err) {
    return Response.json({ message: 'Gagal subscribe.', error: err.message }, { status: 500 });
  }
}
