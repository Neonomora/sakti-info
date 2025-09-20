'use client'

import { useState } from 'react';

import EventsPage from './events/EventsPage';
import AnnPage from './announcements/AnnPage';

export default function ClassPage() {
  const [active, setActive] = useState("event")

  const buttonStyle = (page) => `px-4 py-1 rounded ${active === page ? "bg-gray-300" : ""}`

  return (
    <main className="max-w-6xl mx-auto">
      <div className="flex justify-center space-x-4">
        <button onClick={() => setActive("event")} className={buttonStyle("event")}>Events</button>
        <button onClick={() => setActive("ann")} className={buttonStyle("ann")}>Announcement</button>
      </div>
      {active === "event" && <EventsPage/>}
      {active === "ann" && <AnnPage/>}
    </main>
  );
}
