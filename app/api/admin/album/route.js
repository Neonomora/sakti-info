import { connectDB } from "@/lib/mongoose";  // Import fungsi koneksi ke MongoDB
import Album from "@/models/album/Album";    // Import model Album untuk operasi database

// Handler untuk request POST - membuat album baru
export async function POST(req) {
  await connectDB();            // Pastikan koneksi ke database sudah terjalin
  const body = await req.json(); // Ambil data request dari body (format JSON)

  // Membuat album baru dengan data yang diterima dari request
  const album = await Album.create({
    imageUrl: body.imageUrl,           // URL gambar yang diupload
    publicId: body.publicId,           // publicId untuk mengelola file di Cloudinary
    eventCategory: body.eventCategory, // Kategori event album tersebut
  });

  // Mengembalikan response dengan data album baru dan status 201 (Created)
  return new Response(JSON.stringify(album), { status: 201 });
}
