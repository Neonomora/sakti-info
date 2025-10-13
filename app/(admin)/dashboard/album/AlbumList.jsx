"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/ConfirmModal";


const categories = ["All", "Independent Day", "HBI", "other"];

export default function AlbumListCSR({ initialAlbums, initialCategory }) {
  const router = useRouter();
  const pathname = usePathname();

  const [albums, setAlbums] = useState(initialAlbums);
  const [category, setCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "other"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  const fetchAlbums = async (cat) => {
    setLoading(true);
    const query = cat === "All" ? "" : `?category=${encodeURIComponent(cat)}`;
    const res = await fetch(`/api/admin/album/album${query}`);
    if (res.ok) {
      const data = await res.json();
      setAlbums(data);
    } else {
      alert("Gagal mengambil data album");
    }
    setLoading(false);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    router.push(`${pathname}?category=${encodeURIComponent(cat)}`, {
      shallow: true,
    });
    fetchAlbums(cat);
  };

  const handleOpenConfirm = (id) => {
    setSelectedAlbumId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const res = await fetch(`/api/admin/album/${selectedAlbumId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchAlbums(category); // reload data
    } else {
      alert("Gagal menghapus album");
    }
    setIsModalOpen(false);
    setSelectedAlbumId(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewSrc(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewSrc(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Pilih file dulu!");

    setUploading(true);

    try {
      const signRes = await fetch("/api/admin/album/cloudinary");
      if (!signRes.ok) throw new Error("Gagal mendapatkan signature");
      const { signature, timestamp, cloudName, apiKey } = await signRes.json();

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", "albums");

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadRes.ok) throw new Error("Gagal upload ke Cloudinary");
      const uploadData = await uploadRes.json();

      const saveRes = await fetch("/api/admin/album/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: uploadData.secure_url,
          publicId: uploadData.public_id,
          eventCategory: selectedCategory,
        }),
      });

      if (!saveRes.ok) throw new Error("Gagal menyimpan ke database");

      alert("Upload berhasil!");
      setSelectedFile(null);
      setPreviewSrc(null);
      fetchAlbums(category);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="mb-4 space-x-2">
        Filter kategori:{" "}
        {categories.map((cat) => (
          <button
            key={cat}
            disabled={loading}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1 rounded ${
              cat === category
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {albums.map((album) => (
            <li
              key={album._id}
              className="bg-white shadow rounded overflow-hidden"
            >
              <AspectRatio ratio={16 / 9} className="w-full">
                <Image
                  src={album.imageUrl}
                  alt="album"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={true}
                />
              </AspectRatio>
              <div className="p-2 text-sm font-medium text-gray-700">
                Kategori: {album.eventCategory}
              </div>
              <Button
                variant="destructive"
                onClick={() => handleOpenConfirm(album._id)}
              >
                Hapus
              </Button>
            </li>
          ))}
          <ConfirmModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmDelete}
            message="Yakin ingin menghapus album ini?"
          />
        </ul>
      )}

      <h2 className="text-xl font-semibold mb-2">Tambah Album Baru</h2>

      <div className="space-y-4 max-w-md">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full rounded border border-gray-300 p-2"
        />

        {previewSrc && (
          <AspectRatio
            ratio={16 / 9}
            className="max-w-xs rounded overflow-hidden bg-gray-200 mx-auto"
          >
            <img
              src={previewSrc}
              alt="preview"
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        )}

        <div>
          <label className="block mb-1 font-medium">
            Kategori:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full rounded border border-gray-300 p-2"
            >
              {categories
                .filter((c) => c !== "All")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </>
  );
}
