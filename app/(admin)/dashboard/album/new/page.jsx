"use client";

import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function UploadAlbumPage() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [eventCategory, setEventCategory] = useState("other");

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl("");
    }
  }, [imageFile]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!imageFile) return;

    // ... proses upload (sama seperti yang sudah kamu punya)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md">
      <input
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
          if (!allowedTypes.includes(file.type)) {
            alert("File harus berformat jpeg, jpg, atau png!");
            e.target.value = null;
            return;
          }
          const maxSizeMB = 5;
          if (file.size > maxSizeMB * 1024 * 1024) {
            alert(`Ukuran file maksimal ${maxSizeMB}MB!`);
            e.target.value = null;
            return;
          }
          setImageFile(file);
        }}
        required
      />

      {/* Preview dengan AspectRatio */}
      {previewUrl && (
        <AspectRatio
          ratio={16 / 9}
          className="rounded overflow-hidden bg-gray-200 relative max-w-xs mx-auto"
        >
          <img
            src={previewUrl}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      )}

      <select
        value={eventCategory}
        onChange={(e) => setEventCategory(e.target.value)}
        className="border p-2 w-full"
      >
        {["Independent Day", "HBI", "other"].map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Gambar
      </button>
    </form>
  );
}
