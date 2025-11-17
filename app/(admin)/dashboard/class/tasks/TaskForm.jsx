"use client";

import { useState, useTransition } from "react";
import { createAction, deleteAction, updateAction } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

// Create Main Event
export function CreateMainEvent() {
  const categories = ["TRKJ", "BD", "MKSP"];
  const subCategories = ["A1", "B1", "C1"];

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [format, setFormat] = useState("");
  const [upload, setUpload] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [detail, setDetail] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [subClassFilter, setSubClassFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Judul tidak boleh kosong");
      return;
    }

    startTransition(async () => {
      const dateTime = new Date(`${date}T${time}`);

      const result = await createAction({
        title,
        format,
        upload,
        dateTime,
        detail,
        classFilter,
        subClassFilter,
      });
      if (result.success) {
        router.refresh(); // Refresh halaman setelah submit
        setTitle("");
        setFormat("");
        setUpload("");
        setDate("");
        setTime("");
        setDetail("");
        setClassFilter("");
        setSubClassFilter("");
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
        placeholder="Judul Tugas, maks. 18 karakter"
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
      <div className="flex">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`text-center mx-2 w-18 py-2 rounded-xl shadow-sm hover:cursor-pointer ${
              cat === classFilter ? "bg-blue" : "bg-white"
            }`}
            onClick={() => {
              setClassFilter(cat);
            }}
          >
            {cat}
          </div>
        ))}
      </div>
      <div className="flex">
      {subCategories.map((scat) => (
        <div
          key={scat}
          className={`text-center mx-2 w-18 py-2 rounded-xl shadow-sm hover:cursor-pointer ${
            scat === subClassFilter ? "bg-blue" : "bg-white"
          }`}
          onClick={() => {
            setSubClassFilter(scat);
          }}
        >
          {scat}
        </div>
      ))}
      </div>

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
export function UpdateEvent({
  id,
  currentTitle,
  currentFormat,
  currentUpload,
  currentDate,
  currentTime,
  currentDetail,
}) {
  const router = useRouter();
  const [title, setTitle] = useState(currentTitle);
  const [format, setFormat] = useState(currentFormat);
  const [upload, setUpload] = useState(currentUpload);
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime);
  const [detail, setDetail] = useState(currentDetail);

  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    startTransition(async () => {
      const dateTime = new Date(`${date}T${time}`);
      const result = await updateAction(
        id,
        title,
        format,
        upload,
        dateTime,
        detail
      );

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
          <input
            type="text"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            value={upload}
            onChange={(e) => setUpload(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className="border p-2 w-full"
          />

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
export function DeleteEvent({ id }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAction(id);
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
