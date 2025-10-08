"use client";

import { useState, useTransition } from "react";
import {
  createAction,
  deleteAction,
  updateAction,
} from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

// Create Main Event
export function CreateMainEvent() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [format, setFormat] = useState("");
  const [upload, setUpload] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [detail, setDetail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Judul tidak boleh kosong");
      return;
    }

    startTransition(async () => {
      const dateTime = new Date(`${date}T${time}`)

      const result = await createAction({
        title, format, upload, dateTime, detail
      });
      if (result.success) {
        router.refresh(); // Refresh halaman setelah submit
        setTitle("");
        setFormat("");
        setUpload("");
        setDate("");
        setTime("");
        setDetail("");
      } else {
        toast.error("Gagal membuat event: " + result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul Tugas"
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        placeholder="Format File"
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={upload}
        onChange={(e) => setUpload(e.target.value)}
        placeholder="Upload Di?"
        className="border p-2 w-full"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Tanggal Deadline"
        className="border p-2 w-full"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Jam Deadline"
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        placeholder="Detail Tugas"
        className="border p-2 w-full"
      />

      <div className="flex space-x-2">
        <Button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 hover:cursor-pointer"
        >
          {isPending ? "Loading..." : "Simpan Event"}
        </Button>
      </div>
    </form>
  );
}

// Update Event
export function UpdateEvent({ id, subId, currentTitle, currentTime }) {
  const router = useRouter();
  const [title, setTitle] = useState(currentTitle);
  const [time, setTime] = useState(
    currentTime ? currentTime.substring(11, 16) : ""
  ); // Extract HH:MM
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title && !time) return toast.error("Form Tidak Boleh Kosong");

    // Konversi time ke ISO
    const formattedTime = convertTimeToISO(time);

    startTransition(async () => {
      const result = await updateAction(id, subId, title, formattedTime);
      if (result.success) {
        router.refresh();
      } else {
        alert("Gagal mengupdate event: " + result.message);
      }
    });
  };
  return (
    <>
      <div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-blue-500 rounded "
        >
          {showForm ? (
            "Tutup"
          ) : (
            <PencilSquareIcon className="h-5 text-blue-500" />
          )}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
          {subId && (
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border p-2 w-full"
            />
          )}
          <button
            type="submit"
            disabled={isPending}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isPending ? "Loading..." : "Simpan Perubahan"}
          </button>
        </form>
      )}
    </>
  );
}

// Delete Event
export function DeleteEvent({ id, subId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAction(id, subId);
      if (result.success) {
        router.refresh();
      } else {
        alert("Gagal menghapus event: " + result.message);
      }
    });
  };
  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 rounded pb-1"
    >
      {isPending ? "Loading..." : <TrashIcon className="h-5 text-red-500" />}
    </button>
  );
}
