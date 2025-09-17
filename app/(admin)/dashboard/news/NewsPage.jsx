"use client";

import { useState, useTransition } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";

export default function NewsPage({ newsList, createNews, updateNews, deleteNews }) {
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);
  const [openModalId, setOpenModalId] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);

    startTransition(() => {
      if (editId) {
        updateNews(editId, formData);
      } else {
        createNews(formData);
      }
    });

    setForm({ title: "", content: "" });
    setEditId(null);
  };

  const handleDelete = (id) => {
    startTransition(() => {
      deleteNews(id);
    });
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, content: item.content });
    setEditId(item._id);
  };

  const handleOpen = (id) => setOpenModalId(id);
  const handleClose = () => setOpenModalId(null);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manajemen Berita Kampus</h1>

      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <input
          type="text"
          placeholder="Judul"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Isi Berita"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border px-3 py-2 rounded h-32"
          required
        />
        <Button type="submit" disabled={isPending}>
          {editId ? "Update" : "Tambah"} Berita
        </Button>
      </form>

      <ul className="flex flex-wrap gap-4">
        {newsList.map((item) => (
          <li
            key={item._id}
            className="w-64 h-48 p-4 border rounded-md shadow flex flex-col justify-between relative"
          >
            <button
              onClick={() => handleOpen(item._id)}
              className="text-left w-full"
            >
              <h2 className="font-semibold line-clamp-2">{item.title}</h2>
              <p className="text-sm mt-2 text-gray-600 line-clamp-3">
                {item.content}
              </p>
            </button>

            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(item)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(item._id)}
              >
                Hapus
              </Button>
            </div>

            <Modal isOpen={openModalId === item._id} onClose={handleClose}>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="whitespace-pre-line text-sm">{item.content}</p>
            </Modal>
          </li>
        ))}
      </ul>
    </div>
  );
}
