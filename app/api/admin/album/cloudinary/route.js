import cloudinary from '@/lib/cloudinary'; // Import konfigurasi Cloudinary

export async function GET() {
  // Membuat timestamp saat ini dalam format detik (Unix timestamp)
  const timestamp = Math.round(Date.now() / 1000);

  // Membuat signature untuk otentikasi upload ke Cloudinary
  // Signature dibuat dari objek yang berisi timestamp dan folder tujuan ('albums'),
  // menggunakan secret key dari environment variable
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'albums' },
    process.env.CLOUDINARY_API_SECRET
  );

  // Mengembalikan data signature, timestamp, dan kredensial Cloudinary yang dibutuhkan
  // oleh client untuk melakukan upload yang aman
  return Response.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
}
