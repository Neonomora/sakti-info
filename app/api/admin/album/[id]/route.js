import { connectDB } from "@/lib/mongoose";  // Import fungsi untuk koneksi ke database MongoDB
import Album from "@/models/album/Album";   // Import model Album untuk operasi database
import cloudinary from '@/lib/cloudinary'; // Import konfigurasi dan fungsi Cloudinary untuk pengelolaan file

// Handler untuk request GET - mengambil daftar album, dengan filter berdasarkan kategori
export async function GET(req) {
  await connectDB(); // Pastikan koneksi ke database sudah terjalin

  const { searchParams } = new URL(req.url); // Mengambil query parameters dari URL
  const category = searchParams.get('category'); // Mendapatkan nilai kategori dari query parameter

  // Membuat filter berdasarkan kategori jika ada dan bukan 'All'
  const filter = category && category !== 'All'
    ? { eventCategory: category }
    : {};

  // Query album berdasarkan filter dan urutkan berdasarkan waktu pembuatan terbaru
  const albums = await Album.find(filter).sort({ createdAt: -1 }).lean();

  // Kembalikan data album dalam format JSON
  return Response.json(albums);
}

// Handler untuk request PUT - update data album berdasarkan ID
export async function PUT(req, { params }) {
  await connectDB(); // Pastikan koneksi ke database sudah terjalin

  const data = await req.json(); // Ambil data update dari body request

  // Update album berdasarkan ID dan kembalikan data terbaru setelah update
  const updated = await Album.findByIdAndUpdate(params.id, data, { new: true });

  // Kembalikan data album yang sudah diupdate dalam format JSON
  return new Response(JSON.stringify(updated));
}

// Handler untuk request DELETE - hapus album berdasarkan ID
export async function DELETE(_, { params }) {
  await connectDB(); // Pastikan koneksi ke database sudah terjalin

  const album = await Album.findById(params.id); // Cari album berdasarkan ID

  if (!album) {
    // Jika album tidak ditemukan, kembalikan response error 404
    return new Response('Album not found', { status: 404 });
  }

  // Hapus file dari Cloudinary menggunakan publicId album
  await cloudinary.uploader.destroy(album.publicId);

  // Hapus data album dari MongoDB
  await Album.findByIdAndDelete(params.id);

  // Kembalikan response kosong dengan status 204 (No Content) sebagai tanda berhasil hapus
  return new Response(null, { status: 204 });
}
