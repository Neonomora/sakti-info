// app/guest/album/edit/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditAlbum({ params }) {
  const router = useRouter();

  // State form untuk menyimpan data album yang diedit
  const [form, setForm] = useState({
    imageUrl: '',      // URL gambar album
    publicId: '',      // public ID di Cloudinary (atau storage lain)
    eventCategory: '', // kategori event album
  });

  // Fetch data album saat komponen mount atau params.id berubah
  useEffect(() => {
    fetch(`/api/admin/album/${params.id}`) // Ambil data album berdasarkan id
      .then((res) => res.json())
      .then((data) => setForm(data));       // Set data yang diterima ke form state
  }, [params.id]);

  // Fungsi handle submit untuk update data album
  async function handleSubmit(e) {
    e.preventDefault(); // Cegah reload halaman

    // Kirim data form ke backend dengan method PUT untuk update album
    const res = await fetch(`/api/admin/album/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(form), // Kirim data form sebagai JSON
    });

    // Jika update sukses, redirect ke halaman daftar album publik
    if (res.ok) router.push('/public/album');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {/* Input untuk URL gambar */}
      <input
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} // Update state saat diubah
        className="border p-2 w-full mb-2"
      />

      {/* Input untuk publicId */}
      <input
        value={form.publicId}
        onChange={(e) => setForm({ ...form, publicId: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      {/* Dropdown untuk memilih kategori event */}
      <select
        value={form.eventCategory}
        onChange={(e) => setForm({ ...form, eventCategory: e.target.value })}
        className="border p-2 w-full mb-2"
      >
        {/* Opsi kategori */}
        {['Independent Day', 'HBI', 'other'].map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Tombol submit update */}
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}
