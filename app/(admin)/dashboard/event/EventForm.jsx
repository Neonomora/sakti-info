"use client";

import { useState, useTransition } from "react";
import { setHours, setMinutes, formatISO } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TrashIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";

function convertTimeToISO(timeString) {
  if (!timeString.includes(":")) return "";
  const [hours, minutes] = timeString.split(":").map(Number);

  // Mulai dari tanggal hari ini
  const now = new Date();
  const withHours = setHours(now, hours);
  const withMinutes = setMinutes(withHours, minutes);

  return formatISO(withMinutes); // ISO format
}

// Create Main Event
export function CreateMainEvent({createAction}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subEvents, setSubEvents] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSubChange = (index, field, value) => {
    const newSubs = [...subEvents];
    newSubs[index][field] = value;
    setSubEvents(newSubs);
  };

  const addSubEvent = (e) => {
    e.preventDefault();
    setSubEvents([...subEvents, { title: "", time: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Judul tidak boleh kosong");
      return;
    }

    // Konversi setiap subEvent.time ke ISO
    const formattedTime = subEvents.map((sub) => ({
      ...sub,
      time: sub.time ? convertTimeToISO(sub.time) : "", // hanya konversi jika ada waktunya
    }));

    startTransition(async () => {
      const result = await createAction({
        title,
        subEvents: formattedTime,
      });
      if (result.success) {
        router.refresh(); // Refresh halaman setelah submit
        setTitle("");
        setSubEvents([{ title: "", time: "" }]);
      } else {
        alert("Gagal membuat event: " + result.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul Event"
        className="border p-2 w-full"
      />
      {subEvents.map((sub, idx) => (
        <div key={idx} className="space-y-2 border p-2">
          <input
            type="text"
            value={sub.title}
            onChange={(e) => handleSubChange(idx, "title", e.target.value)}
            placeholder="Judul Sub Event"
            className="border p-2 w-full"
          />
          <input
            type="time"
            value={sub.time}
            onChange={(e) => handleSubChange(idx, "time", e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      ))}
      <div className="flex space-x-2">
        <Button
          onClick={addSubEvent}
          className="bg-gray-500 px-3 hover:bg-gray-500/90 hover:cursor-pointer"
        >
          + Tambah Sub Event
        </Button>
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

// Create Sub Event
export function CreateSubEvent({ eventId, createSubEventAction }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title && !time) return toast.error("Judul dan Waktu harus di isi");

    const formattedTime = convertTimeToISO(time);

    startTransition(async () => {

      const result = await createSubEventAction(eventId, {
        title,
        time: formattedTime,
      });
      if (result.success) {
        router.refresh();
        setTime("");
        setTitle("");
      } else {
        alert("Gagal Buat Sub Event:" + result.message);
      }
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      <button
        className="text-green-500 rounded"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Tutup" : <PlusIcon className="h-5 w-5 text-green-500" />}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="space-x-2">
          <input
            type="text"
            value={title}
            placeholder="Title"
            className="border-2"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="time"
            value={time}
            placeholder="Time"
            className="border-2"
            onChange={(e) => setTime(e.target.value)}
          />
          <button
            className="bg-gray-300 rounded px-4"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Add Sub Event"}
          </button>
        </form>
      )}
    </div>
  );
}

// Update Event & Sub Event
export function UpdateEvent({ id, subId, currentTitle, currentTime, updateAction }) {
  const router = useRouter();
  const [title, setTitle] = useState(currentTitle);
  const [time, setTime] = useState(
    currentTime ? currentTime.substring(11, 16) : ""
  ); // Extract HH:MM
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title && !time)
      return toast.error("Form Tidak Boleh Kosong");

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
          {showForm ? "Tutup" : <PencilSquareIcon className="h-5 w-5 text-blue-500" />}
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
export function DeleteEvent({ id, subId, deleteAction }) {
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
      {isPending ? "Loading..." : <TrashIcon className="h-5 w-5 text-red-500" />}
    </button>
  );
}
