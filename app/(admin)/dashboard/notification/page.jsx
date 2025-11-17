"use client";

import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function SendInfoForm() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateIds, setSelectedTemplateIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const lastTemplateId = templates.length > 0 ? templates[templates.length - 1]._id : null;

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch("/api/admin/notification/info");
        if (!res.ok) throw new Error("Gagal mengambil daftar template");
        const data = await res.json();
        setTemplates(data);
        if (data.length > 0) {
          setSelectedTemplateIds([data[0]._id]);
        }
      } catch (err) {
        setMessage(err.message);
      }
    }
    fetchTemplates();
  }, []);

  function handleCheckboxChange(value, checked) {
    if (checked) {
      setSelectedTemplateIds((prev) => [...prev, value]);
    } else {
      setSelectedTemplateIds((prev) => prev.filter((id) => id !== value));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/notification/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateIds: selectedTemplateIds }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch {
      setMessage("Gagal mengirim permintaan.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1>Kirim Notifikasi Info</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Pilih Template:</legend>
          {templates.map((template) => (
            <label
              key={template._id}
              className="flex items-center mb-2 cursor-pointer"
            >
              <Checkbox
                id={template._id}
                value={template._id}
                className="border-black mr-2"
                checked={selectedTemplateIds.includes(template._id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(template._id, checked)
                }
              />
              <span>{template.title}</span>
            </label>
          ))}
        </fieldset>

        {selectedTemplateIds.includes(lastTemplateId) && (
          <Textarea
            placeholder="Type your message here.."
            className="border-gray-500"
            onChange={(e) => setMessage(e.target.value)}
          />
        )}

        <div>
          <p>Isi Pesan:</p>
          {selectedTemplateIds.length === 0 && (
            <p>Belum ada template yang dipilih.</p>
          )}
          {selectedTemplateIds.map((id) => {
            const template = templates.find((t) => t._id === id);
            if (!template) return null;
            return (
              <div
                key={id}
              >
                <p>{template.message}</p>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={loading || selectedTemplateIds.length === 0}
          className="cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Mengirim..." : "Kirim Email"}
        </button>
      </form>
    </div>
  );
}
