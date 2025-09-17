import { connectDB } from '@/lib/mongoose';
import InfoTemplate from '@/models/notification/InfoTemplate';
import Subscriber from '@/models/notification/Subscriber';
import { resend } from '@/lib/resend';

export async function GET() {
  await connectDB();

  try {
    // Ambil semua template, hanya title dan _id
    const templates = await InfoTemplate.find().select('title message');
    return new Response(JSON.stringify(templates), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'Gagal mengambil templates', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req) {
  const { templateIds } = await req.json(); // expect array sekarang
  await connectDB();

  if (!Array.isArray(templateIds) || templateIds.length === 0) {
    return new Response(
      JSON.stringify({ message: 'templateIds harus berupa array yang tidak kosong.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Cari semua template sekaligus berdasarkan array ID
    const templates = await InfoTemplate.find({ _id: { $in: templateIds } });

    if (templates.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Template tidak ditemukan.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const subscribers = await Subscriber.find();

    // Kirim email untuk tiap subscriber, untuk tiap template yang dipilih
    await Promise.all(
      subscribers.map((sub) =>
        Promise.all(
          templates.map((template) =>
            resend.emails.send({
              from: `onboarding@resend.dev`,
              to: sub.email,
              subject: `Notifikasi: ${template.title}`,
              html: `<p>${template.message}</p>`,
            })
          )
        )
      )
    );

    return new Response(
      JSON.stringify({ message: 'Email berhasil dikirim ke semua subscriber.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'Gagal mengirim email.', error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

