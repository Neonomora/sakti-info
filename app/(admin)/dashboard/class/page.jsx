'use client'

import { useState } from 'react';

import TasksPage from './tasks/TasksPage';
import AnnPage from './announcements/AnnPage';

export default function ClassPage() {
  const [active, setActive] = useState("tasks")

  const buttonStyle = (page) => `px-4 py-1 rounded ${active === page ? "bg-gray-300" : ""}`

  return (
    <main className="max-w-6xl mx-auto">
      <div className="flex justify-center space-x-4">
        <button onClick={() => setActive("tasks")} className={buttonStyle("tasks")}>Tasks</button>
        <button onClick={() => setActive("Ann")} className={buttonStyle("Ann")}>Announcement</button>
      </div>
      {active === "tasks" && <TasksPage/>}
      {active === "Ann" && <AnnPage/>}
    </main>
  );
}
