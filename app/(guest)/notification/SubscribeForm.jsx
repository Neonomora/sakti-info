"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi format email dan domain gmail
    const emailPattern = /^[^\s@]+@gmail\.com$/i;
    if (!emailPattern.test(email)) {
      toast.error("Hanya email dengan domain gmail.com yang diperbolehkan.");
      return;
    }

    const res = await fetch("/api/admin/notification/subscriber", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Berhasil subscribe!");
      setEmail("");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex mx-auto rounded-full border border-gray-800 focus-within:ring-gray-800 focus-within:ring-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="michael@gmail.com"
            required
            className="px-4 text-gray-800 text-start text-sm md:text-xs xl:text-base focus:outline-none w-full"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white m-1 hover:bg-gray-700 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p className="p-2 px-3 text-sm md:text-xs xl:text-sm">Subscribe</p>
          </button>
        </div>
      </form>
    </>
  );
}
