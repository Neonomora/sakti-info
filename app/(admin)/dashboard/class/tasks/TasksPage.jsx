"use client";

import { CreateMainEvent, UpdateEvent, DeleteEvent } from "./TaskForm";

export default function TaskPage({ tasks }) {
  return (
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-5">Kelola Tugas Kelas</h1>
      <CreateMainEvent />

      <h2 className="text-xl mt-8 mb-2">Daftar Tugas</h2>
      <ul>
        {tasks.map((task) => {
          const dateObj = task.dateTime
          const FDate = dateObj.toISOString().split("T")[0]; // "YYYY-MM-DD"
          const FTime = dateObj.toTimeString().slice(0, 5); // "HH:MM"

          return (
            <li
              key={task._id}
              className="py-2 flex justify-between items-center"
            >
              <div className="w-full">
                <div className="flex flex-row justify-between">
                  <div>
                    <h3 className="font-semibold text-xl">{task.title}</h3>
                    <p>Format File: {task.format}</p>
                    <p>Upload Di: {task.upload}</p>
                    <p>
                      Deadline:{" "}
                      {task.dateTime
                        .toLocaleString("id-ID")
                        .replace(/\./g, ":")}
                    </p>
                    <p>Detail Tugas: {task.detail}</p>
                  </div>
                  <div className="flex items-start">
                    <UpdateEvent
                      id={task._id}
                      currentTitle={task.title}
                      currentFormat={task.format}
                      currentUpload={task.upload}
                      currentDate={FDate}
                      currentTime={FTime}
                      currentDetail={task.detail}
                    />
                    <DeleteEvent id={task._id} />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
