"use client";

import Navbar from "@/components/GuestNavbar";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function SendInfoForm() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateIds, setSelectedTemplateIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  function handleCheckboxChange(e) {
    const { value, checked } = e.target;

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
      <Navbar />
      <h1>Kirim Notifikasi Info</h1>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Pilih Template:</legend>
          {templates.map((template) => (
            <label
              key={template._id}
              className="flex items-center space-x-2 mb-2 cursor-pointer">
              <Checkbox
                id={template._id}
                value={template._id}
                checked={selectedTemplateIds.includes(template._id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedTemplateIds((prev) => [...prev, template._id]);
                  } else {
                    setSelectedTemplateIds((prev) =>
                      prev.filter((id) => id !== template._id)
                    );
                  }
                }}
              />
              <span>{template.title}</span>
            </label>
          ))}
        </fieldset>

        <div style={{ marginTop: "16px" }}>
          <strong>Isi Pesan:</strong>
          {selectedTemplateIds.length === 0 && (
            <p>Belum ada template yang dipilih.</p>
          )}
          {selectedTemplateIds.map((id) => {
            const template = templates.find((t) => t._id === id);
            if (!template) return null;
            return (
              <div
                key={id}
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h4>{template.title}</h4>
                <p>{template.message}</p>
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={loading || selectedTemplateIds.length === 0}
          className="cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          style={{ marginTop: "20px" }}
        >
          {loading ? "Mengirim..." : "Kirim Email"}
        </button>
      </form>
    </div>
  );
}
